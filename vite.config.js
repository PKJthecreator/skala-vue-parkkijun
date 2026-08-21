import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// ── GitHub Pages 배포용 base 경로 계산 ───────────────────────────────────────
// 프로젝트 사이트(예: pkjthecreator.github.io/skala-vue-private/)는 저장소명이
// 하위 경로로 붙기 때문에, base를 '/'로 두면 자산(js/css) 요청이 전부 404가 난다.
// Actions에서 주는 GITHUB_REPOSITORY로 자동 계산하므로 저장소 이름을 바꿔도 따라온다.
// 단 사용자 사이트(PKJthecreator.github.io 저장소)는 루트로 서비스되므로 '/'를 쓴다.
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isUserSite = repoName?.endsWith('.github.io')
const base = process.env.GITHUB_PAGES === 'true' && repoName && !isUserSite ? `/${repoName}/` : '/'

// ── GitHub Pages용 SPA fallback ──────────────────────────────────────────────
// 이 앱은 Vue Router를 History 모드(createWebHistory)로 쓰기 때문에
// /about 이나 /weather/city_01 로 직접 접속하면 GitHub Pages가 그 경로의 실제
// 파일을 찾다가 실패한다. GitHub Pages는 못 찾은 요청에 404.html을 돌려주므로,
// index.html을 404.html로 복사해 두면 그 요청도 SPA가 받아 라우터가 처리한다.
const spaFallback = () => ({
  name: 'spa-fallback-404',
  closeBundle() {
    const dist = path.resolve(import.meta.dirname, 'dist')
    fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'))
  },
})

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [vue(), vueDevTools(), spaFallback()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // 로컬 개발 서버(Dev Server) 속성 제어
  server: {
    port: 3000, // 개발 서버의 네트워크 포트를 3000번으로 고정 명세
    open: true, // 프로세스 기동(npm run dev) 시 기본 웹 브라우저를 자동 실행
  },
  // 컴파일 완료된 산출물(Production Build) 사양 제어
  build: {
    outDir: 'dist', // 최종 정적 리소스(HTML, JS, CSS)가 저장될 출력 디렉토리명 지정
  },
})
