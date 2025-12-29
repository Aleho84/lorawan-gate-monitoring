import 'dotenv/config';
import logger from '../utils/logger.js';


let dataDao;
let logDao;
let deviceDao;

switch (process.env.DB_MODE) {
  case 'mongo': //importa el modelo para usar mongodb

    import('./mongoDBdata.js').then(({ MongoDBData }) => { dataDao = new MongoDBData() });
    import('./mongoDBlog.js').then(({ MongoDBData }) => { logDao = new MongoDBData() });
    import('./mongoDBdevice.js').then(({ MongoDBDevice }) => { deviceDao = new MongoDBDevice() });
    break;

  default:
    logger('error', 'DAOS', `❌ DB_MODE no definido. (/src/daos/index.js)`);
    process.exit(1);
};

export {
  dataDao,
  logDao,
  deviceDao
};