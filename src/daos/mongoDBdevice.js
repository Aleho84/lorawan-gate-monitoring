import MongoClass from '../containers/mongoClass.js';
import { deviceSchema } from '../models/deviceSchema.js';
import logger from '../utils/logger.js';

export class MongoDBDevice extends MongoClass {
    constructor() {
        super('devices', deviceSchema);
    };

    /**
     * Busca un dispositivo por su DevEUI.
     * @param {string} deveui 
     * @returns {Promise<Object|null>} El dispositivo encontrado o null si no existe.
     */
    async getByDeveui(deveui) {
        try {
            return await this.collection.findOne({ deveui });
        } catch (error) {
            logger('error', 'DAO', `❌ Error getting device by deveui: ${error}`);
            throw error;
        }
    }

    /**
     * Verifica si la colección de dispositivos está vacía.
     * @returns {Promise<boolean>}
     */
    async isEmpty() {
        try {
            const count = await this.collection.countDocuments();
            return count === 0;
        } catch (error) {
            logger('error', 'DAO', `❌ Error checking if devices collection is empty: ${error}`);
            throw error;
        }
    }

    /**
     * Inserta múltiples dispositivos.
     * @param {Array} devices 
     */
    async insertMany(devices) {
        try {
            return await this.collection.insertMany(devices);
        } catch (error) {
            logger('error', 'DAO', `❌ Error inserting many devices: ${error}`);
            throw error;
        }
    }
};
