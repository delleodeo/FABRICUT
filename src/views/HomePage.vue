<template>
  <div class="home-page">
    <div class="grid grid-2">
      <!-- Left Column -->
      <div class="left-column">
        <!-- Today's Focus -->
        <div class="card mb-3">
          <div class="card-header">Today's Focus</div>
          <div class="card-body">
            <div class="flex-between">
              <span>📅 Appointments ({{ appointments.length }})</span>
            </div>
          </div>
        </div>

        <!-- Work in Progress -->
        <div class="card mb-3">
          <div class="card-header">Work in Progress</div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Clothes</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="work in workInProgress" :key="work.id">
                  <td>{{ work.client }}</td>
                  <td>{{ work.clothes }}</td>
                  <td>{{ work.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Measurements -->
        <div class="card mb-3">
          <div class="card-header">Measurements</div>
          <div class="card-body">
            <div class="measurements-display">
              <div class="measurement-figure">
                <svg width="180" height="300" viewBox="0 0 180 300">
                  <!-- Blue Figure (Male) -->
                  <g>
                    <!-- Head -->
                    <circle cx="50" cy="40" r="22" fill="#2B4896" />
                    <!-- Torso -->
                    <ellipse cx="50" cy="100" rx="32" ry="45" fill="#2B4896" />
                    <!-- Legs -->
                    <rect x="28" y="140" width="44" height="90" rx="22" fill="#2B4896" />
                    <!-- Male Icon -->
                    <svg x="40" y="240" width="20" height="20" viewBox="0 0 24 24" fill="#2B4896">
                      <path d="M12 2C10.34 2 9 3.34 9 5s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm-1 15v-2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V17h4v-5c0-1.1-.9-2-2-2h-7c-1.1 0-2 .9-2 2v5h4z"/>
                    </svg>
                  </g>

                  <!-- Gold Figure (Female) -->
                  <g>
                    <!-- Head -->
                    <circle cx="130" cy="40" r="22" fill="#D4AF37" />
                    <!-- Torso -->
                    <ellipse cx="130" cy="100" rx="35" ry="48" fill="#D4AF37" />
                    <!-- Legs -->
                    <rect x="106" y="140" width="48" height="90" rx="24" fill="#D4AF37" />
                    <!-- Female Icon -->
                    <svg x="120" y="240" width="20" height="20" viewBox="0 0 24 24" fill="#D4AF37">
                      <path d="M12 2C10.34 2 9 3.34 9 5s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm-1.5 18h3v2h-3v-2zm-2-8c-1.1 0-2 .9-2 2v3h10v-3c0-1.1-.9-2-2-2h-6z"/>
                    </svg>
                  </g>
                </svg>
              </div>

              <div class="measurement-inputs">
                <div class="form-group">
                  <label class="form-label">Chest (cm)</label>
                  <input type="text" class="form-input" placeholder="Enter measurement" v-model="measurements.chest">
                </div>
                <div class="form-group">
                  <label class="form-label">Sleeves</label>
                  <input type="text" class="form-input" placeholder="Enter measurement" v-model="measurements.sleeves">
                </div>
                <div class="form-group">
                  <label class="form-label">Sleeves Length (cm)</label>
                  <input type="text" class="form-input" placeholder="Enter measurement" v-model="measurements.sleevesLength">
                </div>
                <div class="form-group">
                  <label class="form-label">Neck</label>
                  <input type="text" class="form-input" placeholder="Enter measurement" v-model="measurements.neck">
                </div>
                <div class="form-group">
                  <label class="form-label">Hips</label>
                  <input type="text" class="form-input" placeholder="Enter measurement" v-model="measurements.hips">
                </div>
                <div class="flex gap-2">
                  <button class="btn btn-primary" @click="handleSaveMeasurements">Save</button>
                  <button class="btn btn-secondary" @click="handleCancelMeasurements">Cancel</button>
                </div>
              </div>
            </div>

            <div class="card mt-3" style="background-color: #f8f9fa;">
              <div class="card-header" style="background: none; border: none;">The Book - Personal Notes</div>
              <div class="card-body">
                <textarea
                  class="form-textarea"
                  rows="3"
                  placeholder="Add personal notes about the client..."
                  v-model="measurements.notes"
                  style="font-style: italic;"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <!-- Quick Overview -->
        <div class="card mb-3">
          <div class="card-header">Quick Overview</div>
          <div class="card-body">
            <div class="overview-item" v-for="item in quickOverview" :key="item.label">
              <div class="flex-between mb-2">
                <span>{{ item.icon }} {{ item.label }} ({{ item.count }})</span>
                <span>{{ item.action }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Client Profiles -->
        <div class="card mb-3">
          <div class="card-header">Client Profiles</div>
          <div class="card-body">
            <div class="client-list">
              <div class="client-item" v-for="client in clientProfiles" :key="client.name">
                <span>{{ client.name }}</span>
                <button class="btn-icon">🔍</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Client History -->
        <div class="card">
          <div class="card-header">Client History</div>
          <div class="card-body">
            <div class="history-section mb-2">
              <strong>Orders</strong>
              <div class="mt-1">
                <div class="history-item" v-for="order in clientHistory" :key="order.id">
                  <div class="flex-between">
                    <span>{{ order.name }}</span>
                    <span style="font-size: 12px; color: #6c757d;">{{ order.date }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/composables/useStore'

export default {
  name: 'HomePage',
  setup() {
    const { store, saveMeasurements } = useStore()
    return { store, saveMeasurements }
  },
  data() {
    return {
      measurements: {
        chest: '',
        sleeves: '',
        sleevesLength: '',
        neck: '',
        hips: '',
        notes: 'Prefers silk lining, loves emerald green, owns a fluffy white cat.'
      },
      workInProgress: [
        { id: 1, client: 'Jenelyn', clothes: 'Dress', date: 'Friday' },
        { id: 2, client: 'Vargas', clothes: 'Suit', date: 'Saturday' }
      ],
      quickOverview: [
        { label: 'Appointments', count: 0, icon: '📅', action: '📋' },
        { label: 'New inquiries', count: 0, icon: '👥', action: '👤' },
        { label: 'On-going', count: 2, icon: '⚙️', action: '👥' },
        { label: 'Client inquiries', count: 0, icon: '❓', action: '👤' }
      ]
    }
  },
  computed: {
    appointments() {
      return this.store.appointments
    },
    clientProfiles() {
      return this.store.clients.slice(0, 6)
    },
    clientHistory() {
      return this.store.orders.slice(0, 4).map(order => ({
        id: order.id,
        name: order.item,
        date: order.date
      }))
    }
  },
  mounted() {
    this.measurements = { ...this.store.measurements }
  },
  watch: {
    'store.measurements': {
      handler(val) {
        this.measurements = { ...val }
      },
      deep: true
    }
  },
  methods: {
    async handleSaveMeasurements() {
      try {
        await this.saveMeasurements(this.measurements)
        alert('Measurements saved successfully!')
      } catch (err) {
        alert('Error: ' + err.message)
      }
    },
    handleCancelMeasurements() {
      this.measurements = { ...this.store.measurements }
    }
  }
}
</script>

<style scoped>
.home-page {
  width: 100%;
}

.measurements-display {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.measurement-figure {
  flex-shrink: 0;
}

.measurement-inputs {
  flex: 1;
}

.overview-item {
  padding: 0.75rem;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  margin-bottom: 0.5rem;
}

.client-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.client-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
}

.history-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--gray-200);
}

.history-item:last-child {
  border-bottom: none;
}

@media (max-width: 768px) {
  .measurements-display {
    flex-direction: column;
  }
}
</style>
