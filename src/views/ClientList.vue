<template>
  <div class="client-list-page">
    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">Client Management</h1>
      <button class="btn btn-primary" @click="openAddClientModal">+ Add New Client</button>
    </div>

    <!-- Client List Card -->
    <div class="card">
      <div class="card-header">Client List</div>
      <div class="card-body">
        <div class="search-input mb-3">
          <svg class="search-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" class="form-input" placeholder="Search clients..." v-model="searchQuery">
        </div>

        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Total Orders</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="client in filteredClients" :key="client.id">
                <td>{{ client.name }}</td>
                <td>{{ client.totalOrders }}</td>
                <td>
                  <span class="badge" :class="`badge-${client.status.toLowerCase()}`">
                    {{ client.status }}
                  </span>
                </td>
                <td>
                  <button class="link" style="border:none;background:none;cursor:pointer;" @click="viewClientDetails(client)">View Details</button>
                  <span style="margin:0 0.5rem;">|</span>
                  <button class="link" style="border:none;background:none;cursor:pointer;" @click="openEditClientModal(client)">Edit</button>
                  <span style="margin:0 0.5rem;">|</span>
                  <button class="link" style="border:none;background:none;cursor:pointer;color:#dc3545;" @click="handleDeleteClient(client.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ── Add / Edit Client Modal ── -->
    <Modal :isOpen="showClientModal" :title="editingClient ? 'Edit Client' : 'Add New Client'" @close="closeClientModal">
      <form @submit.prevent="handleSubmitClient">
        <div class="form-group">
          <label class="form-label">Client Name*</label>
          <input type="text" class="form-input" v-model="clientForm.name" placeholder="Enter client name" required>
        </div>

        <div class="section-label">Measurements</div>
        <div class="measurements-grid">
          <div class="form-group">
            <label class="form-label">Chest (cm)</label>
            <input type="text" class="form-input" v-model="clientForm.measurements.chest" placeholder="e.g. 92">
          </div>
          <div class="form-group">
            <label class="form-label">Waist (cm)</label>
            <input type="text" class="form-input" v-model="clientForm.measurements.waist" placeholder="e.g. 76">
          </div>
          <div class="form-group">
            <label class="form-label">Hips (cm)</label>
            <input type="text" class="form-input" v-model="clientForm.measurements.hips" placeholder="e.g. 98">
          </div>
          <div class="form-group">
            <label class="form-label">Shoulder (cm)</label>
            <input type="text" class="form-input" v-model="clientForm.measurements.shoulder" placeholder="e.g. 44">
          </div>
          <div class="form-group">
            <label class="form-label">Neck (cm)</label>
            <input type="text" class="form-input" v-model="clientForm.measurements.neck" placeholder="e.g. 38">
          </div>
          <div class="form-group">
            <label class="form-label">Sleeves (cm)</label>
            <input type="text" class="form-input" v-model="clientForm.measurements.sleeves" placeholder="e.g. 62">
          </div>
          <div class="form-group">
            <label class="form-label">Sleeve Length (cm)</label>
            <input type="text" class="form-input" v-model="clientForm.measurements.sleevesLength" placeholder="e.g. 24">
          </div>
          <div class="form-group">
            <label class="form-label">Pants Slope</label>
            <input type="text" class="form-input" v-model="clientForm.measurements.pantsSlope" placeholder="e.g. 2 cm forward slope">
          </div>
          <div class="form-group">
            <label class="form-label">Size Selection</label>
            <select class="form-select" v-model="clientForm.measurements.sizeSelection">
              <option value="">Select size</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Personal Notes</label>
          <textarea class="form-textarea" rows="3" v-model="clientForm.measurements.notes" placeholder="Client preferences, special instructions..."></textarea>
        </div>

        <div class="flex gap-2" style="justify-content:flex-end;margin-top:1.5rem;">
          <button type="button" class="btn btn-secondary" @click="closeClientModal">Cancel</button>
          <button type="submit" class="btn btn-primary">{{ editingClient ? 'Update' : 'Add' }} Client</button>
        </div>
      </form>
    </Modal>

    <!-- ── Client Details Modal ── -->
    <Modal :isOpen="showDetailsModal" :title="selectedClient?.name || 'Client Details'" size="lg" @close="closeDetailsModal">
      <div v-if="selectedClient" class="details-body">

        <!-- Header: avatar + name + quick stats -->
        <div class="details-header-row">
          <div class="details-avatar">{{ selectedClient.name.charAt(0).toUpperCase() }}</div>
          <div class="details-name-block">
            <div class="details-client-name">{{ selectedClient.name }}</div>
            <span class="badge" :class="`badge-${selectedClient.status.toLowerCase()}`">{{ selectedClient.status }}</span>
          </div>
          <div class="details-stats">
            <div class="details-stat-box">
              <div class="details-stat-value">{{ selectedClient.totalOrders }}</div>
              <div class="details-stat-label">Total Orders</div>
            </div>
            <div class="details-stat-box">
              <div class="details-stat-value">{{ completedOrders.length }}</div>
              <div class="details-stat-label">Completed</div>
            </div>
            <div class="details-stat-box">
              <div class="details-stat-value">{{ activeOrders.length }}</div>
              <div class="details-stat-label">In Progress</div>
            </div>
          </div>
        </div>

        <!-- Measurements -->
        <div class="details-section">
          <div class="details-section-title">Measurements</div>
          <div v-if="hasMeasurements(selectedClient.measurements)" class="measurements-detail-grid">
            <div class="measure-item" v-if="selectedClient.measurements.chest">
              <span class="measure-label">Chest</span>
              <span class="measure-value">{{ selectedClient.measurements.chest }} cm</span>
            </div>
            <div class="measure-item" v-if="selectedClient.measurements.waist">
              <span class="measure-label">Waist</span>
              <span class="measure-value">{{ selectedClient.measurements.waist }} cm</span>
            </div>
            <div class="measure-item" v-if="selectedClient.measurements.hips">
              <span class="measure-label">Hips</span>
              <span class="measure-value">{{ selectedClient.measurements.hips }} cm</span>
            </div>
            <div class="measure-item" v-if="selectedClient.measurements.shoulder">
              <span class="measure-label">Shoulder</span>
              <span class="measure-value">{{ selectedClient.measurements.shoulder }} cm</span>
            </div>
            <div class="measure-item" v-if="selectedClient.measurements.neck">
              <span class="measure-label">Neck</span>
              <span class="measure-value">{{ selectedClient.measurements.neck }} cm</span>
            </div>
            <div class="measure-item" v-if="selectedClient.measurements.sleeves">
              <span class="measure-label">Sleeves</span>
              <span class="measure-value">{{ selectedClient.measurements.sleeves }} cm</span>
            </div>
            <div class="measure-item" v-if="selectedClient.measurements.sleevesLength">
              <span class="measure-label">Sleeve Length</span>
              <span class="measure-value">{{ selectedClient.measurements.sleevesLength }} cm</span>
            </div>
            <div class="measure-item" v-if="selectedClient.measurements.pantsSlope">
              <span class="measure-label">Pants Slope</span>
              <span class="measure-value">{{ selectedClient.measurements.pantsSlope }}</span>
            </div>
            <div class="measure-item" v-if="selectedClient.measurements.sizeSelection">
              <span class="measure-label">Size</span>
              <span class="measure-value">{{ selectedClient.measurements.sizeSelection }}</span>
            </div>
          </div>
          <div v-else class="empty-note">No measurements recorded yet.</div>

          <div v-if="selectedClient.measurements?.notes" class="notes-box">
            <div class="notes-label">Personal Notes</div>
            <p>{{ selectedClient.measurements.notes }}</p>
          </div>
        </div>

        <!-- Order History -->
        <div class="details-section">
          <div class="details-section-title">Order History ({{ clientOrders.length }})</div>
          <div v-if="clientOrders.length > 0" class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Item</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in clientOrders" :key="order.id">
                  <td>{{ order.orderId }}</td>
                  <td>{{ order.item }}</td>
                  <td>{{ order.date }}</td>
                  <td>
                    <span class="badge" :class="getBadgeClass(order.status)">{{ order.status }}</span>
                  </td>
                  <td>{{ order.amount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="empty-note">No orders yet.</div>
        </div>

        <!-- Appointments -->
        <div class="details-section">
          <div class="details-section-title">Appointments ({{ clientAppointments.length }})</div>
          <div v-if="clientAppointments.length > 0">
            <div class="appointment-row" v-for="appt in clientAppointments" :key="appt.id">
              <div>
                <div class="appt-service">{{ appt.service }}</div>
                <div class="appt-meta">{{ appt.date }} &bull; {{ appt.time }}</div>
              </div>
              <span class="badge badge-completed">{{ appt.status }}</span>
            </div>
          </div>
          <div v-else class="empty-note">No appointments scheduled.</div>
        </div>

      </div>
    </Modal>
  </div>
</template>

<script>
import { useStore } from '@/composables/useStore'
import Modal from '@/components/Modal.vue'

const emptyMeasurements = () => ({
  chest: '',
  waist: '',
  hips: '',
  shoulder: '',
  neck: '',
  sleeves: '',
  sleevesLength: '',
  pantsSlope: '',
  sizeSelection: '',
  notes: ''
})

export default {
  name: 'ClientList',
  components: { Modal },
  setup() {
    const { store, addClient, updateClient, deleteClient } = useStore()
    return { store, addClient, updateClient, deleteClient }
  },
  data() {
    return {
      searchQuery: '',
      showClientModal: false,
      showDetailsModal: false,
      editingClient: null,
      selectedClient: null,
      clientForm: {
        name: '',
        measurements: emptyMeasurements()
      }
    }
  },
  computed: {
    filteredClients() {
      if (!this.searchQuery) return this.store.clients
      return this.store.clients.filter(c =>
        c.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    clientOrders() {
      if (!this.selectedClient) return []
      return this.store.orders.filter(o => o.client === this.selectedClient.name)
    },
    completedOrders() {
      return this.clientOrders.filter(o => o.status === 'Completed')
    },
    activeOrders() {
      return this.clientOrders.filter(o => o.status === 'In Progress')
    },
    clientAppointments() {
      if (!this.selectedClient) return []
      return this.store.appointments.filter(a => a.client === this.selectedClient.name)
    }
  },
  methods: {
    hasMeasurements(m) {
      if (!m) return false
      return ['chest', 'waist', 'hips', 'shoulder', 'neck', 'sleeves', 'sleevesLength', 'pantsSlope', 'sizeSelection'].some(k => m[k])
    },
    getBadgeClass(status) {
      return (
        { Completed: 'badge-completed', 'In Progress': 'badge-in-progress', Pending: 'badge-pending' }[status] ||
        'badge-pending'
      )
    },
    openAddClientModal() {
      this.editingClient = null
      this.clientForm = { name: '', measurements: emptyMeasurements() }
      this.showClientModal = true
    },
    openEditClientModal(client) {
      this.editingClient = client
      this.clientForm = {
        name: client.name,
        measurements: { ...emptyMeasurements(), ...(client.measurements || {}) }
      }
      this.showClientModal = true
    },
    closeClientModal() {
      this.showClientModal = false
      this.editingClient = null
      this.clientForm = { name: '', measurements: emptyMeasurements() }
    },
    async handleSubmitClient() {
      try {
        if (this.editingClient) {
          await this.updateClient(this.editingClient.id, this.clientForm)
          alert('Client updated successfully!')
        } else {
          await this.addClient(this.clientForm)
          alert('Client added successfully!')
        }
        this.closeClientModal()
      } catch (err) {
        alert('Error: ' + err.message)
      }
    },
    async handleDeleteClient(id) {
      if (confirm('Are you sure you want to delete this client?')) {
        try {
          await this.deleteClient(id)
          alert('Client deleted successfully!')
        } catch (err) {
          alert('Error: ' + err.message)
        }
      }
    },
    viewClientDetails(client) {
      this.selectedClient = client
      this.showDetailsModal = true
    },
    closeDetailsModal() {
      this.showDetailsModal = false
      this.selectedClient = null
    }
  }
}
</script>

<style scoped>
.client-list-page { width: 100%; }

/* ── Add/Edit form ── */
.section-label {
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gray-500);
  margin: 1.25rem 0 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--gray-200);
}

.measurements-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 1rem;
}

/* ── Details modal ── */
.details-body {
  display: flex;
  flex-direction: column;
}

.details-header-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--gray-200);
}

