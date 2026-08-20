import { createRouter, createWebHistory } from 'vue-router'

// 요구사항 1: 모든 라우트에 지연 로딩(Lazy Loading, route level code-splitting) 적용
const routes = [
  {
    path: '/',
    name: 'weather-home',
    component: () => import('../views/WeatherHomeView.vue'),
  },
  {
    path: '/about',
    name: 'weather-about',
    component: () => import('../views/WeatherAboutView.vue'),
  },
  {
    path: '/weather/:cityId',
    name: 'weather-detail',
    component: () => import('../views/WeatherDetailView.vue'),
  },
  {
    path: '/stats',
    name: 'weather-stats',
    component: () => import('../views/WeatherStatsView.vue'),
  },
  // Catch-all Route: 위 라우트와 매칭되지 않는 모든 경로를 NotFoundView로 처리
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
