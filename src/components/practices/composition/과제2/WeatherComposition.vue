<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

// ── 1. 반응형 상태 관리 (요구사항 1) ─────────────────────────────
// WeatherMockup.vue(과제1)와 동일한 데이터 구조를 그대로 재사용
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 36, status: '맑음' },
  { id: 'city_02', name: '도쿄', temp: 30, status: '흐림' },
  { id: 'city_03', name: '베이징', temp: 22, status: '황사' },
  { id: 'city_04', name: '평양', temp: 27, status: '비' },
])

const searchQuery = ref('')

// 과제1의 selectedCity(문자열)와 달리, 카드 전체 객체를 담아
// 상태바 문구를 selectedCityInfo 하나만으로 조합할 수 있도록 설계
const selectedCityInfo = ref(null)

// ── 2. 검색 도시 (computed 활용) (요구사항 2) ─────────────────────
// 도시 이름에 searchQuery가 포함된 항목만 필터링
// searchQuery가 빈 문자열이면 모든 도시가 includes('') === true 이므로
// 자연스럽게 원본 weatherList 전체가 반환된다.
const filteredWeatherList = computed(() =>
  weatherList.value.filter((city) => city.name.includes(searchQuery.value)),
)

// ── 3. 반응형 변수 변화 감시 (요구사항 3) ─────────────────────────
// 3-1) selectedCityInfo 감시 (watch): 상태바 문구가 바뀔 때마다 로그
//      (상태바에 실제로 표시되는 문구 그대로를 콘솔에 남겨서, 무엇이 바뀌었는지
//       바로 확인할 수 있도록 함)
watch(selectedCityInfo, (newCity) => {
  const statusText = newCity ? `${newCity.name}이 선택되었습니다.` : '카드를 클릭하거나 검색해 보세요.'
  console.log(`👀 [watch 감지] 상태바 문구가 업데이트되었습니다 -> "${statusText}"`)
})

// 3-2) searchQuery 감시 (watchEffect): 타이핑할 때마다 자동 추적
watchEffect(() => {
  console.log(`🔍 [watchEffect 자동 호출] 현재 검색어 "${searchQuery.value}"로 도시 목록을 필터링합니다.`)
})

// ── 5. 본인만의 반응형 상태 / Computed / Watcher 추가 ─────────────
// 5-1) 반응형 상태: 온도 단위 토글 (섭씨 ↔ 화씨)
const isFahrenheit = ref(false)
const toFahrenheit = (celsius) => Math.round((celsius * 9) / 5 + 32)

// 5-2) computed: filteredWeatherList(요구사항 2의 결과)를 그대로 이어받아
//      선택된 단위에 맞는 표시용 온도를 붙여 재가공 (computed 체이닝)
const displayWeatherList = computed(() =>
  filteredWeatherList.value.map((city) => ({
    ...city,
    displayTemp: isFahrenheit.value ? toFahrenheit(city.temp) : city.temp,
    unit: isFahrenheit.value ? '°F' : '°C',
  })),
)

// 5-3) watch: 온도 단위가 바뀔 때마다 로그
//      (배지 판정 기준은 원본 섭씨(city.temp)로 고정하여, 단위를 바꿔도
//       '더움/보통/선선함' 분류가 흔들리지 않도록 함)
watch(isFahrenheit, (newVal) => {
  console.log(`🌡️ [단위 변경] 온도 단위가 ${newVal ? '화씨(°F)' : '섭씨(°C)'}로 변경되었습니다.`)
})

const selectCity = (city) => {
  selectedCityInfo.value = city
}

const showDetail = (city) => {
  window.alert(`${city.name}의 현재 날씨는 [${city.status}] 상태입니다.`)
}
</script>

<template>
  <div class="practice-section">
    <div class="mockup-panel">
      <h2 class="panel-title"><span>🌤️</span> 날씨 (Composition API)</h2>

      <div class="search-box">
        <label class="search-label">🔍 도시 검색</label>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="도시 이름을 한글로 입력하세요"
        />
        <p class="search-hint">검색 중인 도시: {{ searchQuery || '전체' }}</p>

        <button class="unit-toggle-btn" @click="isFahrenheit = !isFahrenheit">
          🌡️ {{ isFahrenheit ? '화씨(°F)' : '섭씨(°C)' }} 로 보는 중 (클릭 시 전환)
        </button>
      </div>

      <!-- 요구사항 4: 검색 결과 표시 -->
      <template v-if="!searchQuery">
        <h3 class="section-title">🗺️ 지역별 날씨 현황 (전체)</h3>
      </template>
      <template v-else-if="displayWeatherList.length > 0">
        <h3 class="section-title">🗺️ "{{ searchQuery }}" 검색 결과</h3>
      </template>
      <template v-else>
        <h3 class="section-title">🗺️ 지역별 날씨 현황</h3>
        <p class="empty-message">😢 검색 결과와 일치하는 도시가 없습니다.</p>
      </template>

      <div class="weather-cards" v-if="displayWeatherList.length > 0">
        <div
          v-for="city in displayWeatherList"
          :key="city.id"
          class="weather-card"
          @click="selectCity(city)"
        >
          <div class="city-info">
            <p class="city-name">{{ city.name }} ({{ city.status }})</p>
            <p class="city-temp">현재 기온: {{ city.displayTemp }}{{ city.unit }}</p>
            <span v-if="city.temp >= 35" class="badge badge-hot">🔥 더움 (35도이상)</span>
            <span v-else-if="city.temp < 25" class="badge badge-cool">❄️ 선선함 (25도미만)</span>
            <span v-else class="badge badge-normal">🙂 보통 (25~34도)</span>
          </div>
          <button class="detail-btn" @click.stop="showDetail(city)">상세보기</button>
        </div>
      </div>

      <div class="status-bar">
        {{
          selectedCityInfo
            ? `${selectedCityInfo.name}이 선택되었습니다. (${selectedCityInfo.status} / ${selectedCityInfo.temp}°C)`
            : '카드를 클릭하거나 검색해 보세요.'
        }}
      </div>

      <div class="monitor">
        <h3>👁️‍🗨️ watch / watchEffect 모니터링 시스템</h3>
        <p>selectedCityInfo와 searchQuery가 바뀔 때마다 콘솔(F12)에 로그가 찍힙니다.</p>
        <small style="color: gray">
          watch → 상태바 문구 변경 감지 / watchEffect → 검색어 입력 자동 추적 / 자체 watch →
          온도 단위 변경 감지
        </small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mockup-panel {
  background-color: #eaf1fb;
  color: #1a1a1a;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
}

.panel-title {
  margin: 0 0 16px;
  font-size: 1.15rem;
  color: #1a1a1a;
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

.unit-toggle-btn {
  margin-top: 10px;
  padding: 6px 12px;
  border: 1px solid #ccd6e6;
  border-radius: 6px;
  background-color: #fff;
  cursor: pointer;
  font-size: 0.85rem;
}

.unit-toggle-btn:hover {
  background-color: #f5f8fd;
}

.section-title {
  margin: 0 0 10px;
  color: #2b4a7a;
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
  color: #1a1a1a;
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
