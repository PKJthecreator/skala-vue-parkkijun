<script setup>
// 과제5: 별도 라우팅 없이, 카드의 [상세보기] 클릭으로 열리는 상세 날씨 패널.
// WeatherCard와 동일한 패턴으로 원본 섭씨 데이터를 configStore.unit에 따라 스스로 변환한다.
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore.js'

const props = defineProps({
  cityItem: {
    type: Object,
    default: null,
  },
})

defineEmits(['close'])

const configStore = useConfigStore()

const displayTemp = computed(() => {
  if (!props.cityItem) return null
  const rawTemp = props.cityItem.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})
</script>

<template>
  <div v-if="cityItem" class="detail-panel">
    <div class="detail-header">
      <h4>📡 {{ cityItem.name }} 상세 기상 정보</h4>
      <button class="close-btn" @click="$emit('close')">닫기</button>
    </div>
    <p>
      🌡️ 실시간 기온: <strong>{{ displayTemp }}{{ configStore.unitSymbol }}</strong>
    </p>
    <p>
      ☁️ 기상 현황: <strong>{{ cityItem.status }}</strong>
    </p>
    <p>
      💧 대기 습도: <strong>{{ cityItem.humidity }}%</strong>
    </p>
    <p>
      🍃 현재 풍속: <strong>{{ cityItem.windSpeed }}m/s</strong>
    </p>
  </div>
</template>

<style scoped>
.detail-panel {
  background-color: #fff;
  border: 1px solid #dbe3f0;
  border-radius: 10px;
  padding: 16px 18px;
  margin-bottom: 18px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.detail-header h4 {
  margin: 0;
  color: #2b4a7a;
}

.detail-panel p {
  margin: 6px 0;
}

.close-btn {
  padding: 4px 10px;
  border: 1px solid #ccd6e6;
  border-radius: 6px;
  background-color: #fff;
  cursor: pointer;
  font-size: 0.8rem;
}

.close-btn:hover {
  background-color: #f5f8fd;
}
</style>
