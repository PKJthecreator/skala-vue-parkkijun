<script setup>
// 과제6-요구사항3: OpenWeatherMap이 아닌 별도의 외부 API(REST Countries)를 추가해 기능 확장
// https://restcountries.com/v3.1/alpha/{countryCode}
import { ref, watch } from 'vue'
import axios from 'axios'

const COUNTRY_URL = 'https://restcountries.com/v3.1/alpha'

const props = defineProps({
  countryCode: {
    type: String,
    default: null,
  },
})

const countryData = ref(null)
const isLoading = ref(false)

const fetchCountry = async () => {
  if (!props.countryCode) return
  isLoading.value = true

  try {
    const response = await axios.get(`${COUNTRY_URL}/${props.countryCode}`)
    countryData.value = response.data[0]
  } catch (error) {
    console.error('REST Countries API 통신 중 에러가 발생했습니다:', error)
    countryData.value = null
  } finally {
    isLoading.value = false
  }
}

watch(() => props.countryCode, fetchCountry, { immediate: true })
</script>

<template>
  <div v-if="countryData" class="country-card">
    <p class="country-title">
      <span class="flag">{{ countryData.flag }}</span>
      <strong>{{ countryData.name.common }}</strong>
      <span class="native-name">({{ countryData.name.official }})</span>
    </p>
    <p>
      🏛️ 수도: <strong>{{ countryData.capital?.[0] ?? '정보 없음' }}</strong>
    </p>
    <p>
      👥 인구: <strong>{{ countryData.population.toLocaleString() }}명</strong>
    </p>
    <p>
      🌏 지역: <strong>{{ countryData.region }} ({{ countryData.subregion }})</strong>
    </p>
    <p>
      💰 통화:
      <strong>{{
        Object.values(countryData.currencies ?? {})
          .map((c) => c.name)
          .join(', ') || '정보 없음'
      }}</strong>
    </p>
  </div>
  <p v-else-if="isLoading">⏳ 국가 정보를 불러오는 중...</p>
</template>

<style scoped>
.country-card {
  margin-top: 12px;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 8px;
  padding: 15px;
  line-height: 1.8;
}

.country-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
}

.flag {
  font-size: 1.6rem;
}

.native-name {
  color: #92400e;
  font-size: 0.85rem;
}
</style>