.details-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--accent-gold, #D4AF37);
  color: white;
  font-size: 22px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.details-name-block {
  flex: 1;
}

.details-client-name {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.details-stats {
  display: flex;
  gap: 1.25rem;
}

.details-stat-box {
  text-align: center;
  min-width: 60px;
}

.details-stat-value {
  font-size: 22px;
  font-weight: 700;
  line-height: 1;
}

.details-stat-label {
  font-size: 11px;
  color: var(--gray-500);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-top: 2px;
  white-space: nowrap;
}

.details-section {
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--gray-200);
}

.details-section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.details-section-title {
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gray-500);
  margin-bottom: 0.75rem;
}

.measurements-detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.measure-item {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0.6rem;
  background: var(--gray-50);
  border-radius: var(--radius-md);
  font-size: 13px;
}

.measure-label { color: var(--gray-600); }
.measure-value { font-weight: 600; }

.notes-box {
  background: var(--gray-50);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  margin-top: 0.5rem;
}

.notes-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--gray-500);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.35rem;
}

.notes-box p {
  font-size: 14px;
  font-style: italic;
  margin: 0;
  color: var(--gray-700);
}

.empty-note {
  color: var(--gray-500);
  font-size: 13px;
  font-style: italic;
}

.appointment-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 0.75rem;
  background: var(--gray-50);
  border-radius: var(--radius-md);
  margin-bottom: 0.5rem;
}

.appt-service { font-weight: 600; font-size: 14px; }
.appt-meta { font-size: 12px; color: var(--gray-500); margin-top: 2px; }
</style>
