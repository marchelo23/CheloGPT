# CheloGPT

Una interfaz moderna de chat AI inspirada en Gemini, construida con React, TypeScript, Vite y Tailwind CSS.

## 🚀 Características

- **Interfaz moderna y responsiva** - Diseño elegante que funciona en todos los dispositivos
- **Modo oscuro** - Paleta de colores oscura con acentos azules
- **Múltiples modelos AI** - Selector de diferentes modelos (Chelo Pro, Vision, Ultra, Code)
- **Gestión de conversaciones** - Sidebar con historial de chats
- **Efectos visuales** - Animaciones suaves y micro-interacciones

## 🐳 Ejecutar con Docker

### Opción 1: Docker Compose (Recomendado)
```bash
docker-compose up --build
```

### Opción 2: Docker directo
```bash
# Construir la imagen
docker build -t chelogpt .

# Ejecutar el contenedor
docker run -p 3000:3000 chelogpt
```

La aplicación estará disponible en `http://localhost:3000`

## 🛠️ Desarrollo local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── ChatArea.tsx      # Área principal de chat
│   ├── Header.tsx        # Barra superior
│   ├── MainInterface.tsx # Interfaz principal
│   ├── Message.tsx       # Componente de mensaje
│   ├── MessageInput.tsx  # Input para escribir mensajes
│   ├── ModelSelector.tsx # Selector de modelos AI
│   └── Sidebar.tsx       # Barra lateral con conversaciones
├── App.tsx               # Componente raíz
└── main.tsx             # Punto de entrada

```

## 🎨 Tecnologías

- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS
- **Lucide React** - Iconos
- **Docker** - Containerización