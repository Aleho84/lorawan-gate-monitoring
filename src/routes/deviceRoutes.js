import { Router } from 'express';
import { getDevicesPage, addDevice, editDevice, deleteDevice } from '../controllers/deviceController.js';

const deviceRouter = Router();

deviceRouter.get('/', getDevicesPage);
deviceRouter.post('/add', addDevice);
deviceRouter.post('/edit/:id', editDevice);
deviceRouter.get('/delete/:id', deleteDevice); // Usando GET por simplicidad

export default deviceRouter;
