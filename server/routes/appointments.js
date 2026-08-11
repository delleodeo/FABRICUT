import express from 'express'
import Appointment from '../models/Appointment.js'

const router = express.Router()

// GET all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: 1 })
    res.json(appointments)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET single appointment
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' })
    res.json(appointment)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST create appointment
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment({
      time: req.body.time,
      client: req.body.client,
      service: req.body.service,
      status: 'Confirmed',
      date: req.body.date
    })
    const saved = await appointment.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PUT update appointment
router.put('/:id', async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    )
    if (!updated) return res.status(404).json({ error: 'Appointment not found' })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE appointment
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Appointment not found' })
    res.json({ message: 'Appointment deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
