import mongoose from 'mongoose';

const { Schema } = mongoose;

export const deviceSchema = new Schema({
    deveui: { type: String, required: true, unique: true },
    description: { type: String, required: true },
});
