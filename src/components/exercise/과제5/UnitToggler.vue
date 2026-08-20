<script setup>
// 과제5: Navigation Bar 옆에 배치되는 전역 단위 변경 UI.
// props/emit 없이 configStore를 직접 구독 -> 어떤 화면에 두어도 동일하게 동작한다.
import { useConfigStore } from '@/stores/configStore.js'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span class="unit-label">날씨단위: {{ configStore.unitLabel }}</span>
    <button class="unit-toggler-btn" @click="configStore.toggleUnit">단위변경</button>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  font-size: 0.9rem;
  color: #1a1a1a;
}

.unit-toggler-btn {
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  background-color: #0984e3;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.unit-toggler-btn:hover {
  background-color: #0768b8;
}
</style>
