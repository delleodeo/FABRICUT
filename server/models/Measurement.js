import mongoose from 'mongoose'

const measurementSchema = new mongoose.Schema({
  chest: { type: String, default: '' },
  sleeves: { type: String, default: '' },
  sleevesLength: { type: String, default: '' },
  neck: { type: String, default: '' },
  hips: { type: String, default: '' },
  notes: { type: String, default: '' }
}, { timestamps: true })

measurementSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
  }
})

export default mongoose.model('Measurement', measurementSchema)
