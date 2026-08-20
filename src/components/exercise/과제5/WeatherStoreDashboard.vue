<script setup>
// 과제5: Hands on - Weather Store (Pinia)
// 과제4의 Vue Router 버전과는 완전히 분리된 별도 실습으로,
// 라우팅 대신 로컬 상태로 상세보기를 열고 닫으며 Pinia 스토어 적용에 집중한다.
import { ref, computed, watch, watchEffect } from 'vue'
import { useConfigStore } from '@/stores/configStore.js'
import { useFavoriteStore } from '@/stores/favoriteStore.js'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import UnitToggler from './UnitToggler.vue'
import WeatherCard from './WeatherCard.vue'
import DetailPanel from './DetailPanel.vue'
import StatusBar from './StatusBar.vue'

const configStore = useConfigStore()
const favoriteStore = useFavoriteStore()

// ── 1. 반응형 상태 관리 (과제3/4와 동일한 데이터 구조를 재사용) ────
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 36, status: '맑음', humidity: 55, windSpeed: 2.5 },
  { id: 'city_02', name: '도쿄', temp: 30, status: '흐림', humidity: 60, windSpeed: 3.1 },
  { id: 'city_03', name: '베이징', temp: 22, status: '황사', humidity: 40, windSpeed: 4.2 },
  { id: 'city_04', name: '평양', temp: 27, status: '비', humidity: 75, windSpeed: 1.8 },
])

const searchQuery = ref('')
const selectedCityInfo = ref(null)
const detailCity = ref(null)

// ── 2. 검색 도시 (computed 활용) ─────────────────────────────────────
const filteredWeatherList = computed(() => weatherList.value.filter((city) => city.name.includes(searchQuery.value)))

const listTitle = computed(() => {
  const favoriteNote = favoriteStore.favoriteCount > 0 ? ` (⭐ ${favoriteStore.favoriteCount})` : ''
  if (!searchQuery.value) return `지역별 날씨 현황 (전체)${favoriteNote}`
  if (filteredWeatherList.value.length > 0) return `"${searchQuery.value}" 검색 결과${favoriteNote}`
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

// Pinia configStore의 unit 상태 변화를 감시
watch(
  () => configStore.unit,
  () => {
    console.log(`🌡️ [Pinia store 감지] 온도 단위가 ${configStore.unitLabel}로 변경되었습니다. (누적 ${configStore.changeCount}회)`)
  },
)

// ── 4. 자식 컴포넌트가 emit한 이벤트를 받아 반응형 상태를 갱신하는 핸들러 ───────
const updateQuery = (value) => {
  searchQuery.value = value
}

const selectCity = (city) => {
  selectedCityInfo.value = city
}

const showDetail = (city) => {
  detailCity.value = city
}

const closeDetail = () => {
  detailCity.value = null
}
</script>

<template>
  <div class="practice-section">
    <div class="weather-store">
      <h2 class="parent-title"><span>☁️</span> 종합실습 5: 스토어적용</h2>

      <nav class="mini-nav">
        <span class="nav-link active">🌤️ 날씨 대시보드</span>
        <span class="nav-link">ℹ️ 서비스 소개</span>
        <UnitToggler />
      </nav>

      <BaseDashboardCard icon="🔍" title="도시 검색 (한글 즉시 동기화)">
        <SearchBar :query="searchQuery" @update-query="updateQuery" />
      </BaseDashboardCard>

      <DetailPanel :city="detailCity" @close="closeDetail" />

      <BaseDashboardCard icon="🗺️" :title="listTitle">
        <p v-if="filteredWeatherList.length === 0" class="empty-message">😢 검색 결과와 일치하는 도시가 없습니다.</p>
        <div v-else class="weather-cards">
          <WeatherCard v-for="city in filteredWeatherList" :key="city.id" :city="city" @select-card="selectCity" @click-detail="showDetail" />
        </div>
      </BaseDashboardCard>

      <StatusBar :selected-city="selectedCityInfo" />

      <div class="monitor">
        <h3>👁️‍🗨️ watch / watchEffect 모니터링 시스템</h3>
        <p>selectedCityInfo와 searchQuery가 바뀔 때마다 콘솔(F12)에 로그가 찍힙니다.</p>
        <small style="color: gray">
          watch → 상태바 문구 변경 감지 / watchEffect → 검색어 입력 자동 추적 / 자체 watch → Pinia configStore.unit 변경 감지 / [상세보기] 클릭 시 로컬 상태로 DetailPanel을 엽니다.
        </small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-store {
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

.mini-nav {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.nav-link {
  padding: 8px 16px;
  border: 1px solid #ccd6e6;
  border-radius: 6px;
  background-color: #fff;
  color: #2b4a7a;
  font-weight: 600;
  font-size: 0.9rem;
}

.nav-link.active {
  background-color: #0984e3;
  border-color: #0984e3;
  color: #fff;
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
