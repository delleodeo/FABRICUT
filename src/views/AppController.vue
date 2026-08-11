<template>
  <div class="app-controller-page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Fabricut Controller</h1>
        <p class="page-subtitle">Pattern loading, cutting progress, and motor control for authorized users.</p>
      </div>
      <div class="role-switcher">
        <label class="form-label" for="role">Access Role</label>
        <select id="role" class="form-select" v-model="activeRole">
          <option v-for="role in roles" :key="role.name" :value="role.name">{{ role.name }}</option>
        </select>
      </div>
    </div>

    <div class="controller-shell">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2>Process Control</h2>
            <p>{{ currentRole.description }}</p>
          </div>
          <span class="badge" :class="isRestricted ? 'badge-pending' : 'badge-active'">
            {{ isRestricted ? 'Restricted' : 'Authorized' }}
          </span>
        </div>

        <div class="control-grid">
          <button class="control-button" :disabled="isRestricted" @click="uploadLayout">
            <span class="button-icon">UP</span>
            <span>Upload Pattern</span>
          </button>
          <button class="control-button" :disabled="isRestricted" @click="saveLayout">
            <span class="button-icon">SV</span>
            <span>Save Layout</span>
          </button>
          <button class="control-button success" :disabled="isRestricted || isRunning" @click="startProcess">
            <span class="button-icon">ST</span>
            <span>Start Cutting</span>
          </button>
          <button class="control-button danger" :disabled="isRestricted || !isRunning" @click="stopProcess">
            <span class="button-icon">SP</span>
            <span>Stop Motor</span>
          </button>
          <button class="control-button" :disabled="isRestricted" @click="confirmAction">
            <span class="button-icon">OK</span>
            <span>Confirm Output</span>
          </button>
          <button class="control-button" :disabled="!currentRole.permissions.includes('maintenance')" @click="runMaintenance">
            <span class="button-icon">MT</span>
            <span>Maintenance</span>
          </button>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h2>Cutting Status</h2>
            <p>Milestone-labelled progress with motor speed control.</p>
          </div>
          <span class="status-badge" :class="isRunning ? 'warning' : 'good'">{{ isRunning ? 'Running' : 'Idle' }}</span>
        </div>

        <div class="milestone-list">
          <div class="milestone-row" v-for="step in milestones" :key="step.label">
            <div>
              <strong>{{ step.label }}</strong>
              <span>{{ step.note }}</span>
            </div>
            <span>{{ step.complete ? 'Done' : step.active ? 'Active' : 'Queued' }}</span>
          </div>
        </div>

        <div class="progress-card">
          <div class="flex-between mb-1">
            <strong>{{ currentMilestone }}</strong>
            <strong>{{ progress }}%</strong>
          </div>
          <div class="progress-bar large">
            <div class="progress-fill" :class="progress >= 80 ? 'green' : 'yellow'" :style="{ width: progress + '%' }"></div>
          </div>
        </div>

        <div class="motor-control">
          <label class="form-label" for="motorSpeed">Motor Speed</label>
          <div class="motor-row">
            <input id="motorSpeed" type="range" min="0" max="100" step="5" v-model.number="motorSpeed" :disabled="isRestricted">
            <span>{{ motorSpeed }}%</span>
          </div>
        </div>
      </section>
    </div>

    <div class="notification-strip" v-if="notification">
      <strong>System Notice</strong>
      <span>{{ notification }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppController',
  data() {
    return {
      activeRole: 'Administrator',
      progress: 25,
      motorSpeed: 45,
      isRunning: false,
      timerId: null,
      notification: 'System is idle. Load a pattern before starting a cutting session.',
      roles: [
        {
          name: 'Administrator',
          description: 'Full access to layout, cutting, confirmation, and maintenance controls.',
          permissions: ['layout', 'cutting', 'confirm', 'maintenance']
        },
        {
          name: 'Operator',
          description: 'Can load patterns, run cutting, and confirm sample output.',
          permissions: ['layout', 'cutting', 'confirm']
        },
        {
          name: 'Viewer',
          description: 'Read-only status access for progress review.',
          permissions: []
        }
      ],
      milestoneLabels: ['Pattern selection', 'Fabric identification', 'Cutting', 'Quality check', 'Ready for pickup']
    }
  },
  computed: {
    currentRole() {
      return this.roles.find(role => role.name === this.activeRole)
    },
    isRestricted() {
      return !this.currentRole.permissions.includes('cutting')
    },
    currentMilestone() {
      const index = Math.min(this.milestoneLabels.length - 1, Math.floor(this.progress / 25))
      return this.milestoneLabels[index]
    },
    milestones() {
      const activeIndex = this.milestoneLabels.indexOf(this.currentMilestone)
      return this.milestoneLabels.map((label, index) => ({
        label,
        note: this.getMilestoneNote(label),
        complete: index < activeIndex,
        active: index === activeIndex
      }))
    }
  },
  beforeUnmount() {
    this.clearTimer()
  },
  methods: {
    uploadLayout() {
      this.notification = 'Pattern sample loaded and ready for fabric identification.'
    },
    saveLayout() {
      this.notification = 'Layout saved with the current milestone and motor speed settings.'
    },
    startProcess() {
      this.clearTimer()
      this.isRunning = true
      this.notification = 'Cutting process started.'
      this.timerId = window.setInterval(() => {
        if (this.progress >= 100) {
          this.progress = 100
          this.isRunning = false
          this.notification = 'Cutting process completed. Compare system output with manual sample.'
          this.clearTimer()
          return
        }
        this.progress += 5
      }, 400)
    },
    stopProcess() {
      this.isRunning = false
      this.notification = 'Motor stopped. Current progress has been retained.'
      this.clearTimer()
    },
    confirmAction() {
      this.notification = 'Sample output confirmed for final defense review.'
    },
    runMaintenance() {
      this.notification = 'Maintenance check started for motor speed and sensor computation.'
    },
    clearTimer() {
      if (this.timerId) {
        window.clearInterval(this.timerId)
        this.timerId = null
      }
    },
    getMilestoneNote(label) {
      return {
        'Pattern selection': 'Select sizing and sample pattern.',
        'Fabric identification': 'Classify fabric and burn-risk handling.',
        Cutting: 'Track pieces cut and motor speed.',
        'Quality check': 'Compare system and manual sample output.',
        'Ready for pickup': 'Final output completed.'
      }[label]
    }
  }
}
</script>

