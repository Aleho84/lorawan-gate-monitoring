import packageJson from '../../package.json' assert {type: "json"};
import { mqttDataReciver } from './mqttMessageReciver.js';

export const getIndexPage = async (req, res) => {
  try {
    const { LastDeviceStates, DevicesHistory, LogsHistory } = res;

    res.render('index', {
      title: packageJson.name.toUpperCase(),
      tablaDevice: LastDeviceStates,
      tablaHistory: DevicesHistory,
      tablaLog: LogsHistory,
      user: 'Aleho',
    });
  } catch (error) {
    res.render('error', { error });
  }
};

export const mqttInject = async (req, res) => {
  try {
    const msg = req.query.msg;
    if (!msg) throw new Error("no se paso un mensaje como parametro (/mqttIngect?msg=<mensaje>)");

    mqttDataReciver(msg);

    res.status(200).json({
      message: `ok: ${msg}`,
      error: null
    });
  } catch (error) {
    res.status(500).json({
      message: 'error',
      error: error.message
    });
  }
};

export const mqttTest = async (req, res) => {
  try {
    const timestamp = new Date(new Date().getTime() - 3 * 60 * 60 * 1000).toISOString().replace('Z', '-03:00');

    const deveui = req.query.deveui;
    if (!deveui) throw new Error("no se paso un mensaje como parametro (/mqttIngect?deveui=<id del dispositivo>)");

    const deveswitch = req.query.deveswitch;
    if (!deveswitch) throw new Error("no se paso un mensaje como parametro (/mqttIngect?deveswitch=<estado del switch>)");

    let send_data = `{"bat": 3.6, "switch": ${deveswitch}, "deveui": "${deveui}", "payload_rcv": {"decoderAvailable": true, "protocolVersion": 1, "sensorID": 29, "sensorName": "R718F", "reportType": 1, "batteryVoltage": 3.6, "contactState": 1, "contactStateString": "On"}, "LoRa": {"LrrRSSI": -117.0, "LrrSNR": -1.5}, "time": "${timestamp}"}`;
    mqttDataReciver(send_data);

    res.status(200).json({
      message: `ok: ${send_data}`,
      error: null
    });
  } catch (error) {
    res.status(500).json({
      message: 'error',
      error: error.message
    });
  }
};