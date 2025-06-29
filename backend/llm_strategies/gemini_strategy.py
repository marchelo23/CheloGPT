# backend/llm_strategies/gemini_strategy.py

import os
import google.generativeai as genai
from .base_strategy import LLMStrategy
from typing import Generator

class GeminiStrategy(LLMStrategy):
    """Estrategia de Gemini, ahora con capacidad de streaming."""

    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("La variable de entorno GEMINI_API_KEY no está configurada.")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash')

    def call_api(self, history: list[dict]) -> str:
        """Implementación del método de respuesta completa."""
        # Esta implementación ahora puede simplemente unir los trozos del stream.
        chunks = []
        for chunk in self.stream_api(history):
            chunks.append(chunk)
        return "".join(chunks)

    def stream_api(self, history: list[dict]) -> Generator[str, None, None]:
        """Implementación del método de streaming."""
        gemini_history = []
        for message in history:
            role = "model" if message["role"] == "assistant" else message["role"]
            gemini_history.append({
                "role": role,
                "parts": [message["content"]]
            })

        # La clave es llamar a generate_content con stream=True
        response_stream = self.model.generate_content(gemini_history, stream=True)

        for chunk in response_stream:
            # Hacemos yield de cada trozo de texto a medida que llega.
            if chunk.text:
                yield chunk.text