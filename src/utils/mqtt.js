import mqtt from 'mqtt';
import { dataDao } from '../daos/index.js';
import logger from './logger.js';
import { mqttDataReciver } from '../controllers/mqttMessageReciver.js';

class MQTT {
    constructor(serverName, serverUsername, serverPassword, serverport, topic) {
        try {
            const client = new mqtt.connect('mqtt://' + serverName, {
                rejectUnauthorized: false,
                username: serverUsername,
                password: serverPassword,
                connectTimeout: 2000,
                port: serverport,
            });

            client.on('connect', function () {
                logger('info', 'MQTT', `Conected: ${topic}`);
                client.subscribe(topic, function (err) {
                    if (err) {
                        logger('error', 'MQTT', `❌ Error: ${topic} ${err}`);
                    } else {
                        logger('info', 'MQTT', `✅ Subscribed!: ${topic}`);
                        dataDao.exportDataToCSV();
                        //client.publish(topic, "hello");
                    }
                });
            });

            client.on('message', function (tp, msg) {
                logger('info', 'MQTT', `${tp.toString()}: ${msg.toString()}`);
                mqttDataReciver(msg);
                //client.end();
            });
        } catch (error) {
            logger('error', 'MQTT', `${error}`);
        }
    }
}

export default MQTT;