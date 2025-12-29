import logger from '../utils/logger.js';

let io;

export const initSocket = (ioServer) => {
    io = ioServer;
    io.on('connection', (socket) => {
        socket.emit(`server_handshake`);

        socket.on('client_handshake', () => {
            logger('info', 'WEBSOKET', `📱 Cliente [${socket.id}] conectado`);
        });

        socket.on('disconnect', () => {
            logger('info', 'WEBSOKET', `📱 Cliente [${socket.id}] desconectado`);
        });
    });
};

export const getIo = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};