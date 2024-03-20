import { dataDao } from '../daos/index.js';
import { logDao } from '../daos/index.js';

export const deviceList = function (req, res, next) {
    dataDao.getLastDeviceStates()
        .then((response) => {
            res.LastDeviceStates = response
            next();
        })
}

export const deviceHistory = function (req, res, next) {
    dataDao.getHistoryAll()
        .then((response) => {
            res.DevicesHistory = response
            next();
        })
}

export const logHistory = function (req, res, next) {
    logDao.getHistoryAll()
        .then((response) => {
            res.LogsHistory = response
            next();
        })
}