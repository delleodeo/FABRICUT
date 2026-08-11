<template>
  <div class="about-page">
    <!-- Hero Section -->
    <div class="hero-card">
      <h1 style="font-size: 32px; font-weight: 700; margin-bottom: 0.5rem; color: var(--white);">
        J.C.M. Tailoring
      </h1>
      <p style="font-size: 18px; margin-bottom: 1rem; color: var(--white); opacity: 0.95;">
        Stitching Dreams Into Reality
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: var(--white); opacity: 0.9; max-width: 800px; margin: 0 auto;">
        Expert craftsmanship meets modern style. We bring your tailoring vision to life with precision and care.
      </p>
    </div>

    <div class="grid grid-2">
      <!-- Left Column -->
      <div class="left-column">
        <!-- About Us -->
        <div class="card mb-3">
          <div class="card-header">About Us</div>
          <div class="card-body">
            <p style="line-height: 1.7; margin-bottom: 1rem;">
              <strong>J.C.M. Tailoring</strong> provides expert stitching and personalized garment services. We focus on quality, attention to detail, and customer satisfaction to deliver perfectly fitted clothing.
            </p>
            <p style="line-height: 1.7; margin-bottom: 1rem;">
              Our skilled team combines traditional craftsmanship with modern style to bring your tailoring dreams to life. From bespoke suits to dress alterations, we handle every project with meticulous attention to detail.
            </p>
          </div>
        </div>

        <!-- Our Services -->
        <div class="card mb-3">
          <div class="card-header">Our Services</div>
          <div class="card-body">
            <ul class="services-list">
              <li>Bespoke Suits & Formal Wear</li>
              <li>Dress Alterations & Repairs</li>
              <li>Custom Measurements</li>
              <li>Wedding Attire Specialists</li>
            </ul>
          </div>
        </div>

        <!-- Business Hours -->
        <div class="card">
          <div class="card-header">Business Hours</div>
          <div class="card-body">
            <div class="hours-item" v-for="hours in businessHours" :key="hours.day">
              <div class="flex-between">
                <span style="font-weight: 600;">{{ hours.day }}</span>
                <span :style="{ color: hours.closed ? 'var(--gray-500)' : 'var(--gray-800)' }">
                  {{ hours.time }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <!-- Contact Information -->
        <div class="card mb-3">
          <div class="card-header">Contact Information</div>
          <div class="card-body">
            <div class="contact-item">
              <div class="contact-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div style="font-size: 12px; color: var(--gray-600);">Phone</div>
                <div style="font-weight: 600;">+123456789</div>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div style="font-size: 12px; color: var(--gray-600);">Email</div>
                <div style="font-weight: 600;">fortunejcm@gmail.com</div>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div style="font-size: 12px; color: var(--gray-600);">Address</div>
                <div style="font-weight: 600;">Lumang Patengko, Victoria, Oriental Mindoro</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Follow Us on Social Media -->
        <div class="card mb-3">
          <div class="card-header">Follow Us on Social Media</div>
          <div class="card-body text-center">
            <div class="social-icons">
              <a href="#" class="social-icon facebook">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="social-icon instagram">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Special Promotions -->
        <div class="card promotion-card">
          <div class="card-header">Special Promotions</div>
          <div class="card-body">
            <p style="font-style: italic; margin-bottom: 1rem; line-height: 1.6;">
              We love to share promotions and updates on our social networks!
            </p>
            <p style="margin-bottom: 1rem; line-height: 1.6;">
              Follow us on Facebook and Instagram to stay updated with our latest offers, new styles, and special discounts.
            </p>
            <button class="btn btn-primary" style="width: 100%;">Follow for exclusive deals!</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
  data() {
    return {
      businessHours: [
        { day: 'Monday - Tuesday', time: '6:30 AM - 6:30 PM', closed: false },
        { day: 'Wednesday', time: 'Closed', closed: true },
        { day: 'Thursday - Saturday', time: '6:00 AM - 5:00 PM', closed: false },
        { day: 'Sunday', time: 'Closed', closed: true }
      ]
    }
  }
}
</script>

<style scoped>
.about-page {
  width: 100%;
}

.hero-card {
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-blue-dark) 100%);
  padding: 3rem 2rem;
  border-radius: var(--radius-lg);
  text-align: center;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-lg);
}

.services-list {
  list-style: none;
  padding: 0;
}

.services-list li {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--gray-200);
  position: relative;
  padding-left: 1.5rem;
}

.services-list li:last-child {
  border-bottom: none;
}

.services-list li::before {
  content: '✦';
  position: absolute;
  left: 0;
  color: var(--accent-gold);
}

.hours-item {
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--gray-200);
}

.hours-item:last-child {
  border-bottom: none;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--gray-50);
  border-radius: var(--radius-md);
  margin-bottom: 0.75rem;
}

.contact-icon {
  width: 40px;
  height: 40px;
  background-color: var(--primary-blue);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  transition: transform 0.2s;
}

.social-icon:hover {
  transform: scale(1.1);
}

.social-icon.facebook {
  background-color: #1877f2;
}

.social-icon.instagram {
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
}

.promotion-card {
  background: linear-gradient(135deg, #fff3cd 0%, #ffe69c 100%);
}
</style>
