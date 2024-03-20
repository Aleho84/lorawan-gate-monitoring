import 'dotenv/config';
import connectDB from './config/connect-db.js';
import cors from 'cors';
import express from 'express';
import { fileURLToPath } from 'url';
import http from 'http';
import https from 'https';
import MQTT from './utils/mqtt.js'
import path from 'path';
import { Server } from "socket.io";
import websockets from './config/websocket.js';
import logger from './utils/logger.js';
import fs from 'fs';

import indexRouter from './routes/indexRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MONGODB
connectDB()
    .then(() => {
        // EXPRESS
        const app = express();
        let httpServer;

        if (process.env.PROTOCOL == 'https') {
            const options = {
                key: fs.readFileSync(path.join(__dirname, './certificates/key.pem')),
                cert: fs.readFileSync(path.join(__dirname, './certificates/cert.pem'))
            };
            httpServer = https.createServer(options, app);
        } else {
            httpServer = http.createServer(app);
        }

        const ioServer = new Server(httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            }
        });

        // MIDDLEWARES
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(express.static(path.join(__dirname, './public')));
        app.use(cors({
            origin: '*',
            methods: 'GET, POST, PUT, DELETE, OPTIONS'
        }));

        //VIEW
        app.set('views', path.join(__dirname, './views/pages'));
        app.set('view engine', 'ejs');

        // ERROR HANDLER
        app.use(function (error, req, res, next) {
            // solo da detalles del error en modo "development"
            res.locals.message = error.message;
            res.locals.error = process.env.NODE_ENV === 'development' ? error : {};
            res.status(error.status || 500);
            res.render('error');
        })

        // ROUTES
        app.use('/', indexRouter);

        // WEBSOKET
        websockets(ioServer);

        // HTTP SERVER
        logger('info', 'SERVER', `🌱 ENVIRONMENT=${process.env.NODE_ENV}`);
        const portNormalizer = normalizePort(process.env.PORT);
        app.set('port', portNormalizer);
        httpServer.listen(portNormalizer);
        httpServer.on('error', onError);
        httpServer.on('listening', onListening);

        // MQTT
        logger('info', 'MQTT', `Conectando...`);
        const mqttReader = new MQTT(
            process.env.MQTT_SERVER,
            process.env.MQTT_USER,
            process.env.MQTT_PASS,
            process.env.MQTT_PORT,
            process.env.MQTT_TOPIC,
            process.env.MQTT_SENDER
        );

        function normalizePort(val) {
            // normaliza un puerto en un numero, una cadena o un valor falso.
            const port = parseInt(val, 10);

            if (isNaN(port)) { return val }
            if (port >= 0) { return port }
            return false;
        };

        function onError(error) {
            // event listener para HTTP server cuando devuelve "error"
            if (error.syscall !== 'listen') {
                throw error;
            }

            const bind = typeof portNormalizer === 'string'
                ? 'Pipe ' + portNormalizer
                : 'Port ' + portNormalizer;

            switch (error.code) {
                case 'EACCES':
                    logger('error', 'SERVER', `❌ ${bind} requiere permisos elevados (./src/app.js)`);
                    process.exit(1);
                    break
                case 'EADDRINUSE':
                    logger('error', 'SERVER', `❌ ${bind} ya esta utilizado (/src/app.js)`);
                    console.exit(1);
                    break
                default:
                    logger('error', 'SERVER', `❌ Error al conectar: [${error}]`);
                    throw error;
            };
        };

        function onListening() {
            // event listener para HTTP server
            const addr = httpServer.address();
            const bind = typeof addr === 'string'
                ? 'pipe ' + addr
                : 'port ' + addr.port;
            logger('info', 'SERVER', `💻 Server process.env.PROTOCOL: ${process.env.PROTOCOL} en PUERTO: ${process.env.PORT}. 🪛  Worker PID: ${process.pid}.`);
        };
    });