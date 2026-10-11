import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import clientRoutes from './routes/clients.js'
import orderRoutes from './routes/orders.js'
import appointmentRoutes from './routes/appointments.js'
import measurementRoutes from './routes/measurements.js'
// sdasdasdasda
const app = express()
const PORT = 5000
const MONGO_URI = 'mongodb+srv://bacongcodaryl_db_user:dWxKq9GkXhcM8HHc@cluster0.vqe8g5l.mongodb.net/?appName=Cluster0'


app.use(cors({ origin: '*' }))
app.use(express.json())

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message)
    process.exit(1)
  })

app.use('/api/clients', clientRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/measurements', measurementRoutes)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
})
