import logger from '../utils/logger.js';

export default (ioServer) => {
    ioServer.on('connection', (socket) => {
        socket.emit(`server_handshake`);

        socket.on('client_handshake', () => {
            logger('info', 'WEBSOKET', `📱 Cliente [${socket.id}] conectado`);
        });

        socket.on('disconnect', () => {
            logger('info', 'WEBSOKET', `📱 Cliente [${socket.id}] desconectado`);
        });
    });
};