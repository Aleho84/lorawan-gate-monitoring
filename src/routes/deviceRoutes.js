import { Router } from 'express';
import { getDevicesPage, addDevice, editDevice, deleteDevice } from '../controllers/deviceController.js';

const deviceRouter = Router();

deviceRouter.get('/', getDevicesPage);
deviceRouter.post('/add', addDevice);
deviceRouter.post('/edit/:id', editDevice);
deviceRouter.post('/delete/:id', deleteDevice);

export default deviceRouter;
