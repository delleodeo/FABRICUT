<template>
  <div class="landing-page">
    <div class="content-wrapper">
      <div class="logo">
        <img src="@/assets/logo.jpg" alt="JCM Tailoring" />
      </div>
      <h1 class="shop-title">JCM Tailoring</h1>
      <p class="tagline">Your Trusted Partner for Custom-Fitted Attire</p>
      
      <div class="actions">
        <router-link to="/dashboard" class="btn btn-start">Get Started</router-link>
        <router-link to="/dashboard/about" class="btn btn-about">About Us</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500&display=swap');

.landing-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  text-align: center;
  font-family: 'Inter', sans-serif;
}

.content-wrapper {
  max-width: 600px;
  padding: 2rem;
}

.logo img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.shop-title {
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 700;
  color: #1d293f;
  margin-bottom: 0.5rem;
}

.tagline {
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 2.5rem;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  padding: 0.8rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-start {
  background-color: #007aff;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 122, 255, 0.2);
}

.btn-start:hover {
  background-color: #0056b3;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 122, 255, 0.3);
}

.btn-about {
  background-color: transparent;
  color: #007aff;
  border: 1px solid #007aff;
}

.btn-about:hover {
  background-color: #007aff;
  color: white;
  transform: translateY(-3px);
}
</style>