<style scoped>
.app-controller-page {
  width: 100%;
}

.page-subtitle {
  color: var(--gray-600);
  margin-top: 0.25rem;
}

.role-switcher {
  width: min(240px, 100%);
}

.controller-shell {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1.5rem;
}

.panel {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.panel-header h2 {
  font-size: 18px;
  margin-bottom: 0.25rem;
}

.panel-header p,
.milestone-row span {
  color: var(--gray-600);
  font-size: 13px;
}

.control-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.control-button {
  min-height: 72px;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  background: var(--gray-50);
  color: var(--gray-800);
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem;
  text-align: left;
}

.control-button:hover:not(:disabled) {
  border-color: var(--primary-blue);
  background: var(--white);
}

.control-button:disabled {
  opacity: 0.48;
  cursor: not-allowed;
}

.control-button.success {
  background: var(--status-completed-bg);
  border-color: #95d5a3;
}

.control-button.danger {
  background: #f8d7da;
  border-color: #f1aeb5;
}

.button-icon {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  background: var(--primary-blue);
  color: var(--white);
  display: grid;
  place-items: center;
  font-size: 12px;
}

.milestone-list {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.milestone-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  background: var(--gray-50);
}

.milestone-row div {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.progress-card {
  margin-bottom: 1.25rem;
}

.progress-bar.large {
  height: 14px;
}

.motor-row {
  display: grid;
  grid-template-columns: 1fr 56px;
  align-items: center;
  gap: 1rem;
}

.motor-row input {
  accent-color: var(--primary-blue);
}

.notification-strip {
  margin-top: 1.5rem;
  padding: 1rem 1.25rem;
  border-left: 4px solid var(--primary-blue);
  background: var(--white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  display: flex;
  gap: 0.75rem;
}

@media (max-width: 900px) {
  .controller-shell,
  .control-grid {
    grid-template-columns: 1fr;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
