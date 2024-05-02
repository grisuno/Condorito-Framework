// app.js
const http = require('http');
const express = require('express');
const WebSocket = require('ws');
const { Condorito, LiveView } = require('./Condorito');

const condorito = new Condorito();

// Crear servidor HTTP
const server = http.createServer(condorito.elixirLikeSyntax.app);

// Crear servidor WebSocket
const wss = new WebSocket.Server({ server });

// Manejar conexiones WebSocket
wss.on('connection', (ws) => {
  console.log('Nueva conexión WebSocket establecida.');
  ws.on('message', (message) => {
    console.log(`Mensaje recibido: ${message}`);
  });
  ws.send('Bienvenido al servidor de WebSocket');
});

class CustomLiveView extends LiveView {
    constructor(viewPath, staticPath, port, sslOptions) {
      super(viewPath, staticPath, port, sslOptions);
    }
  
    init() {
      // Aquí puedes agregar la lógica de inicialización específica de tu vista en vivo
      console.log('Inicializando CustomLiveView...');
    }
  }
// Base de datos de tweets (simulada)
const tweets = [
  { id: 1, username: 'user1', content: 'Este es el primer tweet', createdAt: new Date() },
  { id: 2, username: 'user2', content: 'Este es el segundo tweet', createdAt: new Date() },
];

// Obtener instancias de Condorito
const elixirLikeSyntax = condorito.elixirLikeSyntax;
const app = elixirLikeSyntax.app;

// Ruta para obtener todos los tweets
app.get('/tweets', (req, res) => {
  res.json(tweets);
});

// Ruta para crear un nuevo tweet
app.post('/tweets', (req, res) => {
  const { username, content } = req.body;
  if (!username || !content) {
    return res.status(400).json({ error: 'Falta el nombre de usuario o el contenido del tweet.' });
  }
  const newTweet = {
    id: tweets.length + 1,
    username,
    content,
    createdAt: new Date(),
  };
  tweets.push(newTweet);
  // Enviamos el nuevo tweet a todos los clientes conectados
  const message = JSON.stringify(newTweet);
  condorito.channels.broadcast('tweets', message);
  res.status(201).json(newTweet);
});

// Configurar Presence para rastrear usuarios conectados
app.get('/online-users', (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).json({ error: 'Falta el ID de usuario.' });
  }
  const onlineUsers = condorito.presence.getPresence(userId);
  res.json({ onlineUsers });
});

// Configurar PubSub para permitir que los usuarios se suscriban a ciertos temas de tweets
app.post('/subscribe', (req, res) => {
  const { userId, topic } = req.body;
  if (!userId || !topic) {
    return res.status(400).json({ error: 'Falta el ID de usuario o el tema.' });
  }
  condorito.pubSub.subscribe(topic, (message) => {
    // Enviar el mensaje al usuario suscrito
    // (simulado aquí enviándolo a la consola)
    console.log(`Mensaje recibido en ${topic}: ${message}`);
  });
  res.status(200).json({ message: 'Suscripción exitosa.' });
});

// Configurar AutomaticCodeReloading para recargar automáticamente el código
const fileToWatch = __filename; // Este archivo
condorito.automaticCodeReloading.watch(fileToWatch);

// Implementar LiveViewManager para manejar vistas en tiempo real
const liveViewManager = condorito.liveViewManager;
const customLiveView = new CustomLiveView('/tweets', './public', 3001, {});
customLiveView.init(); // Llamar al método init después de la creación
liveViewManager.addLiveView(customLiveView);

// Iniciar el servidor
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
