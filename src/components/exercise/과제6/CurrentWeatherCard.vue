<script setup>
// 과제6-요구사항1: OpenWeatherMap Current Weather API로 실제 날씨 데이터 연동
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//
// UI Library 과제: 직접 짜던 카드/로딩 문구 마크업을 Element Plus 컴포넌트
// (el-card, el-skeleton, el-descriptions, el-empty, ElMessage)로 교체했다.
import { ref, watch } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
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
    ElMessage.error('날씨 데이터를 가져오지 못했습니다. API 키 활성화 여부를 확인하세요.')
  } finally {
    isLoading.value = false
  }
}

// 검색으로 도시가 바뀌거나, configStore의 단위가 바뀔 때마다 다시 조회한다.
watch(() => props.location, fetchWeather, { immediate: true })
watch(() => configStore.unit, fetchWeather)
</script>

<template>
  <el-card class="current-weather" shadow="never">
    <template #header>
      <div class="card-header">
        <span class="location-name">📍 {{ location?.name ?? '도시 미선택' }}</span>
        <img v-if="weatherData?.weather?.[0]" class="weather-icon" :src="`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`" :alt="weatherData.weather[0].description" />
      </div>
    </template>

    <!-- 로딩 문구 대신 Element Plus 스켈레톤으로 실제 카드 형태를 미리 보여준다 -->
    <el-skeleton v-if="isLoading" :rows="4" animated />

    <el-descriptions v-else-if="weatherData" :column="1" border size="large">
      <el-descriptions-item label="🌡️ 현재 기온">
        <el-tag type="danger" effect="dark" size="large">{{ Math.round(weatherData.main.temp) }}{{ configStore.unitSymbol }}</el-tag>
        <span class="feels-like">체감 {{ Math.round(weatherData.main.feels_like) }}{{ configStore.unitSymbol }}</span>
      </el-descriptions-item>
      <el-descriptions-item label="☁️ 날씨 상태">{{ weatherData.weather[0].description }}</el-descriptions-item>
      <el-descriptions-item label="💧 습도">{{ weatherData.main.humidity }}%</el-descriptions-item>
      <el-descriptions-item label="🍃 풍속">{{ weatherData.wind.speed }}m/s</el-descriptions-item>
    </el-descriptions>

    <el-empty v-else description="도시를 검색해서 선택하면 실시간 날씨를 보여줍니다." :image-size="80" />
  </el-card>
</template>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.location-name {
  font-weight: 700;
  font-size: 1.05rem;
}

.weather-icon {
  width: 44px;
  height: 44px;
}

.feels-like {
  margin-left: 10px;
  color: #64748b;
  font-size: 0.9rem;
}
</style>
