import 'dotenv/config';
import axios from 'axios';

const protocol = process.env.PROTOCOL;
const timestamp = new Date(new Date().getTime() - 3 * 60 * 60 * 1000).toISOString().replace('Z', '-03:00');
const deveui = '0000000000000001';
const batValue = '3.6';
let switchValue = '0';
let send_data = `{"bat": ${batValue}, "switch": ${switchValue}, "deveui": "${deveui}", "payload_rcv": {"decoderAvailable": true, "protocolVersion": 1, "sensorID": 29, "sensorName": "R718F", "reportType": 1, "batteryVoltage": 3.6, "contactState": 1, "contactStateString": "On"}, "LoRa": {"LrrRSSI": -117.0, "LrrSNR": -1.5}, "time": "${timestamp}"}`;

axios.get(`${protocol}://localhost/mqttInject`, {
    params: {
        msg: send_data
    }
})
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(`STATUS: ${error.response.status} \nMESSAGE: ${error.response.data.error} \nCODE:${error.code}`);
    });

switchValue = '1';
send_data = `{"bat": ${batValue}, "switch": ${switchValue}, "deveui": "${deveui}", "payload_rcv": {"decoderAvailable": true, "protocolVersion": 1, "sensorID": 29, "sensorName": "R718F", "reportType": 1, "batteryVoltage": 3.6, "contactState": 1, "contactStateString": "On"}, "LoRa": {"LrrRSSI": -117.0, "LrrSNR": -1.5}, "time": "${timestamp}"}`;

axios.get(`${protocol}://localhost/mqttInject`, {
    params: {
        msg: send_data
    }
})
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(`STATUS: ${error.response.status} \nMESSAGE: ${error.response.data.error} \nCODE:${error.code}`);
    });