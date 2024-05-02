// Condorito.js
const fs = require('fs');
const express = require('express');
const https = require('https');
const cors = require('cors');
const WebSocket = require('ws');
class Condorito {
  constructor() {
    this.channels = new Channels();
    this.presence = new Presence();
    this.pubSub = new PubSub();
    this.elixirLikeSyntax = new ElixirLikeSyntax();
    this.automaticCodeReloading = new AutomaticCodeReloading();
    this.liveViewManager = new LiveViewManager();
    this.initExpress(); // Agregar este método de inicialización
  }
  
  initExpress() {
    this.elixirLikeSyntax.app = express();
  }
  
}

class Channels {
  constructor() {
    this.channels = {};
  }

  join(channelName, ws) {
    if (!this.channels[channelName]) {
      this.channels[channelName] = [];
    }
    this.channels[channelName].push(ws);
  }

  leave(channelName, ws) {
    if (this.channels[channelName]) {
      const index = this.channels[channelName].indexOf(ws);
      if (index !== -1) {
        this.channels[channelName].splice(index, 1);
      }
    }
  }

  broadcast(channelName, message) {
    if (this.channels[channelName]) {
      this.channels[channelName].forEach(ws => {
        ws.send(message);
      });
    }
  }
}

class Presence {
  constructor() {
    this.presence = {};
  }

  join(userId, socketId) {
    if (!this.presence[userId]) {
      this.presence[userId] = [];
    }
    this.presence[userId].push(socketId);
  }

  leave(userId, socketId) {
    if (this.presence[userId]) {
      const index = this.presence[userId].indexOf(socketId);
      if (index !== -1) {
        this.presence[userId].splice(index, 1);
      }
    }
  }

  getPresence(userId) {
    return this.presence[userId] || [];
  }
}

class PubSub {
  constructor() {
    this.topics = {};
  }

  subscribe(topic, callback) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    this.topics[topic].push(callback);
  }

  unsubscribe(topic, callback) {
    if (this.topics[topic]) {
      const index = this.topics[topic].indexOf(callback);
      if (index !== -1) {
        this.topics[topic].splice(index, 1);
      }
    }
  }

  publish(topic, message) {
    if (this.topics[topic]) {
      this.topics[topic].forEach(callback => {
        callback(message);
      });
    }
  }
}

class ElixirLikeSyntax {
  constructor() {
    this.routes = [];
  }

  get(path, handler) {
    this.routes.push({ method: 'GET', path, handler });
  }

  post(path, handler) {
    this.routes.push({ method: 'POST', path, handler });
  }

  put(path, handler) {
    this.routes.push({ method: 'PUT', path, handler });
  }

  delete(path, handler) {
    this.routes.push({ method: 'DELETE', path, handler });
  }

  patch(path, handler) {
    this.routes.push({ method: 'PATCH', path, handler });
  }

  head(path, handler) {
    this.routes.push({ method: 'HEAD', path, handler });
  }

  options(path, handler) {
    this.routes.push({ method: 'OPTIONS', path, handler });
  }

  resource(name, options) {
    const resource = new Resource(name, options);
    this.routes.push(resource);
  }
}

class Resource {
  constructor(name, options) {
    this.name = name;
    this.options = options;
  }

  get(path, handler) {
    this.options.get.push({ path, handler });
  }

  post(path, handler) {
    this.options.post.push({ path, handler });
  }

  put(path, handler) {
    this.options.put.push({ path, handler });
  }

  delete(path, handler) {
    this.options.delete.push({ path, handler });
  }

  patch(path, handler) {
    this.options.patch.push({ path, handler });
  }

  head(path, handler) {
    this.options.head.push({ path, handler });
  }

  options(path, handler) {
    this.options.options.push({ path, handler });
  }
}

class AutomaticCodeReloading {
  constructor() {
    this.watchers = {};
  }

  watch(file) {
    const watcher = fs.watch(file, () => {
      console.log(`File changed: ${file}`);
      // Recargar el código
      require.cache[file] = null;
      delete require.cache[file];
    });
    this.watchers[file] = watcher;
  }

  unwatch(file) {
    if (this.watchers[file]) {
      this.watchers[file].close();
      delete this.watchers[file];
    }
  }
}

class LiveView {
  constructor(viewPath, staticPath, port, sslOptions) {
    if (new.target === LiveView) {
      throw new Error('LiveView cannot be instantiated directly. Please extend it and provide implementation for init method.');
    }
    this.viewPath = viewPath;
    this.staticPath = staticPath;
    this.port = port;
    this.sslOptions = sslOptions;
    this.app = express();
    this.app.use(cors());
    this.server = https.createServer(this.sslOptions, this.app).listen(this.port, '0.0.0.0');
    this.webSocketServer = new WebSocket.Server({ server: this.server });
    this.audioDir = './audios';
    this.activeClients = new Set();
    this.init();
  }

  init() {
    throw new Error('LiveView.init method must be implemented by extending classes.');
  }
}

class LiveViewManager {
  constructor() {
    this.liveViews = [];
  }

  addLiveView(liveView) {
    this.liveViews.push(liveView);
  }

  removeLiveView(liveView) {
    const index = this.liveViews.indexOf(liveView);
    if (index !== -1) {
      this.liveViews.splice(index, 1);
    }
  }

  getLiveViews() {
    return this.liveViews;
  }
}

module.exports = { Condorito, LiveView };

