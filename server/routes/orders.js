import express from 'express'
import Order from '../models/Order.js'
import Client from '../models/Client.js'

const router = express.Router()

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: 1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST create order
router.post('/', async (req, res) => {
  try {
    const count = await Order.countDocuments()
    const orderId = `ORD-${String(count + 1).padStart(3, '0')}`

    const order = new Order({
      orderId,
      client: req.body.client,
      item: req.body.item,
      date: req.body.date,
      status: req.body.status || 'Pending',
      amount: req.body.amount,
      fabricType: req.body.fabricType || '',
      fabricRisk: req.body.fabricRisk || '',
      cutQuantity: Number(req.body.cutQuantity) || 0,
      patternSample: req.body.patternSample || '',
      milestone: req.body.milestone || 'Pattern selection',
      progress: Number(req.body.progress) || 0,
      motorSpeed: Number(req.body.motorSpeed) || 0
    })
    const saved = await order.save()

    // Update client totalOrders and status
    await Client.findOneAndUpdate(
      { name: req.body.client },
      { $inc: { totalOrders: 1 }, $set: { status: 'Active' } }
    )

    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PUT update order
router.put('/:id', async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
    if (!updated) return res.status(404).json({ error: 'Order not found' })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE order
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ error: 'Order not found' })

    await order.deleteOne()

    // Decrement client totalOrders
    const client = await Client.findOne({ name: order.client })
    if (client && client.totalOrders > 0) {
      client.totalOrders -= 1
      if (client.totalOrders === 0) client.status = 'New'
      await client.save()
    }

    res.json({ message: 'Order deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
