import mqtt from 'mqtt';
import { dataDao } from '../daos/index.js';
import logger from './logger.js';
import { mqttDataReciver } from '../controllers/mqttMessageReciver.js';

class MQTT {
    constructor(serverName, serverUsername, serverPassword, serverPort, topic) {
        this.serverName = serverName;
        this.serverUsername = serverUsername;
        this.serverPassword = serverPassword;
        this.serverPort = serverPort;
        this.topic = topic;
        this.retryConect = 1;
    }

    async connect() {
        try {
            const client = await mqtt.connect('mqtt://' + this.serverName, {
                rejectUnauthorized: false,
                username: this.serverUsername,
                password: this.serverPassword,
                connectTimeout: 3000,
                port: this.serverPort,
            });

            client.on('connect', () => {
                logger('info', 'MQTT', `Connected: ${this.topic}`);
                client.subscribe(this.topic, (err) => {
                    if (err) {
                        logger('error', 'MQTT', `❌ Error subscribing to topic ${this.topic}: ${err}`);
                    } else {
                        logger('info', 'MQTT', `✅ Subscribed to topic ${this.topic}`);
                        dataDao.exportDataToCSV();
                        //client.publish(this.topic, "hello");
                    }
                });
            });

            client.on('error', (error) => {
                logger('error', 'MQTT', `❌ Error conecting server ${this.serverName}: ${error}. retry: ${this.retryConect}`);
                this.retryConect += 1;
                if (this.retryConect > 3) {
                    logger('error', 'MQTT', `❌ Error conecting server ${this.serverName}: ${error}. Closing Server`);
                    if (process.env.NODE_ENV === 'development') {
                        logger('error', 'MQTT', `❌ MQTT no esta conectado, reinicie el servidor`);
                    } else {
                        process.exit(1);
                    }
                }
            });

            client.on('message', (topic, msg) => {
                logger('info', 'MQTT', `${topic.toString()}: ${msg.toString()}`);
                mqttDataReciver(msg);
            });

            return client;
        } catch (error) {
            logger('error', 'MQTT', `${error}`);
            throw error;
        }
    }
}

export default MQTT;