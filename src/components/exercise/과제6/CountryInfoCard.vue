<script setup>
// 과제6-요구사항3: OpenWeatherMap이 아닌 별도의 외부 API(REST Countries)를 추가해 기능 확장
// https://restcountries.com/v3.1/alpha/{countryCode}
//
// UI Library 과제: 직접 짜던 카드 마크업을 Element Plus 컴포넌트
// (el-card, el-descriptions, el-skeleton, el-tag)로 교체했다.
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
  <el-card v-if="isLoading || countryData" class="country-card" shadow="never">
    <template #header>
      <div class="card-header">
        <span class="flag">{{ countryData?.flag }}</span>
        <strong>{{ countryData?.name.common }}</strong>
        <el-tag v-if="countryData" size="small" type="warning" effect="plain">{{ countryData.name.official }}</el-tag>
      </div>
    </template>

    <el-skeleton v-if="isLoading" :rows="4" animated />

    <el-descriptions v-else :column="1" border>
      <el-descriptions-item label="🏛️ 수도">{{ countryData.capital?.[0] ?? '정보 없음' }}</el-descriptions-item>
      <el-descriptions-item label="👥 인구">{{ countryData.population.toLocaleString() }}명</el-descriptions-item>
      <el-descriptions-item label="🌏 지역">{{ countryData.region }} ({{ countryData.subregion }})</el-descriptions-item>
      <el-descriptions-item label="💰 통화">
        {{
          Object.values(countryData.currencies ?? {})
            .map((c) => c.name)
            .join(', ') || '정보 없음'
        }}
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
</template>

<style scoped>
.country-card {
  margin-top: 14px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.flag {
  font-size: 1.6rem;
}
</style>
