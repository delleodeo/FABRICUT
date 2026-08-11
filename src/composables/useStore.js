import { reactive } from 'vue'
import { apiGet, apiPost, apiPut, apiDelete } from './api.js'

const store = reactive({
  clients: [],
  orders: [],
  appointments: [],
  measurements: {
    chest: '',
    sleeves: '',
    sleevesLength: '',
    neck: '',
    hips: '',
    waist: '',
    shoulder: '',
    pantsSlope: '',
    sizeSelection: '',
    notes: ''
  },
  loading: false,
  error: null
})

let initialized = false

export function useStore() {
  const initialize = async () => {
    if (initialized) return
    initialized = true
    store.loading = true
    store.error = null
    try {
      const [clients, orders, appointments, measurements] = await Promise.all([
        apiGet('/clients'),
        apiGet('/orders'),
        apiGet('/appointments'),
        apiGet('/measurements')
      ])
      store.clients = clients
      store.orders = orders
      store.appointments = appointments
      if (measurements) store.measurements = measurements
    } catch (err) {
      store.error = err.message
      console.error('Failed to initialize store:', err)
      initialized = false
    } finally {
      store.loading = false
    }
  }

  // ── Client methods ──────────────────────────────────────────────────────────

  const addClient = async (client) => {
    const newClient = await apiPost('/clients', client)
    store.clients.push(newClient)
    return newClient
  }

  const updateClient = async (id, updates) => {
    const updated = await apiPut(`/clients/${id}`, updates)
    const index = store.clients.findIndex(c => c.id === id)
    if (index !== -1) store.clients[index] = updated
    return updated
  }

  const deleteClient = async (id) => {
    await apiDelete(`/clients/${id}`)
    const index = store.clients.findIndex(c => c.id === id)
    if (index !== -1) store.clients.splice(index, 1)
  }

  // ── Order methods ───────────────────────────────────────────────────────────

  const addOrder = async (order) => {
    const newOrder = await apiPost('/orders', order)
    store.orders.push(newOrder)
    const client = store.clients.find(c => c.name === order.client)
    if (client) {
      client.totalOrders = (client.totalOrders || 0) + 1
      if (client.status === 'New') client.status = 'Active'
    }
    return newOrder
  }

  const updateOrder = async (id, updates) => {
    const updated = await apiPut(`/orders/${id}`, updates)
    const index = store.orders.findIndex(o => o.id === id)
    if (index !== -1) store.orders[index] = updated
    return updated
  }

  const deleteOrder = async (id) => {
    const order = store.orders.find(o => o.id === id)
    await apiDelete(`/orders/${id}`)
    if (order) {
      const client = store.clients.find(c => c.name === order.client)
      if (client && client.totalOrders > 0) {
        client.totalOrders -= 1
        if (client.totalOrders === 0) client.status = 'New'
      }
    }
    const index = store.orders.findIndex(o => o.id === id)
    if (index !== -1) store.orders.splice(index, 1)
  }

  // ── Appointment methods ─────────────────────────────────────────────────────

  const addAppointment = async (appointment) => {
    const newAppointment = await apiPost('/appointments', appointment)
    store.appointments.push(newAppointment)
    return newAppointment
  }

  const updateAppointment = async (id, updates) => {
    const updated = await apiPut(`/appointments/${id}`, updates)
    const index = store.appointments.findIndex(a => a.id === id)
    if (index !== -1) store.appointments[index] = updated
    return updated
  }

  const deleteAppointment = async (id) => {
    await apiDelete(`/appointments/${id}`)
    const index = store.appointments.findIndex(a => a.id === id)
    if (index !== -1) store.appointments.splice(index, 1)
  }

  // ── Measurement methods ─────────────────────────────────────────────────────

  const saveMeasurements = async (measurements) => {
    const updated = await apiPut('/measurements', measurements)
    store.measurements = updated
    return updated
  }

  return {
    store,
    initialize,
    addClient,
    updateClient,
    deleteClient,
    addOrder,
    updateOrder,
    deleteOrder,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    saveMeasurements
  }
}
