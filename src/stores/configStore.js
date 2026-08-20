import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  // state
  const unit = ref('celsius') // 'celsius' | 'fahrenheit'
  const changeCount = ref(0) // 추가 state: 단위를 변경한 누적 횟수

  // getters
  const unitSymbol = computed(() => (unit.value === 'fahrenheit' ? '℉' : '℃'))
  const unitLabel = computed(() => (unit.value === 'fahrenheit' ? `화씨(${unitSymbol.value})` : `섭씨(${unitSymbol.value})`)) // 추가 getter

  // actions
  function toggleUnit() {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
    changeCount.value++
  }

  function resetChangeCount() {
    changeCount.value = 0
  } // 추가 action

  return { unit, changeCount, unitSymbol, unitLabel, toggleUnit, resetChangeCount }
})
