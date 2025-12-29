import { deviceDao } from '../daos/index.js';
import logger from '../utils/logger.js';

export const getDevicesPage = async (req, res) => {
    try {
        const devices = await deviceDao.getAll(); // Assuming getAll exists or inherits find({})
        res.render('devices', {
            title: 'Dispositivos',
            devices,
            user: "Admin" // Placeholder user 
        });
    } catch (error) {
        logger('error', 'CONTROLLER', `❌ Error getting devices page: ${error}`);
        res.render('error', { message: 'Error getting devices', error });
    }
};

export const addDevice = async (req, res) => {
    try {
        const { deveui, description } = req.body;
        // Basic validation
        if (!deveui || !description) {
            return res.status(400).json({ error: 'DevEUI and Description are required' });
        }

        await deviceDao.create({ deveui, description });
        logger('info', 'CONTROLLER', `✅ Device added: ${deveui}`);
        res.redirect('/devices');
    } catch (error) {
        logger('error', 'CONTROLLER', `❌ Error adding device: ${error}`);
        res.status(500).render('error', { message: 'Error adding device', error });
    }
};

export const editDevice = async (req, res) => {
    try {
        const { id } = req.params;
        const { deveui, description } = req.body;

        await deviceDao.update(id, { deveui, description });
        logger('info', 'CONTROLLER', `✅ Device updated: ${id}`);
        res.redirect('/devices');
    } catch (error) {
        logger('error', 'CONTROLLER', `❌ Error editing device: ${error}`);
        res.status(500).render('error', { message: 'Error editing device', error });
    }
};

export const deleteDevice = async (req, res) => {
    try {
        const { id } = req.params;
        await deviceDao.delete(id);
        logger('info', 'CONTROLLER', `✅ Device deleted: ${id}`);
        // If called via AJAX, return JSON, otherwise redirect. 
        // For simplicity with EJS forms, we might use POST with method override or just POST to delete route.
        // Assuming simple link/form:
        res.redirect('/devices');
    } catch (error) {
        logger('error', 'CONTROLLER', `❌ Error deleting device: ${error}`);
        res.status(500).render('error', { message: 'Error deleting device', error });
    }
};
