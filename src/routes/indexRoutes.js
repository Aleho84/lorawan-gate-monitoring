import { Router } from 'express';
import { deviceList, deviceHistory, logHistory } from '../middlewares/getInfo.js';

const indexRouter = Router();

import {
    getIndexPage,
    mqttInject,
    mqttTest,
} from '../controllers/indexController.js';

indexRouter.get('/', deviceList, deviceHistory, logHistory, getIndexPage);
indexRouter.get('/mqttInject', mqttInject);
indexRouter.get('/mqttTest', mqttTest);

export default indexRouter;