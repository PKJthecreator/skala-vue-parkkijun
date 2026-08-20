<script setup>
import { ref } from 'vue'
import WeatherCard from './ChildComponent2.vue'
const selectedCityInfo = ref('카드를 클릭해 보세요.')
// 자식이벤트 발생 시 이벤트 핸들러
const receiveCitySignal = (cityName) => {
  selectedCityInfo.value = `${cityName}이(가) 성공적으로 선택되었습니다.`
}
</script>
<template>
  <div class="parent-box">
    <h2>📡 부모 관제탑 (Emits 수신 패널)</h2>
    <hr />
    <WeatherCard cityName="서울" status="맑음" @select-city="receiveCitySignal" />
    <WeatherCard cityName="도쿄" status="흐림" @select-city="receiveCitySignal" />
    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </div>
</template>
