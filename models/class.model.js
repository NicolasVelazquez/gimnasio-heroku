import mongoose from "mongoose"

const Schema = mongoose.Schema;

const classSchema = new Schema({
  name: { type: String, required: true },
  scheduleDays: { type: [String], required: true },
  scheduleHours: { type: [String], required: true }
}, {
  collection: 'classes'
});

classSchema.index({ name: 1 }, { unique: true })

const classMongo = mongoose.model('Classes', classSchema);

export default classMongo