import { logDao } from '../daos/index.js';

export default function (tipo, modulo, mensaje) {
    const data_log = {
        timestamp: formatDate(new Date(Date.now())),
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

const formatDate = function (date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}