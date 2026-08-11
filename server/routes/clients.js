import express from 'express'
import Client from '../models/Client.js'

const router = express.Router()

// GET all clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: 1 })
    res.json(clients)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET single client
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
    if (!client) return res.status(404).json({ error: 'Client not found' })
    res.json(client)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST create client
router.post('/', async (req, res) => {
  try {
    const client = new Client({
      name: req.body.name,
      totalOrders: 0,
      status: 'New',
      measurements: req.body.measurements || {}
    })
    const saved = await client.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PUT update client
router.put('/:id', async (req, res) => {
  try {
    const updated = await Client.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
    if (!updated) return res.status(404).json({ error: 'Client not found' })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE client
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Client.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Client not found' })
    res.json({ message: 'Client deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
