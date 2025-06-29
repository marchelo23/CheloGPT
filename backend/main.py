# backend/main.py (v5 - Versión con Streaming SSE)

import os
import json
from flask import Flask, request, jsonify, Response
from typing import Generator

from llm_strategies.gemini_strategy import GeminiStrategy

# --- 1. SIMULACIÓN DE BASE DE DATOS ---
IN_MEMORY_DB = {}

# --- 2. Inicialización y Registro de Herramientas ---
app = Flask(__name__)
TOOL_REGISTRY = {}

def register_tool(func):
    TOOL_REGISTRY[func.__name__] = func
    return func

# --- 3. Mapa de Estrategias ---
STRATEGY_MAP = { "gemini-1.5-flash": GeminiStrategy() }

# --- 4. Definición de Herramientas (Modificada para streaming) ---
@register_tool
def get_available_models() -> list[str]:
    return list(STRATEGY_MAP.keys())

@register_tool
def send_message(conversation_id: str, message: str, model: str) -> Generator[str, None, None]:
    """
    Ahora esta función devuelve un GENERADOR de trozos de texto.
    """
    strategy = STRATEGY_MAP.get(model)
    if not strategy:
        raise ValueError(f"Modelo '{model}' no soportado.")

    conversation = IN_MEMORY_DB.get(conversation_id, {"history": []})
    history = conversation["history"]
    history.append({"role": "user", "content": message})

    # Obtenemos el stream de la estrategia
    response_stream = strategy.stream_api(history)
    
    # Necesitamos acumular la respuesta completa para guardarla,
    # mientras enviamos los trozos al cliente.
    full_response_chunks = []
    
    # Este generador envia cada trozo al cliente Y lo guarda para la BD
    def stream_and_save_generator():
        for chunk in response_stream:
            full_response_chunks.append(chunk)
            yield chunk # Esto se envía al cliente en tiempo real
        
        # Una vez que el stream ha terminado, guardamos la conversación completa
        full_response = "".join(full_response_chunks)
        history.append({"role": "assistant", "content": full_response})
        IN_MEMORY_DB[conversation_id] = conversation
        print(f"Conversación '{conversation_id}' guardada en memoria.")

    return stream_and_save_generator()


# --- 5. El Endpoint MCP Principal (Actualizado para SSE) ---
@app.route("/mcp", methods=["POST"])
def mcp_dispatcher():
    """Despachador de herramientas MCP, ahora con capacidad de streaming."""
    data = request.json
    tool_name = data.get("tool")
    tool_args = data.get("args", {})

    tool_function = TOOL_REGISTRY.get(tool_name)
    if not tool_function:
        return jsonify({"error": f"Tool '{tool_name}' not found"}), 404

    try:
        result = tool_function(**tool_args)
        
        # --- Lógica de Detección de Streaming ---
        if isinstance(result, Generator):
            def sse_stream():
                for chunk in result:
                    # Formateamos cada trozo según la especificación de SSE: "data: ...\n\n"
                    sse_formatted_chunk = f"data: {json.dumps({'chunk': chunk})}\n\n"
                    yield sse_formatted_chunk
                # Señal de fin de stream (opcional, pero buena práctica)
                yield f"data: {json.dumps({'status': 'done'})}\n\n"

            # Devolvemos una respuesta de Flask con el mimetype correcto para SSE
            return Response(sse_stream(), mimetype='text/event-stream')
        else:
            # Si no es un generador, devolvemos un JSON normal como antes
            return jsonify({"result": result})
            
    except Exception as e:
        app.logger.error(f"Error ejecutando la herramienta '{tool_name}': {e}", exc_info=True)
        return jsonify({"error": str(e)}), 500

# --- 6. Ruta de Verificación y Punto de Entrada ---
@app.route("/")
def health_check():
    return "CheloGPT Backend: SSE Streaming Ready."

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))