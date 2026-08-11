import express from 'express'
import Measurement from '../models/Measurement.js'

const router = express.Router()

// GET measurements (singleton - always returns the first document)
router.get('/', async (req, res) => {
  try {
    let measurement = await Measurement.findOne()
    if (!measurement) {
      measurement = await Measurement.create({
        chest: '',
        sleeves: '',
        sleevesLength: '',
        neck: '',
        hips: '',
        notes: ''
      })
    }
    res.json(measurement)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT update measurements (upsert)
router.put('/', async (req, res) => {
  try {
    let measurement = await Measurement.findOne()
    if (!measurement) {
      measurement = new Measurement(req.body)
    } else {
      Object.assign(measurement, req.body)
    }
    const saved = await measurement.save()
    res.json(saved)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default router
