import MongoClass from '../containers/mongoClass.js';
import { logSchema } from '../models/logSchema.js';

export class MongoDBData extends MongoClass {
    constructor() {
        super('log', logSchema);
    };

    async getHistoryAll() {
        try {
            const deviceHistory = await this.collection.find({}).sort({ timestamp: -1 }).limit(10);
            const formattedData = deviceHistory.map((doc) => ({
                timestamp: doc.timestamp,
                tipo: doc.tipo,
                modulo: doc.modulo,
                mensaje: doc.mensaje,
            }));
            return formattedData;
        } catch (error) {
            logger('error', 'DAO', `❌ Error al obtener el historial de registros (getHistoryAll) (/src/daos/mongoDBlog.js)`);
            return [];
        }
    }
};