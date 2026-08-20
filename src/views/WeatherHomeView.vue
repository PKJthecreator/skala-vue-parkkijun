<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import BaseDashboardCard from '@/components/exercise/과제4/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/과제4/SearchBar.vue'
import UnitToggle from '@/components/exercise/과제4/UnitToggle.vue'
import WeatherCard from '@/components/exercise/과제4/WeatherCard.vue'
import StatusBar from '@/components/exercise/과제4/StatusBar.vue'

const router = useRouter()

// ── 1. 반응형 상태 관리 (과제3 WeatherParent와 동일한 데이터 구조를 재사용) ────
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 36, status: '맑음', humidity: 55, windSpeed: 2.5 },
  { id: 'city_02', name: '도쿄', temp: 30, status: '흐림', humidity: 60, windSpeed: 3.1 },
  { id: 'city_03', name: '베이징', temp: 22, status: '황사', humidity: 40, windSpeed: 4.2 },
  { id: 'city_04', name: '평양', temp: 27, status: '비', humidity: 75, windSpeed: 1.8 },
])

const searchQuery = ref('')
const selectedCityInfo = ref(null)
const isFahrenheit = ref(false)

// ── 2. 검색 도시 (computed 활용) ─────────────────────────────────────
const filteredWeatherList = computed(() =>
  weatherList.value.filter((city) => city.name.includes(searchQuery.value)),
)

const toFahrenheit = (celsius) => Math.round((celsius * 9) / 5 + 32)

const displayWeatherList = computed(() =>
  filteredWeatherList.value.map((city) => ({
    ...city,
    displayTemp: isFahrenheit.value ? toFahrenheit(city.temp) : city.temp,
    unit: isFahrenheit.value ? '°F' : '°C',
  })),
)

const listTitle = computed(() => {
  if (!searchQuery.value) return '지역별 날씨 현황 (전체)'
  if (displayWeatherList.value.length > 0) return `"${searchQuery.value}" 검색 결과`
  return '지역별 날씨 현황'
})

// ── 3. 반응형 변수 변화 감시 ─────────────────────────────────────────
watch(selectedCityInfo, (newCity) => {
  const statusText = newCity ? `${newCity.name}이 선택되었습니다.` : '카드를 클릭하거나 검색해 보세요.'
  console.log(`👀 [watch 감지] 상태바 문구가 업데이트되었습니다 -> "${statusText}"`)
})

watchEffect(() => {
  console.log(`🔍 [watchEffect 자동 호출] 현재 검색어 "${searchQuery.value}"로 도시 목록을 필터링합니다.`)
})

watch(isFahrenheit, (newVal) => {
  console.log(`🌡️ [단위 변경] 온도 단위가 ${newVal ? '화씨(°F)' : '섭씨(°C)'}로 변경되었습니다.`)
})

// ── 4. 자식 컴포넌트가 emit한 이벤트를 받아 반응형 상태를 갱신하는 핸들러 ───────
const updateQuery = (value) => {
  searchQuery.value = value
}

const toggleUnit = () => {
  isFahrenheit.value = !isFahrenheit.value
}

const selectCity = (city) => {
  selectedCityInfo.value = city
}

// 과제4: window.alert() 대신 Programmatic Navigation으로 상세 페이지 이동
const showDetail = (city) => {
  router.push('/weather/' + city.id)
}
</script>

<template>
  <div class="practice-section">
    <div class="weather-parent">
      <h2 class="parent-title"><span>🌤️</span> 날씨 대시보드 (Vue Router)</h2>

      <BaseDashboardCard icon="🔍" title="도시 검색">
        <SearchBar :query="searchQuery" @update-query="updateQuery" />
        <UnitToggle :is-fahrenheit="isFahrenheit" @toggle-unit="toggleUnit" />
      </BaseDashboardCard>

      <BaseDashboardCard icon="🗺️" :title="listTitle">
        <p v-if="displayWeatherList.length === 0" class="empty-message">
          😢 검색 결과와 일치하는 도시가 없습니다.
        </p>
        <div v-else class="weather-cards">
          <WeatherCard
            v-for="city in displayWeatherList"
            :key="city.id"
            :city="city"
            @select-card="selectCity"
            @click-detail="showDetail"
          />
        </div>
      </BaseDashboardCard>

      <StatusBar :selected-city="selectedCityInfo" />

      <div class="monitor">
        <h3>👁️‍🗨️ watch / watchEffect 모니터링 시스템</h3>
        <p>selectedCityInfo와 searchQuery가 바뀔 때마다 콘솔(F12)에 로그가 찍힙니다.</p>
        <small style="color: gray">
          watch → 상태바 문구 변경 감지 / watchEffect → 검색어 입력 자동 추적 / 자체 watch →
          온도 단위 변경 감지 / [상세보기] 클릭 시 router.push('/weather/' + id)로 이동
        </small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-parent {
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

.empty-message {
  padding: 12px 14px;
  background-color: #fff;
  border-radius: 8px;
  color: #8a8a8a;
  text-align: center;
}

.weather-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.monitor {
  margin-top: 14px;
  border: 1px solid #0984e3;
  background: #e3fafc;
  border-radius: 8px;
  padding: 12px 14px;
}

.monitor h3 {
  margin: 0 0 6px;
  font-size: 0.95rem;
  color: #1a1a1a;
}

.monitor p {
  margin: 0 0 4px;
  font-size: 0.85rem;
  color: #1a1a1a;
}
</style>
