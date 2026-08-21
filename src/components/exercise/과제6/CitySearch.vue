<script setup>
// 과제6-요구사항2: OpenWeatherMap Geocoding API 추가 (도시 이름 -> 위경도 변환)
// https://api.openweathermap.org/geo/1.0/direct
//
// UI Library 과제: 직접 만든 input/button/목록 마크업을 Element Plus 컴포넌트
// (el-input, el-button, el-card, ElMessage)로 교체했다.
import { ref } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

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
      // window.alert 대신 Element Plus의 비차단형 알림 사용
      ElMessage.warning('검색 결과가 없습니다. 영문 도시명으로 다시 시도해 보세요. (예: Seoul, Tokyo)')
    }
  } catch (error) {
    console.error('Geocoding API 통신 중 에러가 발생했습니다:', error)
    ElMessage.error('도시 검색에 실패했습니다. API 키를 확인하세요.')
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
    <el-input v-model="query" placeholder="영문 도시명 검색 (예: Seoul, Tokyo, Paris)" clearable size="large" @keyup.enter="handleSearch">
      <template #append>
        <el-button type="primary" :icon="Search" :loading="isLoading" @click="handleSearch">
          {{ isLoading ? '검색 중' : '검색' }}
        </el-button>
      </template>
    </el-input>

    <el-card v-if="results.length > 0" class="result-card" shadow="hover" body-style="padding: 8px">
      <el-button v-for="city in results" :key="`${city.lat}-${city.lon}`" class="result-item" text @click="selectResult(city)">
        {{ city.local_names?.kr ?? city.name }}
        <el-tag class="country-tag" size="small" type="info" effect="plain">{{ city.country }}{{ city.state ? ` · ${city.state}` : '' }}</el-tag>
      </el-button>
    </el-card>
  </div>
</template>

<style scoped>
.result-card {
  margin-top: 10px;
}

/* el-button은 기본이 inline이라, 검색 결과를 세로 목록처럼 쌓이게 재정의한다 */
.result-item {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  margin-left: 0;
}

.country-tag {
  margin-left: 8px;
}
</style>
