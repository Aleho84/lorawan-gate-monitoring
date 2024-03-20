import 'dotenv/config';
import mqtt from 'mqtt';

const send_data = '{"bat": 3.6, "switch": 1, "deveui": "00137A100000313B", "payload_rcv": {"decoderAvailable": true, "protocolVersion": 1, "sensorID": 29, "sensorName": "R718F", "reportType": 1, "batteryVoltage": 3.6, "contactState": 1, "contactStateString": "On"}, "LoRa": {"LrrRSSI": -117.0, "LrrSNR": -1.5}, "time": "2024-02-26T11:44:46.087000-03:00"}';

const topic = process.env.MQTT_TOPIC

const client = new mqtt.connect('mqtt://' + process.env.MQTT_SERVER, {
    rejectUnauthorized: false,
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASS,
    connectTimeout: 2000,
    port: process.env.MQTT_PORT,
});

client.on('connect', function () {
    console.log(`[MQTT]: Conected: ${topic}`);
    client.subscribe(topic, function (err) {
        if (err) {
            console.log(`[MQTT]: Error: ${topic}`);
        } else {
            console.log(`[MQTT]: Subscribed!: ${topic}`);
            console.log(`[MQTT]: Pulicando...: ${send_data}`);
            client.publish(topic, send_data);
            client.end();
        }
    });
});