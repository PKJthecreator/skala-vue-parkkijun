<script setup>
defineProps({
  query: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update-query'])
</script>

<template>
  <div class="search-bar">
    <label class="search-label">🔍 도시 검색</label>
    <input type="text" :value="query" @input="emit('update-query', $event.target.value)" placeholder="검색할 도시 이름 입력" />
    <p class="search-hint">검색 중인 도시: {{ query || '전체' }}</p>
  </div>
</template>

<style scoped>
.search-bar input {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 10px;
  border: 1px solid #ccd6e6;
  border-radius: 6px;
  font-size: 0.95rem;
}

.search-hint {
  margin: 8px 0 0;
  font-size: 0.85rem;
  color: #8a8a8a;
}
</style>
