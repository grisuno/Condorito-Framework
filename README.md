# Condorito-Framework


Condorito Framework es un marco de trabajo minimalista para desarrollo web en Node.js, diseñado para facilitar la creación de aplicaciones web y APIs de manera rápida y sencilla.

## Características

- **Express.js simplificado:** Condorito utiliza una sintaxis similar a Elixir para definir rutas y controladores, haciendo que la creación de endpoints sea más intuitiva y concisa.
- **WebSocket integrado:** Viene con soporte integrado para WebSocket, lo que te permite crear aplicaciones en tiempo real de manera sencilla.
- **Manejo de vistas en tiempo real:** Con el `LiveViewManager`, puedes manejar vistas en tiempo real de manera eficiente.
- **Pub/Sub y presencia:** Implementa un sistema de pub/sub para la comunicación entre usuarios y rastreo de usuarios conectados.
- **Recarga automática de código:** Con `AutomaticCodeReloading`, puedes recargar automáticamente el código cuando se detectan cambios, lo que facilita el desarrollo.

## Instalación

Para utilizar Condorito Framework, clona este repositorio en tu máquina local:

```bash
git clone https://github.com/grisuno/Condorito-Framework.git
```
Luego, puedes utilizar los archivos directamente en tu proyecto.
```bash
cd Condorito-Framework
npm install
```
Uso
Aquí tienes un ejemplo básico de cómo puedes utilizar Condorito Framework en tu aplicación:

```javascript
const { Condorito, LiveView } = require('./Condorito');

// Initialize Condorito
const condorito = new Condorito();

// Add routes and logic to your application

// Create a custom LiveView
class CustomLiveView extends LiveView {
  constructor(viewPath, staticPath, port, sslOptions) {
    super(viewPath, staticPath, port, sslOptions);
  }

  init() {
    // Initialization logic for CustomLiveView
    console.log('Initializing CustomLiveView...');
  }
}

const customLiveView = new CustomLiveView('/tweets', './public', 3001, {});
customLiveView.init(); // Call the init method after creation
condorito.liveViewManager.addLiveView(customLiveView);

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

```
## Features
Channels: Manage communication channels for WebSocket connections.
Presence: Track users' presence in the application.
Pub/Sub Messaging: Implement publish/subscribe messaging patterns.
Elixir-Like Syntax: Define routes and resources using an Elixir-like syntax.
Automatic Code Reloading: Automatically reload code when changes are detected.

## Documentation
Condorito Framework provides comprehensive documentation within the code itself. Here's a brief overview of the main components and their usage:

- ** 1. Condorito Class
The Condorito class is the entry point of the framework.
It initializes various components like channels, presence tracking, pub/sub messaging, routing syntax, and automatic code reloading.
Usage: Create an instance of Condorito and access its properties to configure and manage your application.
- ** 2. Channels
The Channels class manages communication channels for WebSocket connections.
It allows joining, leaving, and broadcasting messages to specific channels.
Usage: Access the channels property of Condorito to interact with the channels system.
- ** 3. Presence
The Presence class tracks users' presence in the application.
It provides methods for joining and leaving presence channels, as well as retrieving presence information.
Usage: Access the presence property of Condorito to interact with the presence system.
- ** 4. Pub/Sub Messaging
The PubSub class implements a publish/subscribe messaging pattern.
It allows subscribing to topics and publishing messages to those topics.
Usage: Access the pubSub property of Condorito to interact with the pub/sub messaging system.
- ** 5. Elixir-Like Syntax
The ElixirLikeSyntax class provides a syntax similar to Elixir for defining routes and resources.
It supports HTTP methods like GET, POST, PUT, DELETE, PATCH, HEAD, and OPTIONS.
Usage: Access the elixirLikeSyntax property of Condorito to define routes and resources using the provided syntax.
- ** 6. Automatic Code Reloading
The AutomaticCodeReloading class automatically reloads code when changes are detected.
It uses file watching to detect changes and reloads the affected modules.
Usage: Access the automaticCodeReloading property of Condorito to configure automatic code reloading.
- ** 7. LiveView and LiveViewManager
The LiveView class provides a foundation for building real-time views.
It sets up WebSocket servers and handles client connections.
The LiveViewManager class manages multiple live views in the application.
Usage: Extend the LiveView class to create custom live views and manage them using LiveViewManager.


## Contribución
¡Las contribuciones son bienvenidas! Si encuentras algún problema o tienes alguna sugerencia, no dudes en abrir un problema o enviar un pull request.

## Licencia
GNU GPL v 3.0
