<template>
  <div class="status-page">
    <!-- Status Cards -->
    <div class="grid grid-3 mb-3">
      <div class="stat-card">
        <div class="flex-between">
          <div>
            <div class="stat-card-label">Pending Orders</div>
            <div class="stat-card-value">{{ statusCards.pending.percentage }}%</div>
            <div class="stat-card-subtitle">{{ statusCards.pending.count }} orders waiting</div>
          </div>
          <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div class="stat-card gold">
        <div class="flex-between">
          <div>
            <div class="stat-card-label">In Progress</div>
            <div class="stat-card-value">{{ statusCards.inProgress.percentage }}%</div>
            <div class="stat-card-subtitle">{{ statusCards.inProgress.count }} orders active</div>
          </div>
          <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
      </div>

      <div class="stat-card green">
        <div class="flex-between">
          <div>
            <div class="stat-card-label">Completed</div>
            <div class="stat-card-value">{{ statusCards.completed.percentage }}%</div>
            <div class="stat-card-subtitle">{{ statusCards.completed.count }} orders done</div>
          </div>
          <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>

    <div class="grid grid-2">
      <!-- Left Column -->
      <div class="left-column">
        <!-- Work Status Overview -->
        <div class="card mb-3">
          <div class="card-header">Work Status Overview</div>
          <div class="card-body">
            <div class="status-progress-item" v-for="status in workStatus" :key="status.label">
              <div class="flex-between mb-1">
                <span style="font-weight: 600;">{{ status.label }}</span>
                <span style="font-weight: 600;">{{ status.percentage }}%</span>
              </div>
              <div class="progress-bar progress-bar-labelled" :aria-label="`${status.label} ${status.percentage}%`">
                <div class="progress-fill" :class="status.color" :style="{ width: status.percentage + '%' }"></div>
                <span class="progress-label">{{ status.percentage }}%</span>
              </div>
              <div style="font-size: 12px; color: var(--gray-600); margin-top: 0.25rem;">
                {{ status.description }}
              </div>
            </div>
          </div>
        </div>

        <!-- Performance Metrics -->
        <div class="card">
          <div class="card-header">Performance Metrics</div>
          <div class="card-body">
            <div class="metric-item" v-for="metric in performanceMetrics" :key="metric.label">
              <div class="flex-between">
                <span>{{ metric.label }}</span>
                <span style="font-weight: 600;">{{ metric.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <!-- System Status -->
        <div class="card mb-3">
          <div class="card-header">System Status</div>
          <div class="card-body">
            <div class="status-item" v-for="item in systemStatus" :key="item.title">
              <div class="status-item-info">
                <svg
                  class="status-item-icon"
                  :class="{ warning: item.status === 'warning' }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    v-if="item.status === 'good'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div>
                  <div class="status-item-title">{{ item.title }}</div>
                  <div class="status-item-subtitle">{{ item.subtitle }}</div>
                </div>
              </div>
              <span class="status-badge" :class="item.status">{{ item.badge }}</span>
            </div>

            <div style="font-size: 12px; color: var(--gray-500); margin-top: 1rem; font-style: italic;">
              Last updated: {{ lastUpdated }}
            </div>
          </div>
        </div>

        <!-- Alerts & Notifications -->
        <div class="card">
          <div class="card-header">Alerts & Notifications</div>
          <div class="card-body">
            <div class="alert alert-warning" v-for="alert in alerts" :key="alert.id">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20" style="flex-shrink: 0;">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <div>
                <div style="font-weight: 600;">{{ alert.title }}</div>
                <div style="font-size: 13px;">{{ alert.message }}</div>
              </div>
            </div>

            <div class="alert alert-success" v-if="latestCompletedOrder">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20" style="flex-shrink: 0;">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <div>
                <div style="font-weight: 600;">Order Completed</div>
                <div style="font-size: 13px;">{{ latestCompletedOrder.client }} - {{ latestCompletedOrder.item }} ready for pickup</div>
              </div>
            </div>

            <div class="text-center mt-3">
              <a href="#" class="link">View All Notifications</a>
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
  name: 'Status',
  setup() {
    const { store } = useStore()
    return { store }
  },
  data() {
    return {
      lastUpdated: new Date().toLocaleString(),
      systemStatus: [
        {
          title: 'Upcoming Deadlines',
          subtitle: 'All on track',
          status: 'good',
          badge: 'Good'
        },
        {
          title: 'Issues',
          subtitle: 'No problems detected',
          status: 'good',
          badge: 'None'
        },
        {
          title: 'System Maintenance',
          subtitle: 'Optional performance',
          status: 'warning',
          badge: '95%'
        }
      ],
      performanceMetrics: [
        { label: 'Average Completion Time', value: '5.2 days' },
        { label: 'Customer Satisfaction', value: '98%' },
        { label: 'On-Time Delivery', value: '95%' }
      ]
    }
  },
  computed: {
    orderCounts() {
      return {
        total: this.store.orders.length,
        pending: this.store.orders.filter(order => order.status === 'Pending').length,
        inProgress: this.store.orders.filter(order => order.status === 'In Progress').length,
        completed: this.store.orders.filter(order => order.status === 'Completed').length
      }
    },
    statusCards() {
      return {
        pending: {
          percentage: this.percentage(this.orderCounts.pending),
          count: this.orderCounts.pending
        },
        inProgress: {
          percentage: this.percentage(this.orderCounts.inProgress),
          count: this.orderCounts.inProgress
        },
        completed: {
          percentage: this.percentage(this.orderCounts.completed),
          count: this.orderCounts.completed
        }
      }
    },
    workStatus() {
      const milestoneSummary = this.store.orders
        .filter(order => order.status !== 'Completed')
        .reduce((summary, order) => {
          const key = order.milestone || 'Pattern selection'
          summary[key] = (summary[key] || 0) + 1
          return summary
        }, {})

      const milestoneText = Object.entries(milestoneSummary)
        .map(([label, count]) => `${label}: ${count}`)
        .join(', ')

      return [
        {
          label: 'Pending Orders',
          percentage: this.statusCards.pending.percentage,
          description: `${this.orderCounts.pending} orders awaiting start`,
          color: ''
        },
        {
          label: 'In Progress',
          percentage: this.statusCards.inProgress.percentage,
          description: milestoneText || 'No active milestones',
          color: 'yellow'
        },
        {
          label: 'Completed',
          percentage: this.statusCards.completed.percentage,
          description: `${this.orderCounts.completed} orders successfully finished`,
          color: 'green'
        }
      ]
    },
    alerts() {
      return this.store.orders
        .filter(order => order.status === 'Pending' || Number(order.progress || 0) < 50)
        .slice(0, 3)
        .map(order => ({
          id: order.id,
          title: order.status === 'Pending' ? 'Pending Work' : 'Progress Check',
          message: `${order.client} - ${order.item} is at ${order.milestone || 'Pattern selection'}`
        }))
    },
    latestCompletedOrder() {
      return [...this.store.orders].reverse().find(order => order.status === 'Completed')
    }
  },
  methods: {
    percentage(count) {
      if (!this.orderCounts.total) return 0
      return Math.round((count / this.orderCounts.total) * 100)
    }
  }
}
</script>

<style scoped>
.status-page {
  width: 100%;
}

.status-progress-item {
  padding: 1rem 0;
  border-bottom: 1px solid var(--gray-200);
}

.status-progress-item:last-child {
  border-bottom: none;
}

.progress-bar-labelled {
  position: relative;
}

.progress-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: var(--gray-800);
}

.metric-item {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--gray-200);
}

.metric-item:last-child {
  border-bottom: none;
}
</style>
