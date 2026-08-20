<script setup>
defineProps({
  icon: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="dashboard-card">
    <h3 class="card-title"><span v-if="icon">{{ icon }}</span> {{ title }}</h3>
    <slot></slot>
  </div>
</template>

<style scoped>
.dashboard-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 18px;
}

.card-title {
  margin: 0 0 10px;
  font-size: 1rem;
  color: #2b4a7a;
}
</style>
