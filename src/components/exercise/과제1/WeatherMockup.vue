<script setup>
import { ref } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 36, status: '맑음' },
  { id: 'city_02', name: '도쿄', temp: 30, status: '흐림' },
  { id: 'city_03', name: '베이징', temp: 22, status: '황사' },
  { id: 'city_04', name: '평양', temp: 27, status: '비' },
])

const searchCity = ref('')
const selectedCity = ref('')

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <div class="practice-section">
    <div class="mockup-panel">
      <h2 class="panel-title"><span>☁️</span> 날씨 (Mockup)</h2>

      <div class="search-box">
        <label class="search-label">🔍 도시 검색</label>
        <input type="text" :value="searchCity" @input="searchCity = $event.target.value" placeholder="도시 이름을 한글로 입력하세요" />
        <p class="search-hint">검색 중인 도시: {{ searchCity || '전체' }}</p>
      </div>

      <h3 class="section-title">🗺️ 지역별 날씨 현황</h3>
      <div class="weather-cards">
        <div v-for="city in weatherList" :key="city.id" class="weather-card" @click="selectedCity = city.name">
          <div class="city-info">
            <p class="city-name">{{ city.name }} ({{ city.status }})</p>
            <p class="city-temp">현재 기온: {{ city.temp }}°C</p>
            <span v-if="city.temp >= 35" class="badge badge-hot">🔥 더움 (35도이상)</span>
            <span v-else-if="city.temp < 25" class="badge badge-cool">❄️ 선선함 (25도미만)</span>
            <span v-else class="badge badge-normal">🙂 보통 (26~34)</span>
          </div>
          <button class="detail-btn" @click.stop="showDetail(city.name, city.status)">상세보기</button>
        </div>
      </div>

      <div class="status-bar">
        {{ selectedCity ? `${selectedCity}이 선택되었습니다.` : '카드를 클릭하거나 검색해 보세요.' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.mockup-panel {
  background-color: #eaf1fb;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
}

.panel-title {
  margin: 0 0 16px;
  font-size: 1.15rem;
}

.search-box {
  background-color: #fff;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 18px;
}

.search-label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #2b4a7a;
}

.search-box input {
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

.section-title {
  margin: 0 0 10px;
  color: #2b4a7a;
}

.weather-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.weather-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fff;
  border: 1px solid #dbe3f0;
  border-radius: 10px;
  padding: 14px 16px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.2s ease;
}

.weather-card:hover {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.city-name {
  margin: 0 0 4px;
  font-weight: 700;
  font-size: 1.02rem;
}

.city-temp {
  margin: 0 0 8px;
  color: #6b6b6b;
  font-size: 0.88rem;
}

.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
}

.badge-hot {
  background-color: #fdecea;
  color: #d93025;
}

.badge-cool {
  background-color: #e8f0fe;
  color: #1a73e8;
}

.badge-normal {
  background-color: #eafbea;
  color: #1e8e3e;
}

.detail-btn {
  flex-shrink: 0;
  margin-left: 12px;
  padding: 6px 12px;
  border: 1px solid #ccd6e6;
  border-radius: 6px;
  background-color: #fff;
  cursor: pointer;
  font-size: 0.85rem;
}

.detail-btn:hover {
  background-color: #f5f8fd;
}

.status-bar {
  margin-top: 14px;
  padding: 10px 14px;
  background-color: #eaf7ee;
  color: #1e8e3e;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
}
</style>
