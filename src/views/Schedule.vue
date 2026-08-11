<template>
  <div class="schedule-page">
    <div class="grid grid-2">
      <!-- Left Column -->
      <div class="left-column">
        <!-- Business Hours -->
        <div class="card mb-3">
          <div class="card-header">Business Hours</div>
          <div class="card-body">
            <div class="business-hours-list">
              <div class="business-hours-item" v-for="hours in businessHours" :key="hours.day">
                <div class="flex-between">
                  <div>
                    <div style="font-weight: 600;">{{ hours.day }}</div>
                    <div style="font-size: 13px; color: var(--gray-600);">{{ hours.time }}</div>
                  </div>
                  <svg v-if="!hours.closed" width="20" height="20" fill="currentColor" viewBox="0 0 20 20" style="color: var(--accent-gold);">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div class="mt-3">
              <div style="font-weight: 600; margin-bottom: 0.5rem;">Break Times</div>
              <ul style="list-style: none; padding: 0;">
                <li style="padding: 0.25rem 0; font-size: 14px;" v-for="breakTime in breakTimes" :key="breakTime">
                  ✦ {{ breakTime }}
                </li>
              </ul>
            </div>

            <div class="text-center mt-3">
              <button class="btn btn-primary" @click="alert('Schedule editing feature - Coming soon!')">Edit Schedule</button>
            </div>
          </div>
        </div>

        <!-- Special Days / Holidays -->
        <div class="card">
          <div class="card-header">Special Days / Holidays</div>
          <div class="card-body">
            <div class="holiday-card">
              <div class="holiday-icon">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="holiday-title">All Saints' Day</div>
              <div class="holiday-date">November 1, 2025</div>
              <div class="holiday-status">Shop Closed</div>
            </div>

            <div class="flex gap-2 mt-3">
              <button class="btn btn-primary" @click="alert('Add Holiday feature - Coming soon!')">Add Holiday</button>
              <button class="btn btn-secondary" @click="alert('Manage Holidays feature - Coming soon!')">Manage</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <!-- Today's Appointments -->
        <div class="card mb-3">
          <div class="card-header flex-between">
            <span>Today's Appointments</span>
            <button class="btn btn-primary" style="font-size: 12px; padding: 0.25rem 0.75rem;" @click="openAddAppointmentModal">+ Add</button>
          </div>
          <div class="card-body">
            <div v-if="todayAppointments.length === 0" style="text-align: center; color: var(--gray-500); padding: 2rem 0;">
              No appointments scheduled for today
            </div>
            <div v-else>
              <div class="appointment-card" v-for="appointment in todayAppointments" :key="appointment.id">
                <div>
                  <div class="appointment-time">{{ appointment.time }}</div>
                  <div class="appointment-client">{{ appointment.client }}</div>
                  <div class="appointment-service">{{ appointment.service }}</div>
                </div>
                <div class="flex gap-1" style="align-items: center;">
                  <span class="badge badge-completed">{{ appointment.status }}</span>
                  <button class="btn-icon" @click="handleDeleteAppointment(appointment.id)" style="color: #dc3545;">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="text-center mt-3">
              <button class="link" style="border: none; background: none; cursor: pointer;">View All Appointments</button>
            </div>
          </div>
        </div>

        <!-- Quick Calendar -->
        <div class="card">
          <div class="card-header">Quick Calendar</div>
          <div class="card-body">
            <div class="calendar-date">
              <div class="calendar-month">{{ currentMonth }}</div>
              <div class="calendar-day">{{ currentDay }}</div>
              <div class="calendar-weekday">{{ currentWeekday }}</div>
            </div>

            <div class="mt-3">
              <div style="font-weight: 600; margin-bottom: 1rem;">Upcoming Events</div>
              <div class="upcoming-event" v-for="event in upcomingEvents" :key="event.id">
                <div style="font-weight: 500;">{{ event.client }} - {{ event.service }}</div>
                <div style="font-size: 12px; color: var(--gray-600);">{{ event.date }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Appointment Modal -->
    <Modal :isOpen="showAppointmentModal" title="Add New Appointment" @close="closeAppointmentModal">
      <form @submit.prevent="handleSubmitAppointment">
        <div class="form-group">
          <label class="form-label">Client*</label>
          <select class="form-select" v-model="appointmentForm.client" required>
            <option value="">Select client</option>
            <option v-for="client in store.clients" :key="client.id" :value="client.name">
              {{ client.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Service*</label>
          <input
            type="text"
            class="form-input"
            v-model="appointmentForm.service"
            placeholder="e.g., Dress Fitting, Suit Measurement"
            required
          >
        </div>

        <div class="form-group">
          <label class="form-label">Time*</label>
          <input
            type="text"
            class="form-input"
            v-model="appointmentForm.time"
            placeholder="e.g., 9:00 AM"
            required
          >
        </div>

        <div class="form-group">
          <label class="form-label">Date*</label>
          <input
            type="text"
            class="form-input"
            v-model="appointmentForm.date"
            placeholder="e.g., Friday, 9:00 AM"
            required
          >
        </div>

        <div class="flex gap-2" style="justify-content: flex-end; margin-top: 1.5rem;">
          <button type="button" class="btn btn-secondary" @click="closeAppointmentModal">Cancel</button>
          <button type="submit" class="btn btn-primary">Add Appointment</button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
import { useStore } from '@/composables/useStore'
import Modal from '@/components/Modal.vue'

export default {
  name: 'Schedule',
  components: {
    Modal
  },
  setup() {
    const { store, addAppointment, deleteAppointment } = useStore()
    return { store, addAppointment, deleteAppointment }
  },
  data() {
    return {
      businessHours: [
        { day: 'Monday - Tuesday', time: '6:30 AM - 6:30 PM', closed: false },
        { day: 'Wednesday', time: 'Closed', closed: true },
        { day: 'Thursday - Saturday', time: '6:00 AM - 5:00 PM', closed: false },
        { day: 'Sunday', time: 'Closed', closed: true }
      ],
      breakTimes: [
        '9:30 AM - 10:00 AM',
        '12:00 NN - 1:00 PM',
        '3:00 PM - 3:30 PM'
      ],
      currentMonth: 'November',
      currentDay: '21',
      currentWeekday: 'Friday, 2025',
      showAppointmentModal: false,
      appointmentForm: {
        client: '',
        service: '',
        time: '',
        date: ''
      }
    }
  },
  computed: {
    todayAppointments() {
      return this.store.appointments
    },
    upcomingEvents() {
      return this.store.appointments.map(app => ({
        id: app.id,
        client: app.client,
        service: app.service,
        date: app.date
      }))
    }
  },
  methods: {
    alert(message) {
      window.alert(message)
    },
    openAddAppointmentModal() {
      this.appointmentForm = {
        client: '',
        service: '',
        time: '',
        date: ''
      }
      this.showAppointmentModal = true
    },
    closeAppointmentModal() {
      this.showAppointmentModal = false
    },
    async handleSubmitAppointment() {
      try {
        await this.addAppointment(this.appointmentForm)
        alert('Appointment added successfully!')
        this.closeAppointmentModal()
      } catch (err) {
        alert('Error: ' + err.message)
      }
    },
    async handleDeleteAppointment(id) {
      if (confirm('Are you sure you want to delete this appointment?')) {
        try {
          await this.deleteAppointment(id)
          alert('Appointment deleted successfully!')
        } catch (err) {
          alert('Error: ' + err.message)
        }
      }
    }
  }
}
</script>

<style scoped>
.schedule-page {
  width: 100%;
}

.business-hours-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.business-hours-item {
  padding: 1rem;
  background-color: var(--gray-50);
  border-radius: var(--radius-md);
}

.upcoming-event {
  padding: 0.75rem;
  background-color: var(--gray-50);
  border-radius: var(--radius-md);
  margin-bottom: 0.5rem;
}
</style>
