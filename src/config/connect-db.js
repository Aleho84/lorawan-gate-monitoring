import 'dotenv/config';
import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import { devices } from './settings.js';
import { MongoDBDevice } from '../daos/mongoDBdevice.js';

export default async () => {
    switch (process.env.DB_MODE) {
        case 'mongo':
            try {
                await mongoose.set("strictQuery", false);
                await mongoose.connect(process.env.MONGOOSE_URI);
                logger('info', 'MONGODB', `💾 Conectado a MongoDB {${process.env.MONGOOSE_URI}}`);

                // Migracion inicial de dispositivos
                const deviceDao = new MongoDBDevice();
                if (await deviceDao.isEmpty()) {
                    logger('info', 'MONGODB', '⚠️ Colección de dispositivos vacía. Migrando desde settings.js...');
                    await deviceDao.insertMany(devices);
                    logger('info', 'MONGODB', '✅ Migración de dispositivos completada.');
                }
                break;
            } catch (error) {
                logger('error', 'MONGODB', `❌ ${error}`);
                process.exit(1);
            };
        default:
            logger('error', 'MONGODB', `❌ DB_MODE no esta definido. (/src/config/connect-db.js)`);
            process.exit(1);
    };
};