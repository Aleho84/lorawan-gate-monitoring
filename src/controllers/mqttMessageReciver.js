import 'dotenv/config';
import { dataDao, deviceDao } from '../daos/index.js';
import sendEmail from '../utils/mailer.js';

import { getIo } from '../config/websocket.js';

export const mqttDataReciver = async function (msg) {
    try {
        const msgObj = JSON.parse(msg);

        // Fix: Parsea la fecha "DD/MM/YYYY HH:mm:ss"
        if (msgObj.timestamp && typeof msgObj.timestamp === 'string') {
            msgObj.time = parseCustomDate(msgObj.timestamp);
            delete msgObj.timestamp;
        } else if (typeof msgObj.time === 'string') {
            // Fix: si el tiempo viene como string en el mismo formato
            msgObj.time = parseCustomDate(msgObj.time);
        } else if (!msgObj.time) {
            msgObj.time = new Date();
        }

        const device = await deviceDao.getByDeveui(msgObj.deveui);
        const description = device ? device.description : 'Unknown';

        console.log('*********************** DEBUGER: mqttDataReciver ***********************');
        console.log('-DEVEUI         :', msgObj.deveui);
        console.log('-DESCRIPTION    :', description);
        console.log('-SWITCH         :', msgObj.switch);

        if (msgObj.switch === 2 || description === 'Unknown') {
            console.log('-OMITIDO!');
            console.log('************************************************************************');
            return
        }

        const lastData = await dataDao.getLast(msgObj.deveui);

        if (lastData.length === 0) {
            console.log('-NUEVO!');
            console.log('-SEND EMAIL   :', true);
            mqttNotifier(msgObj, description);
        } else {
            console.log('-ESTADO ANTERIOR:', lastData[0].switch);
            console.log('-ESTADO ACTUAL  :', msgObj.switch);

            const sendEmail = lastData[0].switch !== msgObj.switch;
            console.log('-SEND EMAIL     :', sendEmail);

            if (sendEmail) {
                mqttNotifier(msgObj, description);
            }
        }

        const newData = await dataDao.create(msgObj);
        dataDao.exportDataToCSV();

        // Emit socket event for real-time update
        try {
            const io = getIo();
            const payload = {
                ...msgObj,
                description: description,
                formattedTime: msgObj.time.toLocaleString('es-ES')
            };
            io.emit('dashboard:update', payload);
            console.log('-SOCKET EMIT    : dashboard:update');
            console.log(payload);
        } catch (socketError) {
            console.error('Error emitting socket event:', socketError);
        }

        console.log('************************************************************************');
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

function parseCustomDate(dateStr) {
    try {
        // Formato esperado: "DD/MM/YYYY HH:mm:ss"
        const [datePart, timePart] = dateStr.split(' ');
        if (!datePart || !timePart) return new Date(dateStr); // Intento estandard si falla split

        const [day, month, year] = datePart.split('/').map(Number);
        const [hour, minute, second] = timePart.split(':').map(Number);

        // Verificar si los componentes son válidos
        if (isNaN(day) || isNaN(month) || isNaN(year)) return new Date(dateStr);

        return new Date(year, month - 1, day, hour, minute, second);
    } catch (e) {
        console.error("Error parsing date:", dateStr, e);
        return new Date();
    }
}

function mqttNotifier(msgObj, description) {
    let estado = '';
    (msgObj.switch === 1) ? estado = 'abierto' : estado = 'cerrado';

    const imgOpen = 'https://cdn.icon-icons.com/icons2/2248/PNG/96/boom_gate_up_icon_137856.png';
    const imgClose = 'https://cdn.icon-icons.com/icons2/2248/PNG/96/boom_gate_down_icon_135872.png'

    const htmlMsg = `
        <div style="text-align: center;">
            <h1>${description}</h1>
            <img src="${(estado === 'abierto') ? imgOpen : imgClose}" alt="Tranquera">
            <h1>Porton ${estado}.</h1>
        </div>
    `;

    sendEmail({
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_TO,
        subject: `${description}  -  ${estado.toUpperCase()}`,
        html: htmlMsg
    })
        .then(info => {
            console.log(`-EMAIL Response: ${info.message}`);
        })
}