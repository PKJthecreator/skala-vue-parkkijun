<script setup>
// Code Challenge - env: .env.staging / .env.production에 설정한 VITE_API_URL이
// 빌드 모드(--mode)에 따라 어떻게 주입되는지 확인하는 실습 컴포넌트.
//
// npm run dev          -> mode: development (.env만 로드, VITE_API_URL 없음)
// npm run build:staging    -> mode: staging    (.env + .env.staging 로드)
// npm run build:production -> mode: production (.env + .env.production 로드)

// Vite는 VITE_ 접두사가 붙은 변수만 클라이언트 코드에 노출한다.
const currentApiUrl = import.meta.env.VITE_API_URL
// MODE / DEV / PROD / BASE_URL은 Vite가 기본 제공하는 내장 환경 변수다.
const currentMode = import.meta.env.MODE

console.log('현재 주입된 API 서버 주소:', currentApiUrl)
console.log('현재 빌드 모드:', currentMode)
</script>

<template>
  <div class="practice-section">
    <h2>Environment Variables (import.meta.env)</h2>
    <hr />
    <p>
      현재 빌드 모드: <strong>{{ currentMode }}</strong>
    </p>
    <p>
      연동 API 엔드포인트: <strong>{{ currentApiUrl ?? '(이 모드에는 VITE_API_URL이 정의되어 있지 않습니다)' }}</strong>
    </p>
    <p class="hint">※ API 키처럼 민감한 값은 <code>.env</code>(git 미추적)에만 두고, 여기 표시하지 않는다.</p>
  </div>
</template>

<style scoped>
.hint {
  color: #64748b;
  font-size: 0.85rem;
}
</style>
