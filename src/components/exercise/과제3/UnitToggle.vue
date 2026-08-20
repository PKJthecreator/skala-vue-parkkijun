<script setup>
// 과제2(WeatherComposition)에서 "본인 추가 기능"이었던 섭씨/화씨 토글 버튼을
// 별도 컴포넌트로 분리 (요구사항 7)
defineProps({
  isFahrenheit: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['toggle-unit'])
</script>

<template>
  <button class="unit-toggle-btn" @click="emit('toggle-unit')">
    🌡️ {{ isFahrenheit ? '화씨(°F)' : '섭씨(°C)' }} 로 보는 중 (클릭 시 전환)
  </button>
</template>

<style scoped>
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
</style>
