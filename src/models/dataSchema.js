import mongoose from 'mongoose';

export const dataSchema = new mongoose.Schema({
  bat: Number,
  switch: Number,  
  deveui: String,
  payload_rcv: {
    decoderAvailable: Boolean,
    protocolVersion: Number,
    sensorID: Number,
    sensorName: String,
    reportType: Number,
    batteryVoltage: Number,
    contactState: Number,
    contactStateString: String
  },
  LoRa: {
    LrrRSSI: Number,
    LrrSNR: Number
  },
  time: Date
});
