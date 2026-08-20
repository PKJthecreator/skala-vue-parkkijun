<script setup>
// 4개 필수 컴포넌트 어디에도 속하지 않던 하단 상태 문구 영역 (과제3에서 분리, 과제4에서 재사용)
defineProps({
  selectedCity: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <div class="status-bar">
    {{ selectedCity ? `${selectedCity.name}이 선택되었습니다. (${selectedCity.status} / ${selectedCity.temp}°C)` : '카드를 클릭하거나 검색해 보세요.' }}
  </div>
</template>

<style scoped>
.status-bar {
  margin-top: 14px;
  padding: 10px 14px;
  background-color: #eaf7ee;
  color: #1e8e3e;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
}
</style>
