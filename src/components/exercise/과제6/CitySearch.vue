<script setup>
// 과제6-요구사항2: OpenWeatherMap Geocoding API 추가 (도시 이름 -> 위경도 변환)
// https://api.openweathermap.org/geo/1.0/direct
import { ref } from 'vue'
import axios from 'axios'

// API 키는 코드에 하드코딩하지 않고 .env(git 미추적)의 환경 변수로 관리한다.
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct'

const emit = defineEmits(['select-location'])

const query = ref('')
const results = ref([])
const isLoading = ref(false)

const handleSearch = async () => {
  if (!query.value.trim()) return
  isLoading.value = true

  try {
    const response = await axios.get(GEO_URL, {
      params: { q: query.value, limit: 5, appid: API_KEY },
    })
    results.value = response.data
    if (results.value.length === 0) {
      alert('검색 결과가 없습니다. 영문 도시명으로 다시 시도해 보세요. (예: Seoul, Tokyo)')
    }
  } catch (error) {
    console.error('Geocoding API 통신 중 에러가 발생했습니다:', error)
    alert('도시 검색에 실패했습니다. API 키를 확인하세요.')
  } finally {
    isLoading.value = false
  }
}

const selectResult = (city) => {
  emit('select-location', {
    name: city.local_names?.kr ?? city.name,
    lat: city.lat,
    lon: city.lon,
  })
  results.value = []
  query.value = ''
}
</script>

<template>
  <div class="city-search">
    <div class="search-row">
      <input v-model="query" type="text" placeholder="영문 도시명 검색 (예: Seoul, Tokyo, Paris)" @keyup.enter="handleSearch" />
      <button @click="handleSearch" :disabled="isLoading">
        {{ isLoading ? '검색 중...' : '🔍 검색' }}
      </button>
    </div>

    <ul v-if="results.length > 0" class="result-list">
      <li v-for="city in results" :key="`${city.lat}-${city.lon}`">
        <button class="result-item" @click="selectResult(city)">{{ city.local_names?.kr ?? city.name }} ({{ city.country }}{{ city.state ? `, ${city.state}` : '' }})</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-row {
  display: flex;
  gap: 8px;
}

.search-row input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
}

.search-row button {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  background: #0284c7;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

.search-row button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.result-list {
  list-style: none;
  margin: 10px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.result-item {
  width: 100%;
  text-align: left;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #f8fafc;
  cursor: pointer;
}

.result-item:hover {
  background: #eef2f7;
}
</style>
