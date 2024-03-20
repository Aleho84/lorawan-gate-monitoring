import { logDao } from '../daos/index.js';

export default function (tipo, modulo, mensaje) {
    const data_log = {
        timestamp: new Date(Date.now()),
        tipo,
        modulo,
        mensaje
    };

    console.log(`<<${data_log.timestamp.toString()}>> [${modulo}]: ${mensaje}`);

    try {
        logDao.create(data_log);
    } catch (error) {
        console.error('*ERROR EN LOGGER*', error);
    }
}