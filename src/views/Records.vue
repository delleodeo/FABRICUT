<template>
  <div class="records-page">
    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title">Order Records</h1>
      <div class="flex gap-2">
        <button class="btn btn-primary" @click="openAddOrderModal">+ Add Order</button>
        <button class="btn btn-secondary" @click="handleExport">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Generate Report
        </button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-4 mb-3">
      <div class="stat-card">
        <div class="stat-card-label">Total Orders</div>
        <div class="stat-card-value">{{ statistics.total }}</div>
      </div>
      <div class="stat-card gold">
        <div class="stat-card-label">In Progress</div>
        <div class="stat-card-value">{{ statistics.inProgress }}</div>
      </div>
      <div class="stat-card gray">
        <div class="stat-card-label">Completed</div>
        <div class="stat-card-value">{{ statistics.completed }}</div>
      </div>
      <div class="stat-card green">
        <div class="stat-card-label">Fabric Cut</div>
        <div class="stat-card-value">{{ statistics.fabricCut }}</div>
        <div class="stat-card-subtitle">total pieces recorded</div>
      </div>
    </div>

    <!-- Recent Orders Card -->
    <div class="card">
      <div class="card-header">Recent Orders</div>
      <div class="card-body">
        <!-- Filters -->
        <div class="report-toolbar mb-3">
          <div class="form-group" style="flex: 0 0 200px; margin-bottom: 0;">
            <input
              type="text"
              class="form-input"
              placeholder="mm/dd/yyyy"
              v-model="dateFilter"
            >
          </div>
          <div class="form-group" style="flex: 0 0 150px; margin-bottom: 0;">
            <select class="form-select" v-model="statusFilter">
              <option value="">All Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div class="form-group" style="flex: 0 0 180px; margin-bottom: 0;">
            <select class="form-select" v-model="fabricFilter">
              <option value="">All Fabric Types</option>
              <option v-for="fabric in fabricOptions" :key="fabric" :value="fabric">{{ fabric }}</option>
            </select>
          </div>
          <div class="form-group" style="flex: 1 1 240px; margin-bottom: 0;">
            <input
              type="search"
              class="form-input"
              placeholder="Search client, item, pattern..."
              v-model="searchFilter"
            >
          </div>
        </div>

        <!-- Orders Table -->
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Client</th>
                <th>Item</th>
                <th>Fabric</th>
                <th>Cut</th>
                <th>Milestone</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in filteredOrders" :key="order.id">
                <td><button class="link" style="border: none; background: none; cursor: pointer;" @click="viewOrderDetails(order)">{{ order.orderId }}</button></td>
                <td>{{ order.client }}</td>
                <td>{{ order.item }}</td>
                <td>
                  <div class="fabric-cell">
                    <span>{{ order.fabricType || 'Not set' }}</span>
                    <small v-if="order.fabricRisk">{{ order.fabricRisk }}</small>
                  </div>
                </td>
                <td>{{ Number(order.cutQuantity || 0).toLocaleString() }}</td>
                <td>
                  <div class="milestone-cell">
                    <span>{{ order.milestone || 'Pattern selection' }}</span>
                    <div class="progress-with-label">
                      <div class="progress-bar">
                        <div class="progress-fill" :class="getProgressColor(order.progress)" :style="{ width: normalizedProgress(order.progress) + '%' }"></div>
                      </div>
                      <small>{{ normalizedProgress(order.progress) }}%</small>
                    </div>
                  </div>
                </td>
                <td>{{ order.date }}</td>
                <td>
                  <span class="badge" :class="getBadgeClass(order.status)">
                    {{ order.status }}
                  </span>
                </td>
                <td>{{ order.amount }}</td>
                <td>
                  <button class="btn-icon" @click="openEditOrderModal(order)">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button class="btn-icon" @click="handleDeleteOrder(order.id)" style="color: #dc3545;">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Add/Edit Order Modal -->
    <Modal :isOpen="showOrderModal" :title="editingOrder ? 'Edit Order' : 'Add New Order'" size="lg" @close="closeOrderModal">
      <form @submit.prevent="handleSubmitOrder">
        <div class="form-group">
          <label class="form-label">Client*</label>
          <select class="form-select" v-model="orderForm.client" required>
            <option value="">Select client</option>
            <option v-for="client in store.clients" :key="client.id" :value="client.name">
              {{ client.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Item*</label>
          <input
            type="text"
            class="form-input"
            v-model="orderForm.item"
            placeholder="e.g., Bespoke Suit, Dress Alteration"
            required
          >
        </div>

        <div class="form-group">
          <label class="form-label">Date*</label>
          <input
            type="text"
            class="form-input"
            v-model="orderForm.date"
            placeholder="MM-DD-YY"
            required
          >
        </div>

        <div class="form-group">
          <label class="form-label">Status*</label>
          <select class="form-select" v-model="orderForm.status" required>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div class="section-label">Fabric and Cutting</div>
        <div class="order-form-grid">
          <div class="form-group">
            <label class="form-label">Fabric Type</label>
            <select class="form-select" v-model="orderForm.fabricType">
              <option value="">Select fabric</option>
              <option v-for="fabric in fabricOptions" :key="fabric" :value="fabric">{{ fabric }}</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Fabric Identification</label>
            <select class="form-select" v-model="orderForm.fabricRisk">
              <option value="">Not assessed</option>
              <option value="Low burn risk">Low burn risk</option>
              <option value="Moderate burn risk">Moderate burn risk</option>
              <option value="High burn risk">High burn risk</option>
              <option value="Requires sensor check">Requires sensor check</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">How Many Were Cut</label>
            <input type="number" min="0" class="form-input" v-model.number="orderForm.cutQuantity" placeholder="0">
          </div>

          <div class="form-group">
            <label class="form-label">Motor Speed</label>
            <input type="number" min="0" class="form-input" v-model.number="orderForm.motorSpeed" placeholder="RPM or configured value">
          </div>

          <div class="form-group">
            <label class="form-label">Milestone</label>
            <select class="form-select" v-model="orderForm.milestone">
              <option v-for="milestone in milestoneOptions" :key="milestone" :value="milestone">{{ milestone }}</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Progress</label>
            <input type="number" min="0" max="100" class="form-input" v-model.number="orderForm.progress" placeholder="0-100">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Pattern Sample / Output Notes</label>
          <textarea
            class="form-textarea"
            rows="3"
            v-model="orderForm.patternSample"
            placeholder="Pattern sample, system output, manual output comparison..."
          ></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Amount*</label>
          <input
            type="text"
            class="form-input"
            v-model="orderForm.amount"
            placeholder="₱0.00"
            required
          >
        </div>

        <div class="flex gap-2" style="justify-content: flex-end; margin-top: 1.5rem;">
          <button type="button" class="btn btn-secondary" @click="closeOrderModal">Cancel</button>
          <button type="submit" class="btn btn-primary">{{ editingOrder ? 'Update' : 'Add' }} Order</button>
        </div>
      </form>
    </Modal>

    <!-- Order Details Modal -->
    <Modal :isOpen="showDetailsModal" :title="`Order ${selectedOrder?.orderId}`" @close="closeDetailsModal">
      <div v-if="selectedOrder">
        <div class="detail-row">
          <strong>Order ID:</strong> {{ selectedOrder.orderId }}
        </div>
        <div class="detail-row">
          <strong>Client:</strong> {{ selectedOrder.client }}
        </div>
        <div class="detail-row">
          <strong>Item:</strong> {{ selectedOrder.item }}
        </div>
        <div class="detail-row">
          <strong>Date:</strong> {{ selectedOrder.date }}
        </div>
        <div class="detail-row">
          <strong>Status:</strong>
          <span class="badge" :class="getBadgeClass(selectedOrder.status)">
            {{ selectedOrder.status }}
          </span>
        </div>
        <div class="detail-row">
          <strong>Amount:</strong> {{ selectedOrder.amount }}
        </div>
        <div class="detail-row">
          <strong>Fabric Type:</strong> {{ selectedOrder.fabricType || 'Not set' }}
        </div>
        <div class="detail-row">
          <strong>Fabric Identification:</strong> {{ selectedOrder.fabricRisk || 'Not assessed' }}
        </div>
        <div class="detail-row">
          <strong>Pieces Cut:</strong> {{ Number(selectedOrder.cutQuantity || 0).toLocaleString() }}
        </div>
        <div class="detail-row">
          <strong>Milestone:</strong> {{ selectedOrder.milestone || 'Pattern selection' }}
        </div>
        <div class="detail-row stacked">
          <strong>Progress:</strong>
          <div class="progress-with-label">
            <div class="progress-bar">
              <div class="progress-fill" :class="getProgressColor(selectedOrder.progress)" :style="{ width: normalizedProgress(selectedOrder.progress) + '%' }"></div>
            </div>
            <small>{{ normalizedProgress(selectedOrder.progress) }}%</small>
          </div>
        </div>
        <div class="detail-row" v-if="selectedOrder.patternSample">
          <strong>Pattern Sample:</strong> {{ selectedOrder.patternSample }}
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { useStore } from '@/composables/useStore'
import Modal from '@/components/Modal.vue'

export default {
  name: 'Records',
  components: {
    Modal
  },
  setup() {
    const { store, addOrder, updateOrder, deleteOrder } = useStore()
    return { store, addOrder, updateOrder, deleteOrder }
  },
  data() {
    return {
      dateFilter: '',
      statusFilter: '',
      fabricFilter: '',
      searchFilter: '',
      showOrderModal: false,
      showDetailsModal: false,
      editingOrder: null,
      selectedOrder: null,
      orderForm: {
        client: '',
        item: '',
        date: '',
        status: 'Pending',
        amount: '',
        fabricType: '',
        fabricRisk: '',
        cutQuantity: 0,
        patternSample: '',
        milestone: 'Pattern selection',
        progress: 0,
        motorSpeed: 0
      },
      fabricOptions: ['Cotton', 'Linen', 'Wool', 'Silk', 'Denim', 'Polyester', 'Solar Fabric', 'Mixed Fabric'],
      milestoneOptions: ['Pattern selection', 'Fabric identification', 'Cutting', 'Quality check', 'Ready for pickup']
    }
  },
  computed: {
    statistics() {
      const total = this.store.orders.length
      const inProgress = this.store.orders.filter(o => o.status === 'In Progress').length
      const completed = this.store.orders.filter(o => o.status === 'Completed').length
      const fabricCut = this.store.orders.reduce((sum, order) => sum + Number(order.cutQuantity || 0), 0)
      return { total, inProgress, completed, fabricCut }
    },
    filteredOrders() {
      let filtered = this.store.orders

      if (this.statusFilter) {
        filtered = filtered.filter(order => order.status === this.statusFilter)
      }

      if (this.dateFilter) {
        filtered = filtered.filter(order => order.date.includes(this.dateFilter))
      }

      if (this.fabricFilter) {
        filtered = filtered.filter(order => order.fabricType === this.fabricFilter)
      }

      if (this.searchFilter) {
        const query = this.searchFilter.toLowerCase()
        filtered = filtered.filter(order =>
          [order.client, order.item, order.patternSample, order.orderId].some(value =>
            String(value || '').toLowerCase().includes(query)
          )
        )
      }

      return filtered
    }
  },
  methods: {
    getBadgeClass(status) {
      const statusMap = {
        'Completed': 'badge-completed',
        'In Progress': 'badge-in-progress',
        'Pending': 'badge-pending'
      }
      return statusMap[status] || 'badge-pending'
    },
    normalizedProgress(progress) {
      const value = Number(progress) || 0
      return Math.min(100, Math.max(0, value))
    },
    getProgressColor(progress) {
      const value = this.normalizedProgress(progress)
      if (value >= 80) return 'green'
      if (value >= 40) return 'yellow'
      return ''
    },
    openAddOrderModal() {
      this.editingOrder = null
      this.orderForm = {
        client: '',
        item: '',
        date: '',
        status: 'Pending',
        amount: '',
        fabricType: '',
        fabricRisk: '',
        cutQuantity: 0,
        patternSample: '',
        milestone: 'Pattern selection',
        progress: 0,
        motorSpeed: 0
      }
      this.showOrderModal = true
    },
    openEditOrderModal(order) {
      this.editingOrder = order
      this.orderForm = {
        client: order.client,
        item: order.item,
        date: order.date,
        status: order.status,
        amount: order.amount,
        fabricType: order.fabricType || '',
        fabricRisk: order.fabricRisk || '',
        cutQuantity: Number(order.cutQuantity || 0),
        patternSample: order.patternSample || '',
        milestone: order.milestone || 'Pattern selection',
        progress: Number(order.progress || 0),
        motorSpeed: Number(order.motorSpeed || 0)
      }
      this.showOrderModal = true
    },
    closeOrderModal() {
      this.showOrderModal = false
      this.editingOrder = null
    },
    async handleSubmitOrder() {
      try {
        if (this.editingOrder) {
          await this.updateOrder(this.editingOrder.id, this.orderForm)
          alert('Order updated successfully!')
        } else {
          await this.addOrder(this.orderForm)
          alert('Order added successfully!')
        }
        this.closeOrderModal()
      } catch (err) {
        alert('Error: ' + err.message)
      }
    },
    async handleDeleteOrder(id) {
      if (confirm('Are you sure you want to delete this order?')) {
        try {
          await this.deleteOrder(id)
          alert('Order deleted successfully!')
        } catch (err) {
          alert('Error: ' + err.message)
        }
      }
    },
    viewOrderDetails(order) {
      this.selectedOrder = order
      this.showDetailsModal = true
    },
    closeDetailsModal() {
      this.showDetailsModal = false
      this.selectedOrder = null
    },
    handleExport() {
      const csv = [
        ['Order ID', 'Client', 'Item', 'Fabric Type', 'Fabric Identification', 'Pieces Cut', 'Milestone', 'Progress', 'Motor Speed', 'Date', 'Status', 'Amount', 'Pattern Sample'],
        ...this.filteredOrders.map(o => [
          o.orderId,
          o.client,
          o.item,
          o.fabricType,
          o.fabricRisk,
          o.cutQuantity,
          o.milestone,
          o.progress,
          o.motorSpeed,
          o.date,
          o.status,
          o.amount,
          o.patternSample
        ])
      ].map(row => row.map(value => `"${String(value || '').replace(/"/g, '""')}"`).join(',')).join('\n')

      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
      alert('Filtered report generated successfully!')
    }
  }
}
</script>

<style scoped>
.records-page {
  width: 100%;
}

.report-toolbar,
.order-form-grid {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.order-form-grid .form-group {
  flex: 1 1 220px;
}

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

.fabric-cell,
.milestone-cell {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.fabric-cell small,
.milestone-cell small {
  color: var(--gray-500);
  font-size: 12px;
}

.progress-with-label {
  display: grid;
  grid-template-columns: minmax(90px, 1fr) auto;
  align-items: center;
  gap: 0.5rem;
}

.detail-row {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row.stacked {
  align-items: flex-start;
}

.detail-row.stacked .progress-with-label {
  flex: 1;
}
</style>
