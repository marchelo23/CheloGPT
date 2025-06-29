# .idx/dev.nix (Versión Final para CheloGPT)
# Basado en la plantilla funcional de IDX y adaptado a los requisitos de nuestro proyecto.

{ pkgs, ... }: {
  # Usamos el canal que sabemos que funciona en tu entorno.
  channel = "stable-24.05";

  # Añadimos TODOS los paquetes necesarios para el proyecto CheloGPT.
  packages = [
    pkgs.python311  # Usamos una versión específica de Python para consistencia.
    pkgs.nodejs_20 # Para el frontend y las Cloud Functions.
    pkgs.google-cloud-sdk   # CLI de Google Cloud.
    pkgs.emscripten 
    pkgs.gnumake # Compilador para C++/WASM.
  ];

  idx = {
    # Añadimos TODAS las extensiones que necesita nuestro proyecto.

    # Eliminamos la sección 'workspace.onCreate' por ahora para mantenerlo simple.
    # La añadiremos de nuevo si necesitamos automatizar la instalación.

    previews = {
      enable = true;
      # Definimos nuestras dos vistas previas (backend y frontend) siguiendo la estructura correcta.
      previews = {
        backend = {
          # NO usamos 'name' ni 'port'. Usamos el ID "backend" y la variable $PORT.
          command = [
            # Este comando es un placeholder robusto para nuestro futuro servidor Flask.
            # Escuchará en el puerto que IDX le asigne a través de la variable $PORT.
            "python3 -m http.server -d backend $PORT"
          ];
          manager = "web";
        };
        frontend = {
          # NO usamos 'name' ni 'port'. Usamos el ID "frontend" y la variable $PORT.
          command = [
            "cd frontend && npm install && npm run dev -- --port $PORT"
          ];
          manager = "web";
        };
      };
    };
  };
}