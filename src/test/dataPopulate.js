import fs from 'fs';
import connectDB from '../config/connect-db.js';
import { dataDao } from '../daos/index.js';

const example = { "bat": 3.6, "switch": 1, "deveui": "00137A100000313B", "payload_rcv": { "decoderAvailable": true, "protocolVersion": 1, "sensorID": 29, "sensorName": "R718F", "reportType": 1, "batteryVoltage": 3.6, "contactState": 1, "contactStateString": "On" }, "LoRa": { "LrrRSSI": -119.0, "LrrSNR": -1.75 }, "time": "2024-02-26T05:44:47.065000-03:00" }

connectDB()
  .then(() => {
    const fileContent = fs.readFileSync('./src/logs/gsj_sasis_log', 'utf-8');
    const lines = fileContent.trim().split('\n');

    lines.forEach((line, index) => {
      try {
        dataDao.create(JSON.parse(line));
      } catch (error) {
        console.error(`Error al parsear el registro ${index + 1}:`, error);
      }
    });
  })
