<script setup>
// 부모에게 물려받을 Props
defineProps({
  cityName: String,
  status: String,
})
// 부모에게 전달할 커스텀 이벤트 타입을 배열로 등록.
// (관례상 변수명은 'emit'이라고 똑같이 지어준다
const emit = defineEmits(['select-city'])
// 카드가 클릭되었을 때 실행될 함수
const handleCardClick = (name) => {
  // 부모에게 'select-city' 이벤트 발생하면서, 선택된 도시 이름 전달
  emit('select-city', name)
}
</script>
<template>
  <div class="weather-card" @click="handleCardClick(cityName)">
    <h4>{{ cityName }} ({{ status }})</h4>
    <p>클릭하면 부모에게 신호를 보냅니다.</p>
  </div>
</template>
