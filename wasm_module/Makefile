# wasm_module/Makefile

# El compilador de Emscripten, que ya está disponible en nuestro entorno Nix.
EMCC = emcc

# Flags de compilación:
# -O3: Optimización agresiva para mayor rendimiento.
# --bind: Habilita el uso de embind (nuestro EMSCRIPTEN_BINDINGS).
# -o ...: Archivo de salida.
CFLAGS = -O3 --bind

# Directorio de salida: Lo colocaremos directamente en la carpeta 'public' del frontend.
OUTPUT_DIR = ../frontend/public/wasm
OUTPUT_JS = $(OUTPUT_DIR)/fibonacci.mjs
OUTPUT_WASM = $(OUTPUT_DIR)/fibonacci.wasm

# El objetivo por defecto que se ejecuta cuando escribimos 'make'.
all: $(OUTPUT_JS)

# La regla de compilación.
# Le dice a 'make' que para crear el archivo .mjs, necesita el .cpp
# y debe ejecutar el comando 'emcc'.
$(OUTPUT_JS): fibonacci.cpp
	@mkdir -p $(OUTPUT_DIR) # Crea el directorio de salida si no existe.
	$(EMCC) $(CFLAGS) $< -o $@
	@echo "WASM Module compiled successfully to $(OUTPUT_DIR)"

# Un objetivo para limpiar los archivos generados.
clean:
	rm -f $(OUTPUT_JS) $(OUTPUT_WASM)