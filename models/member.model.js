import mongoose from "mongoose"
import payments from "./payment.model.js"

const Schema = mongoose.Schema;

const memberSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: String, required: true },
  genre: { type: String, required: false },
  email: { type: String, required: true },
  phonenumber: { type: String, required: false },
  classesEnrolled: [String],
  activePayment: payments.schema
}, {
  collection: 'members',
  timestamps: true,
  excludeIndexes: true
});

memberSchema.index({ email: 1 }, { unique: true })

const member = mongoose.model('Member', memberSchema);

export default member