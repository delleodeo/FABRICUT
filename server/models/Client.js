import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  totalOrders: { type: Number, default: 0 },
  status: { type: String, default: 'New', enum: ['New', 'Active', 'Inactive'] },
  measurements: {
    chest: { type: String, default: '' },
    sleeves: { type: String, default: '' },
    sleevesLength: { type: String, default: '' },
    neck: { type: String, default: '' },
    hips: { type: String, default: '' },
    waist: { type: String, default: '' },
    shoulder: { type: String, default: '' },
    pantsSlope: { type: String, default: '' },
    sizeSelection: { type: String, default: '' },
    notes: { type: String, default: '' }
  }
}, { timestamps: true })

clientSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
  }
})

export default mongoose.model('Client', clientSchema)
