import 'dotenv/config';
import { dataDao } from '../daos/index.js';
import sendEmail from '../utils/mailer.js';
import { devices } from '../config/settings.js';

export const mqttDataReciver = async function (msg) {
    try {
        const msgObj = JSON.parse(msg);
        const description = devices.find((device) => device.deveui === msgObj.deveui)?.description || 'Unknown';

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

        dataDao.create(msgObj);
        dataDao.exportDataToCSV();
        console.log('************************************************************************');
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
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