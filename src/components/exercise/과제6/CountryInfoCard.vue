<script setup>
// 과제6-요구사항3: OpenWeatherMap이 아닌 별도의 외부 API(World Bank)를 추가해 기능 확장
// https://api.worldbank.org/v2/country/{countryCode}
//
// UI Library 과제: 직접 짜던 카드 마크업을 Element Plus 컴포넌트
// (el-card, el-descriptions, el-skeleton, el-tag)로 교체했다.
import { ref, watch } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const COUNTRY_URL = 'https://api.worldbank.org/v2/country'

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
    const [countryResponse, populationResponse] = await Promise.all([
      axios.get(`${COUNTRY_URL}/${props.countryCode}`, { params: { format: 'json' } }),
      axios.get(`${COUNTRY_URL}/${props.countryCode}/indicator/SP.POP.TOTL`, { params: { format: 'json', per_page: 10 } }),
    ])
    const country = countryResponse.data[1]?.[0]
    if (!country) throw new Error('국가 정보가 없습니다.')

    countryData.value = {
      ...country,
      population: populationResponse.data[1]?.find((item) => item.value !== null)?.value ?? null,
    }
  } catch (error) {
    console.error('World Bank API 통신 중 에러가 발생했습니다:', error)
    countryData.value = null
    ElMessage.error('국가 정보를 가져오지 못했습니다.')
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
        <strong>{{ countryData?.name }}</strong>
        <el-tag v-if="countryData" size="small" type="warning" effect="plain">{{ countryData.iso2Code }}</el-tag>
      </div>
    </template>

    <el-skeleton v-if="isLoading" :rows="4" animated />

    <el-descriptions v-else :column="1" border>
      <el-descriptions-item label="🏛️ 수도">{{ countryData.capitalCity || '정보 없음' }}</el-descriptions-item>
      <el-descriptions-item label="👥 최신 인구">{{ countryData.population === null ? '정보 없음' : `${countryData.population.toLocaleString()}명` }}</el-descriptions-item>
      <el-descriptions-item label="🌏 지역">{{ countryData.region.value }}</el-descriptions-item>
      <el-descriptions-item label="💰 소득 수준">{{ countryData.incomeLevel.value }}</el-descriptions-item>
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
</style>
