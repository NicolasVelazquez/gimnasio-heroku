import mongoose from "mongoose"

const Schema = mongoose.Schema;

const planSchema = new Schema({
    type: { type: String, enum: 
        ['diario', 'semanal', 'quincenal', 'mensual', 'semestral', 'anual'], 
        required: true },
    price: Number,
    days: Number
}, {
    collection: 'plans'
});

const plan = mongoose.model('Plans', planSchema);

export default plan