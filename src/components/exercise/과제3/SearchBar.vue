<script setup>
// 1. 부모(WeatherParent)로부터 검색어 반응형 데이터를 표시용으로만 전달받음 (props)
defineProps({
  query: {
    type: String,
    required: true,
  },
})

// 2. 부모로 검색어 변경을 알릴 커스텀 이벤트 식별자 등록 (emits)
const emit = defineEmits(['update-query'])
</script>

<template>
  <div class="search-bar">
    <label class="search-label">🔍 도시 검색</label>
    <input type="text" :value="query" @input="emit('update-query', $event.target.value)" placeholder="도시 이름을 한글로 입력하세요" />
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
