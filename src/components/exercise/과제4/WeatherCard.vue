<script setup>
// 1. 부모(WeatherHomeView)로부터 선택 대상이 될 도시 객체를 전달받음 (props)
defineProps({
  city: {
    type: Object,
    required: true,
  },
})

// 2. 카드 선택 / 상세보기를 부모에게 알릴 커스텀 이벤트 식별자 등록 (emits)
// 상세보기는 과제4부터 window.alert 대신 부모가 router.push로 처리한다.
const emit = defineEmits(['select-card', 'click-detail'])
</script>

<template>
  <div class="weather-card" @click="emit('select-card', city)">
    <div class="city-info">
      <p class="city-name">{{ city.name }} ({{ city.status }})</p>
      <p class="city-temp">현재 기온: {{ city.displayTemp }}{{ city.unit }}</p>
      <span v-if="city.temp >= 35" class="badge badge-hot">🔥 더움 (35도이상)</span>
      <span v-else-if="city.temp < 25" class="badge badge-cool">❄️ 선선함 (25도미만)</span>
      <span v-else class="badge badge-normal">🙂 보통 (25~34도)</span>
    </div>
    <button class="detail-btn" @click.stop="emit('click-detail', city)">상세보기</button>
  </div>
</template>

<style scoped>
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
</style>
