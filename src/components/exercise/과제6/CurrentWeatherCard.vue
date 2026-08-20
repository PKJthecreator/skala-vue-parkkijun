<script setup>
// 과제6-요구사항1: OpenWeatherMap Current Weather API로 실제 날씨 데이터 연동
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
import { ref, watch } from 'vue'
import axios from 'axios'
import { useConfigStore } from '@/stores/configStore.js'

// API 키는 코드에 하드코딩하지 않고 .env(git 미추적)의 환경 변수로 관리한다.
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather'

const props = defineProps({
  location: {
    type: Object, // { name, lat, lon }
    default: null,
  },
})

const emit = defineEmits(['weather-loaded'])

const configStore = useConfigStore()
const weatherData = ref(null)
const isLoading = ref(false)

const fetchWeather = async () => {
  if (!props.location) return
  isLoading.value = true

  try {
    // 과제5에서 만든 configStore.unit을 그대로 재사용:
    // 화씨 모드일 땐 OpenWeatherMap이 직접 imperial 단위로 변환해서 내려준다.
    const response = await axios.get(WEATHER_URL, {
      params: {
        lat: props.location.lat,
        lon: props.location.lon,
        appid: API_KEY,
        units: configStore.unit === 'fahrenheit' ? 'imperial' : 'metric',
        lang: 'kr',
      },
    })
    weatherData.value = response.data
    emit('weather-loaded', response.data)
  } catch (error) {
    console.error('Current Weather API 통신 중 에러가 발생했습니다:', error)
    alert('날씨 데이터를 가져오지 못했습니다. API 키 활성화 여부를 확인하세요.')
  } finally {
    isLoading.value = false
  }
}

// 검색으로 도시가 바뀌거나, configStore의 단위가 바뀔 때마다 다시 조회한다.
watch(() => props.location, fetchWeather, { immediate: true })
watch(() => configStore.unit, fetchWeather)
</script>

<template>
  <div class="current-weather">
    <p v-if="isLoading">⏳ 날씨 데이터를 불러오는 중...</p>
    <div v-else-if="weatherData" class="result-card">
      <p class="location-name">
        📍 <strong>{{ location.name }}</strong>
        <img v-if="weatherData.weather[0]" class="weather-icon" :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`" :alt="weatherData.weather[0].description" />
      </p>
      <p>
        🌡️ 현재 기온: <strong>{{ Math.round(weatherData.main.temp) }}{{ configStore.unitSymbol }}</strong> (체감 {{ Math.round(weatherData.main.feels_like) }}{{ configStore.unitSymbol }})
      </p>
      <p>
        ☁️ 날씨 상태: <strong>{{ weatherData.weather[0].description }}</strong>
      </p>
      <p>
        💧 습도: <strong>{{ weatherData.main.humidity }}%</strong>
      </p>
      <p>
        🍃 풍속: <strong>{{ weatherData.wind.speed }}m/s</strong>
      </p>
    </div>
    <p v-else>도시를 검색해서 선택하면 실시간 날씨를 보여줍니다.</p>
  </div>
</template>

<style scoped>
.result-card {
  background: #f8fafc;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  line-height: 1.8;
}

.result-card strong {
  color: #0284c7;
}

.location-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.weather-icon {
  width: 36px;
  height: 36px;
}
</style>
