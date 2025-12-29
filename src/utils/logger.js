import { logDao } from '../daos/index.js';

export default function (tipo, modulo, mensaje) {
    const now = new Date();
    // Save raw date for Mongoose compatibility
    const data_log = {
        timestamp: now,
        tipo,
        modulo,
        mensaje
    };

    // Formatted string for console
    const consoleTimestamp = formatDate(now);
    console.log(`<<${consoleTimestamp}>> [${modulo}]: ${mensaje}`);

    try {
        if (logDao) {
            logDao.create(data_log);
        }
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