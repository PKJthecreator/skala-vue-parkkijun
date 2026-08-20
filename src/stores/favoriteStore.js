import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// 본인 추가 스토어: 즐겨찾기 도시 관리
export const useFavoriteStore = defineStore('favorite', () => {
  const favoriteIds = ref([])

  const favoriteCount = computed(() => favoriteIds.value.length)

  function isFavorite(cityId) {
    return favoriteIds.value.includes(cityId)
  }

  function toggleFavorite(cityId) {
    if (isFavorite(cityId)) {
      favoriteIds.value = favoriteIds.value.filter((id) => id !== cityId)
    } else {
      favoriteIds.value.push(cityId)
    }
  }

  return { favoriteIds, favoriteCount, isFavorite, toggleFavorite }
})
