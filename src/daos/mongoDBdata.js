import MongoClass from '../containers/mongoClass.js';
import { dataSchema } from '../models/dataSchema.js';
import { devices } from '../config/settings.js';
import logger from '../utils/logger.js';
import { Parser } from 'json2csv';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class MongoDBData extends MongoClass {
    constructor() {
        super('raw', dataSchema);
    };

    async getLast(deveui) {
        try {
            const one = await this.collection.find({ deveui }).sort({ time: -1 }).limit(1);
            return one;
        } catch (err) {
            throw new Error(err);
        };
    };

    async getLastDeviceStates() {
        try {
            // Obtiene los dispositivos únicos del array
            const uniqueDeveuis = [...new Set(devices.map((device) => device.deveui))];

            // Consulta los últimos registros para cada dispositivo
            const latestData = await Promise.all(
                uniqueDeveuis.map(async (deveui) => {
                    const deviceData = await this.collection.findOne({ deveui, switch: { $in: [0, 1] } }).sort({ time: -1 });
                    return deviceData ?? { deveui, switch: -1, bat: -1 };
                })
            );

            // Formatea los datos según tu ejemplo
            const formattedData = latestData.map((doc) => ({
                deveui: doc.deveui,
                description: devices.find((device) => device.deveui === doc.deveui)?.description || 'Unknown',
                switch: doc.switch,
                bat: doc.bat,
                time: doc.time,
            }));
            return formattedData;
        } catch (error) {
            logger('error', 'DAO', `❌ Error al obtener el estado de los ultimos dispositivos (getLastDeviceStates) (/src/daos/mongoDBdata.js)`);
            return [];
        }
    }

    async getHistoryAll() {
        try {
            const deviceHistory = await this.collection.find({}).sort({ time: -1 }).limit(20);
            const formattedData = deviceHistory.map((doc) => ({
                deveui: doc.deveui,
                description: devices.find((device) => device.deveui === doc.deveui)?.description || 'Unknown',
                switch: doc.switch,
                bat: doc.bat,
                time: doc.time,
            }));
            return formattedData;
        } catch (error) {
            logger('error', 'DAO', `❌ Error al obtener el historial de registros (getHistoryAll) (/src/daos/mongoDBdata.js)`);
            return [];
        }
    }

    async exportDataToCSV() {
        try {
            const data = await this.collection.find({}).limit(500);
            const formattedData = data.map((doc) => ({
                time: doc.time,
                deveui: doc.deveui,
                description: devices.find((device) => device.deveui === doc.deveui)?.description || 'Unknown',
                switch: doc.switch,
                bat: doc.bat,
            }));
            const json2csvParser = new Parser();
            const csv = json2csvParser.parse(formattedData);
            fs.writeFile(path.join(__dirname, '../logs/tranqueras-mqtt.csv'), csv, function (err) {
                if (err) throw err;
            });
        } catch (error) {
            logger('error', 'DAO', `${error}`);
        }
    }
};