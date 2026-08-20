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

## 과제 1 실습 메모 (Vue 기본 문법 — 날씨 목업)

`src/components/practices/basic/과제 1/WeatherMockup.vue`

- **배열 렌더링(`v-for`)**: 날씨 데이터 배열(서울/도쿄/베이징/평양 4개 도시, `{ id, name, temp, status }`)을
  `v-for`로 카드 반복 출력, `:key`는 도시 `id`로 바인딩
- **조건부 렌더링(`v-if`)**: 기온 기준으로 "더움/보통/선선함" 3단계 라벨을 분기 (원 과제 요구사항인
  더움/선선함 2단계에서 "보통" 구간을 본인 확장으로 추가)
- **양방향 바인딩 + 한글 입력 처리(`:value` / `@input`)**: 도시 이름 검색 input을 `v-model` 대신
  `:value`/`@input`으로 직접 구현해 한글 조합 입력이 끊기지 않고 실시간 동기화되도록 처리
- **이벤트 & 수식어**: 날씨 카드를 클릭하면 상태바에 "{도시}이 선택되었습니다." 표시, 카드 내부의
  [상세보기] 버튼은 `@click.stop`으로 버블링을 막아 카드 클릭 이벤트와 분리하고 `window.alert`로
  상세 정보 표시
- **본인 데이터 확장**: 수강 과목 성적표 목업(`GradeMockup.vue`)을 추가로 제작 (동일한
  v-for/v-if/이벤트 패턴을 성적 데이터에 재적용)

## 과제 2 실습 메모 (Composition API)

- `src/components/practices/composition/과제2/WeatherComposition.vue` 추가
- 과제1 `WeatherMockup.vue`와 같은 날씨 데이터/디자인을 재사용하되, `searchQuery` /
  `selectedCityInfo` / `weatherList`를 반응형 상태로 두고 `computed`(`filteredWeatherList`),
  `watch`, `watchEffect`로 다시 구현
- 본인 추가 기능으로 섭씨/화씨 온도 단위 변환 토글(반응형 상태 + computed + watch)을 구현
  - 토글 버튼은 아직 `WeatherComposition.vue` 내부에 그대로 붙어 있으며, 이 기능을 독립 컴포넌트로
    떼어내는 작업은 과제3의 `UnitToggle.vue`에서 이어서 진행함

## 과제 3 실습 메모 (컴포넌트 분리)

`src/components/practices/component/과제3/`

- 기능 변경 없이 날씨 화면을 `WeatherParent`(반응형 상태 총괄) / `BaseDashboardCard`(공통 레이아웃,
  `<slot>` 제공) / `SearchBar`(props로 검색어 표시, `update-query` emit) / `WeatherCard`(props로 도시
  객체 표시, `select-card`/`click-detail` emit) 4개 컴포넌트로 분리
- `SearchBar`, `WeatherCard`는 `BaseDashboardCard`의 slot 안에 배치되지만, 실제 데이터 바인딩과 이벤트
  통신은 `WeatherParent`와 직접 이루어짐 (slot 콘텐츠는 부모 스코프에서 컴파일됨)
- Lifecycle Hook(`LifecycleParent`/`LifecycleChild`), Props & Emits, Slot(Default/Named/Scoped)
  실습 컴포넌트도 함께 추가하고 `App.vue`에 등록
- 본인 추가 컴포넌트 2개 (요구사항 7: "본인 Mockup에서 추가한 기능을 컴포넌트로 분리하거나, 4개를
  더 세분화하여 추가 컴포넌트 작성")
  - **[UnitToggle.vue](src/components/practices/component/과제3/UnitToggle.vue)** — "본인 Mockup의
    추가 기능"을 컴포넌트로 분리한 사례. 과제2에서 만들었던 섭씨/화씨 토글 버튼을 독립 컴포넌트로
    떼어냄. `isFahrenheit`(현재 단위)를 props로 받고, 버튼 클릭 시 `toggle-unit`을 emit만 함 — 실제
    전환 로직(`isFahrenheit.value = !isFahrenheit.value`)은 여전히 `WeatherParent.vue`가 보유
  - **[StatusBar.vue](src/components/practices/component/과제3/StatusBar.vue)** — 필수 4개
    컴포넌트(WeatherParent/BaseDashboardCard/SearchBar/WeatherCard) 어디에도 속하지 않던 하단 상태
    표시줄("카드를 클릭하거나 검색해 보세요" 등)을 추가로 세분화한 사례. `selectedCity`(선택된 도시
    객체, 기본값 `null`) props만 받아 선택 여부에 따라 안내 문구를 표시

