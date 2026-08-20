# skala-vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 과제 1 실습 메모

- 날씨 목업 데이터는 서울, 도쿄, 베이징, 평양 4개 도시로 구성
- 기온 조건은 더움/선선함 2단계 대신 중간에 "보통" 구간을 추가해서 3단계로 나눔
- 본인 데이터 과제로 수강 과목 성적표 목업(GradeMockup)을 추가로 만듦

## 과제 2 실습 메모 (Composition API)

- `src/components/practices/composition/과제2/WeatherComposition.vue` 추가
- 과제1 `WeatherMockup.vue`와 같은 날씨 데이터/디자인을 재사용하되, `searchQuery` /
  `selectedCityInfo` / `weatherList`를 반응형 상태로 두고 `computed`(`filteredWeatherList`),
  `watch`, `watchEffect`로 다시 구현
- 본인 추가 기능으로 섭씨/화씨 온도 단위 변환 토글(반응형 상태 + computed + watch)을 구현

