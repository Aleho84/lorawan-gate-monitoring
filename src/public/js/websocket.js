const socket = io();
let messages = [];

//Socket Events
socket.on('server_handshake', () => {
    socket.emit('client_handshake');
    logLoad();
});