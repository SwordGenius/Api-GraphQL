import mongoose from "mongoose";

const KaijuSchema = new mongoose.Schema({
   nombre: {
       type: String,
       required: true
   },
    altura: {
         type: Number,
         required: true
    },
    peso: {
        type: Number,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: false
    },
    deleted_at: {
        type: Date,
        required: false
    },
});

export const Kaiju = mongoose.model('Kaiju', KaijuSchema);