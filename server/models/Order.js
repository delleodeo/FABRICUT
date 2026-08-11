import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  client: { type: String, required: true },
  item: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'In Progress', 'Completed'] },
  amount: { type: String, required: true },
  fabricType: { type: String, default: '' },
  fabricRisk: { type: String, default: '' },
  cutQuantity: { type: Number, default: 0, min: 0 },
  patternSample: { type: String, default: '' },
  milestone: {
    type: String,
    default: 'Pattern selection',
    enum: ['Pattern selection', 'Fabric identification', 'Cutting', 'Quality check', 'Ready for pickup']
  },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  motorSpeed: { type: Number, default: 0, min: 0 }
}, { timestamps: true })

orderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
  }
})

export default mongoose.model('Order', orderSchema)
