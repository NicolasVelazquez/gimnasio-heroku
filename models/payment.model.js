import mongoose from "mongoose"

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    memberId: mongoose.ObjectId,
    memberEmail: String,
    type: { type: String, enum: 
        ['Diario', 'Semanal', 'Quincenal', 'Mensual', 'Semestral', 'Anual'], 
        required: true },
    price: Number,
    start: String,
    end: String
}, {
    collection: 'payments'
});

paymentSchema.index({ memberId: 1 }, { unique: false })

const payments = mongoose.model('Payments', paymentSchema);

export default payments