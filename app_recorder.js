const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const multer = require('multer');
const cors = require('cors');

function listarAudios() {
  return fs.readdirSync('./audios');
}

class ViewRenderer {
  constructor(viewPath) {
    this.viewPath = viewPath;
  }

  renderView(data, callback) {
    const viewFilePath = path.join(__dirname, this.viewPath);
    ejs.renderFile(viewFilePath, data, callback);
  }

  updatePartialDOM(html, ws) {
    ws.send(JSON.stringify({ type: 'partialUpdate', html }));
  }
}

class LiveView {
  constructor(viewPath, staticPath, port) {
    this.viewRenderer = new ViewRenderer(viewPath);
    this.staticPath = staticPath;
    this.port = port;
    this.app = express();
    this.app.use(cors());
    this.server = http.createServer(this.app).listen(this.port, '0.0.0.0');
    this.webSocketServer = new WebSocket.Server({ server: this.server });
    this.audioDir = './audios';
    this.activeClients = new Set(); // Lista de clientes WebSocket activos
    this.init();
  }

  addClient(ws) {
    this.activeClients.add(ws);
  }

  removeClient(ws) {
    this.activeClients.delete(ws);
  }

  notifyClients(message) {
    this.activeClients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  init() {
    if (!fs.existsSync(this.audioDir)) {
      fs.mkdirSync(this.audioDir);
    }

    const upload = multer({
      dest: this.audioDir,
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'audio/wav') {
          cb(null, true);
        } else {
          cb(new Error('El archivo debe ser de tipo WAV.'));
        }
      },
      filename: (req, file, cb) => {
        const fileName = `audio_${Date.now()}.wav`;
        cb(null, fileName);
      }
    }).single('audio');

    this.app.get('/audios/:fileName', (req, res) => {
      const fileName = req.params.fileName;
      const audioFilePath = path.join(__dirname, 'audios', fileName);
      res.sendFile(audioFilePath);
    });

    this.app.use(express.static(this.staticPath));

    this.app.get('/service-worker.js', (req, res) => {
      res.sendFile(path.join(__dirname, this.staticPath, 'service-worker.js'));
    });

    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, this.staticPath, 'index.html'));
    });

    this.app.get('/audios', (req, res) => {
      try {
        const listaAudios = listarAudios();
        res.json(listaAudios);
      } catch (error) {
        console.error('Error al obtener la lista de audios:', error);
        res.status(500).send('Error interno del servidor al obtener la lista de audios.');
      }
    });

    this.app.post('/upload-audio', upload, (req, res) => {
      const audioFile = req.file;

      if (!audioFile) {
        return res.status(400).send('No se ha seleccionado ningún archivo de audio.');
      }

      const audioFileName = `${Date.now()}_${audioFile.originalname}`;
      const audioFilePath = path.join(this.audioDir, audioFileName);
      fs.renameSync(audioFile.path, audioFilePath);
      console.log('Archivo de audio guardado en:', audioFilePath);

      this.notifyClients(JSON.stringify({ type: 'audioUploaded', fileName: audioFileName }));

      res.send('Archivo de audio subido correctamente.');
    });

    this.webSocketServer.on('connection', (ws, req) => {
      const clientIp = req.connection.remoteAddress;
      console.log('Cliente conectado desde la dirección IP:', clientIp);

      this.addClient(ws);

      ws.on('close', () => {
        console.log('Cliente desconectado');
        this.removeClient(ws);
      });

      ws.on('message', async (message) => {
        console.log('Evento recibido desde el cliente:', message);
        const fileName = message;
        const audioPath = path.join(__dirname, 'audios', fileName);

        try {
          const audioData = fs.readFileSync(audioPath);
          ws.send(audioData);
        } catch (error) {
          console.error('Error al leer el archivo de audio:', error);
        }
      });
    });

    this.server.listen(this.port, () => {
      console.log(`Servidor escuchando en el puerto ${this.port}`);
    });
  }
}

const liveView = new LiveView('views/index.ejs', 'public', 3000);

const recorderScript = `
let recorder;
let audioStream;
let chunks = [];

function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      audioStream = stream;
      recorder = new MediaRecorder(stream);
      recorder.ondataavailable = event => {
        chunks.push(event.data);
      };
      recorder.start();
    })
    .catch(error => console.error('Error al acceder al dispositivo de audio:', error));
}

function stopRecording() {
  if (recorder && recorder.state === 'recording') {
    recorder.stop();
    audioStream.getTracks().forEach(track => track.stop());
    recorder = null;
    audioStream = null;
  }
}

function playRecording(audioUrl) {
  const audio = new Audio(audioUrl);
  audio.play();
}

document.getElementById('startRecordButton').addEventListener('click', startRecording);
document.getElementById('stopRecordButton').addEventListener('click', stopRecording);
`;

liveView.webSocketServer.on('connection', (ws) => {
  liveView.viewRenderer.updatePartialDOM(recorderScript, ws);
});
