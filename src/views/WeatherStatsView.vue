<script setup>
import { ref, computed } from 'vue'

// 요구사항 6: 본인 추가 view — 홈 화면과 동일한 형태의 Mock 데이터를 기반으로 한 간단 통계 페이지
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 36, status: '맑음' },
  { id: 'city_02', name: '도쿄', temp: 30, status: '흐림' },
  { id: 'city_03', name: '베이징', temp: 22, status: '황사' },
  { id: 'city_04', name: '평양', temp: 27, status: '비' },
])

const averageTemp = computed(() => {
  const sum = weatherList.value.reduce((acc, city) => acc + city.temp, 0)
  return Math.round((sum / weatherList.value.length) * 10) / 10
})

const hottestCity = computed(() =>
  weatherList.value.reduce((max, city) => (city.temp > max.temp ? city : max)),
)

const coolestCity = computed(() =>
  weatherList.value.reduce((min, city) => (city.temp < min.temp ? city : min)),
)
</script>

<template>
  <div class="practice-section">
    <h2>📊 지역별 날씨 통계</h2>

    <div class="stats-grid">
      <div class="stat-card">
        <p class="stat-label">평균 기온</p>
        <p class="stat-value">{{ averageTemp }}°C</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">🔥 가장 더운 도시</p>
        <p class="stat-value">{{ hottestCity.name }} ({{ hottestCity.temp }}°C)</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">❄️ 가장 선선한 도시</p>
        <p class="stat-value">{{ coolestCity.name }} ({{ coolestCity.temp }}°C)</p>
      </div>
    </div>

    <RouterLink to="/" class="home-btn">대시보드로 돌아가기</RouterLink>
  </div>
</template>

<style scoped>
.stats-grid {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin: 16px 0;
}

.stat-card {
  flex: 1;
  min-width: 160px;
  background-color: #fff;
  border: 1px solid #dbe3f0;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
}

.stat-label {
  margin: 0 0 6px;
  color: #6b6b6b;
  font-size: 0.85rem;
}

.stat-value {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #2b4a7a;
}

.home-btn {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background-color: #0984e3;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}

.home-btn:hover {
  background-color: #0768b8;
}
</style>
