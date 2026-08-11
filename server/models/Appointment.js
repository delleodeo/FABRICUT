import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
  time: { type: String, required: true },
  client: { type: String, required: true },
  service: { type: String, required: true },
  status: { type: String, default: 'Confirmed', enum: ['Confirmed', 'Cancelled', 'Pending'] },
  date: { type: String, required: true }
}, { timestamps: true })

appointmentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
  }
})

export default mongoose.model('Appointment', appointmentSchema)
