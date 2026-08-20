<script setup>
// 과제6: OpenWeatherMap 실제 API 연동 + API 2종 확장(OpenWeatherMap 1종 + 외부 API 1종)
import { ref } from 'vue'
import UnitToggler from '@/components/exercise/과제5/UnitToggler.vue'
import CitySearch from './CitySearch.vue'
import CurrentWeatherCard from './CurrentWeatherCard.vue'
import CountryInfoCard from './CountryInfoCard.vue'

// 요구사항1: 기본값으로 서울의 실제 날씨를 곧바로 보여준다 (AxiosWeather.vue의 좌표 재사용)
const selectedLocation = ref({ name: '서울', lat: 35.158582, lon: 126.804975 })
const countryCode = ref(null)

const selectLocation = (location) => {
  selectedLocation.value = location
}

const onWeatherLoaded = (data) => {
  countryCode.value = data.sys.country
}
</script>

<template>
  <div class="practice-section">
    <div class="weather-app">
      <h2 class="parent-title"><span>🌍</span> 과제6: 실전 날씨 애플리케이션 (실제 API 연동)</h2>

      <div class="toolbar">
        <CitySearch @select-location="selectLocation" />
        <UnitToggler />
      </div>

      <CurrentWeatherCard :location="selectedLocation" @weather-loaded="onWeatherLoaded" />
      <CountryInfoCard :country-code="countryCode" />

      <div class="api-note">
        <h3>🔌 이번 과제에서 연동한 API</h3>
        <ul>
          <li>OpenWeatherMap Current Weather API — 위경도 기반 실시간 날씨 조회 (요구사항1)</li>
          <li>OpenWeatherMap Geocoding API — 도시 이름 검색 → 위경도 변환 (요구사항2)</li>
          <li>REST Countries API — 날씨 응답의 국가 코드로 국가 정보 조회 (요구사항3, OpenWeatherMap 외부 API)</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-app {
  background-color: #eaf1fb;
  color: #1a1a1a;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
}

.parent-title {
  margin: 0 0 16px;
  font-size: 1.15rem;
  color: #1a1a1a;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.toolbar > :first-child {
  flex: 1;
  min-width: 260px;
}

.api-note {
  margin-top: 14px;
  border: 1px solid #0984e3;
  background: #e3fafc;
  border-radius: 8px;
  padding: 12px 14px;
}

.api-note h3 {
  margin: 0 0 6px;
  font-size: 0.95rem;
  color: #1a1a1a;
}

.api-note ul {
  margin: 0;
  padding-left: 20px;
  font-size: 0.85rem;
  color: #1a1a1a;
}
</style>
