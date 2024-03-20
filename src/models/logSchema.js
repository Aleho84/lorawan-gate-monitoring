import mongoose from 'mongoose';

export const logSchema = new mongoose.Schema({
  timestamp: Date,
  tipo: String,
  modulo: String,
  mensaje: String
});