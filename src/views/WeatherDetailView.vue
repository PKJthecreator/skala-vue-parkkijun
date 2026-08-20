<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 홈 화면(WeatherHomeView)과 동일한 형태의 임시 Mock Data
// (실무라면 axios로 백엔드에서 조회하겠지만, 이번 실습에서는 도시ID로 찾을 수 있는
//  로컬 배열만으로 동적 경로 매칭 -> 상세 데이터 조회 흐름을 재현한다.)
const cityDetailList = [
  { id: 'city_01', name: '서울', fullLocation: '대한민국 서울특별시', temp: 36, status: '맑음', humidity: 55, windSpeed: 2.5 },
  { id: 'city_02', name: '도쿄', fullLocation: '일본 도쿄도', temp: 30, status: '흐림', humidity: 60, windSpeed: 3.1 },
  { id: 'city_03', name: '베이징', fullLocation: '중국 베이징시', temp: 22, status: '황사', humidity: 40, windSpeed: 4.2 },
  { id: 'city_04', name: '평양', fullLocation: '평양직할시', temp: 27, status: '비', humidity: 75, windSpeed: 1.8 },
]

const selectedCity = ref(null)

// 요구사항: Router 동적 경로 매칭(cityId)을 기반으로 Mount 시점에 Mock Data에서 도시 객체 선택
onMounted(() => {
  const cityId = route.params.cityId
  selectedCity.value = cityDetailList.find((city) => city.id === cityId) ?? null
})
</script>

<template>
  <div class="practice-section">
    <h2>📡 지역별 상세 기상 관측 정보</h2>

    <div v-if="selectedCity" class="detail-card">
      <p>📍 지정 지역: <strong>{{ selectedCity.fullLocation }}</strong></p>
      <p>🌡️ 실시간 기온: <strong>{{ selectedCity.temp }}°C</strong></p>
      <p>☁️ 기상 현황: <strong>{{ selectedCity.status }}</strong></p>
      <p>💧 대기 습도: <strong>{{ selectedCity.humidity }}%</strong></p>
      <p>🍃 현재 풍속: <strong>{{ selectedCity.windSpeed }}m/s</strong></p>
    </div>
    <div v-else class="detail-card">
      <p>❌ 존재하지 않는 도시 코드입니다: <strong>{{ route.params.cityId }}</strong></p>
    </div>

    <!-- HTML <a> 태그 금지: RouterLink 사용 (SPA 새로고침 방지, 반응형 상태 보존) -->
    <RouterLink to="/" class="back-link">← 메인 대시보드로 돌아가기</RouterLink>
  </div>
</template>

<style scoped>
.detail-card {
  background-color: #fff;
  border: 1px solid #dbe3f0;
  border-radius: 10px;
  padding: 16px 18px;
  margin: 16px 0;
}

.detail-card p {
  margin: 6px 0;
}

.back-link {
  display: inline-block;
  padding: 8px 16px;
  border: 1px solid #ccd6e6;
  border-radius: 6px;
  background-color: #fff;
  color: #2b4a7a;
  text-decoration: none;
}

.back-link:hover {
  background-color: #f5f8fd;
}
</style>
