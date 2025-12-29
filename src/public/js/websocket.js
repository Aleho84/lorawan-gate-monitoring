const socket = io();
let messages = [];

//Socket Events
socket.on('server_handshake', () => {
    socket.emit('client_handshake');
    console.log('Handshake completed');
});

socket.on('dashboard:update', (data) => {
    console.log('Dashboard Update:', data);
    updateDeviceRow(data);
    addHistoryRow(data);
});

function updateDeviceRow(data) {
    // Buscar la fila del dispositivo por deveui
    // Asumimos que la fila tiene un atributo o clase identificable, si no, buscaremos por el texto de la primera celda
    // Como no tenemos IDs únicos en las filas, iteramos

    // NOTA: Para una mejor implementación, deberíamos agregar un ID a la fila <tr> en el HTML, ej: id="device-${deveui}"
    // Pero para respetar el HTML existente, buscaremos la fila que contenga el deveui

    $('table tbody tr').each(function () {
        const rowDeveui = $(this).find('td:first').text().trim();
        if (rowDeveui === data.deveui) {
            const switchCell = $(this).find('td:nth-child(3)'); // Tercera columna es estado
            const batCell = $(this).find('td:nth-child(4)');    // Cuarta columna es bateria

            // Actualizar Estado
            switchCell.removeClass('estado-abierto estado-cerrado estado-gris');
            if (data.switch === 1) {
                switchCell.addClass('estado-abierto').text('Porton Abierto');
            } else if (data.switch === 0) {
                switchCell.addClass('estado-cerrado').text('Portón Cerrado');
            } else {
                switchCell.addClass('estado-gris').text('Uknown');
            }

            // Actualizar Bateria
            batCell.removeClass('bateria-baja bateria-normal estado-gris');
            let batVal = parseFloat(data.bat);
            if (batVal === -1) {
                batCell.addClass('estado-gris').text('Uknown');
            } else if (batVal < 3.4) {
                batCell.addClass('bateria-baja').text(batVal);
            } else {
                batCell.addClass('bateria-normal').text(batVal);
            }
        }
    });
}

function addHistoryRow(data) {
    // La tabla de historico es la segunda tabla en la pagina (index 1)
    const historyTableBody = $('.tabla-container:eq(1) table tbody');

    const newRow = `
        <tr>
            <td class="sp_timestamp">${data.formattedTime || new Date().toLocaleString()}</td>
            <td class="sp_level">${data.deveui}</td>
            <td class="sp_message">${data.description}</td>
            <td class="sp_message">${data.switch}</td>
            <td class="sp_message">${data.bat}</td>
        </tr>
    `;

    historyTableBody.prepend(newRow);

    // Opcional: Limitar el numero de filas para que no crezca infinitamente
    if (historyTableBody.children().length > 50) {
        historyTableBody.children().last().remove();
    }
}