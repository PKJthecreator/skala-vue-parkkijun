<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore.js'

const props = defineProps({
  selectedCity: {
    type: Object,
    default: null,
  },
})

const configStore = useConfigStore()

const displayTemp = computed(() => {
  if (!props.selectedCity) return null
  const rawTemp = props.selectedCity.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})
</script>

<template>
  <div class="status-bar">
    {{ selectedCity ? `${selectedCity.name}이 선택되었습니다. (${selectedCity.status} / ${displayTemp}${configStore.unitSymbol})` : '카드를 클릭하거나 검색해 보세요.' }}
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
