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

`src/components/exercise/과제1/WeatherMockup.vue`

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

- `src/components/exercise/과제2/WeatherComposition.vue` 추가
- 과제1 `WeatherMockup.vue`와 같은 날씨 데이터/디자인을 재사용하되, `searchQuery` /
  `selectedCityInfo` / `weatherList`를 반응형 상태로 두고 `computed`(`filteredWeatherList`),
  `watch`, `watchEffect`로 다시 구현
- 본인 추가 기능으로 섭씨/화씨 온도 단위 변환 토글(반응형 상태 + computed + watch)을 구현
  - 토글 버튼은 아직 `WeatherComposition.vue` 내부에 그대로 붙어 있으며, 이 기능을 독립 컴포넌트로
    떼어내는 작업은 과제3의 `UnitToggle.vue`에서 이어서 진행함

## 과제 3 실습 메모 (컴포넌트 분리)

`src/components/exercise/과제3/`

- 기능 변경 없이 날씨 화면을 `WeatherParent`(반응형 상태 총괄) / `BaseDashboardCard`(공통 레이아웃,
  `<slot>` 제공) / `SearchBar`(props로 검색어 표시, `update-query` emit) / `WeatherCard`(props로 도시
  객체 표시, `select-card`/`click-detail` emit) 4개 컴포넌트로 분리
- `SearchBar`, `WeatherCard`는 `BaseDashboardCard`의 slot 안에 배치되지만, 실제 데이터 바인딩과 이벤트
  통신은 `WeatherParent`와 직접 이루어짐 (slot 콘텐츠는 부모 스코프에서 컴파일됨)
- Lifecycle Hook(`LifecycleParent`/`LifecycleChild`), Props & Emits, Slot(Default/Named/Scoped)
  실습 컴포넌트도 함께 추가하고 `App.vue`에 등록
- 본인 추가 컴포넌트 2개 (요구사항 7: "본인 Mockup에서 추가한 기능을 컴포넌트로 분리하거나, 4개를
  더 세분화하여 추가 컴포넌트 작성")
  - **[UnitToggle.vue](src/components/exercise/과제3/UnitToggle.vue)** — "본인 Mockup의
    추가 기능"을 컴포넌트로 분리한 사례. 과제2에서 만들었던 섭씨/화씨 토글 버튼을 독립 컴포넌트로
    떼어냄. `isFahrenheit`(현재 단위)를 props로 받고, 버튼 클릭 시 `toggle-unit`을 emit만 함 — 실제
    전환 로직(`isFahrenheit.value = !isFahrenheit.value`)은 여전히 `WeatherParent.vue`가 보유
  - **[StatusBar.vue](src/components/exercise/과제3/StatusBar.vue)** — 필수 4개
    컴포넌트(WeatherParent/BaseDashboardCard/SearchBar/WeatherCard) 어디에도 속하지 않던 하단 상태
    표시줄("카드를 클릭하거나 검색해 보세요" 등)을 추가로 세분화한 사례. `selectedCity`(선택된 도시
    객체, 기본값 `null`) props만 받아 선택 여부에 따라 안내 문구를 표시


## 과제 4 실습 메모 (Vue Router)

`src/router/index.js`, `src/views/`, `src/components/exercise/과제4/`

- **라우트 구성**: `/`(홈) · `/about`(서비스 소개) · `/weather/:cityId`(상세) · `/stats`(통계) ·
  `/:pathMatch(.*)*`(Catch-all 404) 5개를 `routes` 배열로 분리해 `createRouter`에 주입
- **지연 로딩**: 모든 라우트를 `component: () => import(...)` 형태로 등록해 route level
  code-splitting 적용 (`npm run build` 결과에서 View별 청크가 따로 떨어지는 것으로 확인 가능)
- **동적 경로 매칭**: `WeatherDetailView`가 `route.params.cityId`로 Mock 배열에서 도시를 찾고,
  못 찾으면 "존재하지 않는 도시 코드" 안내를 표시
- **Programmatic Navigation**: 과제1~3에서 `window.alert`로 처리하던 [상세보기]를
  `router.push('/weather/' + city.id)`로 교체
- **`<a>` 대신 `RouterLink`**: 전체 화면 새로고침으로 반응형 상태가 날아가는 것을 막기 위해
  화면 간 이동은 모두 `RouterLink` 사용
- **본인 추가 view**: **[WeatherStatsView.vue](src/views/WeatherStatsView.vue)** — 평균 기온 /
  최고기온 도시 / 최저기온 도시를 `computed`로 계산해 보여주는 통계 페이지
- 과제3 컴포넌트(`BaseDashboardCard`/`SearchBar`/`WeatherCard`/`UnitToggle`/`StatusBar`)는
  `과제4/` 폴더에 복사해 두고 `WeatherHomeView`가 조립하는 구조로 재배치

## 과제 5 실습 메모 (Pinia Store)

`src/stores/`, `src/components/exercise/과제5/`

- **[configStore.js](src/stores/configStore.js)** — 섭씨/화씨 단위를 앱 전역에서 공유.
  과제2~4까지 컴포넌트 내부 `isFahrenheit` ref로 들고 있던 상태를 스토어로 끌어올린 것
  - state: `unit`(`'celsius' | 'fahrenheit'`), `changeCount`(본인 추가 — 단위 변경 누적 횟수)
  - getters: `unitSymbol`(℃/℉), `unitLabel`(본인 추가 — "섭씨(℃)" 형태의 표시용 문구)
  - actions: `toggleUnit`, `resetChangeCount`(본인 추가)
- **[favoriteStore.js](src/stores/favoriteStore.js)** — 본인 추가 스토어. 즐겨찾기 도시 id 배열을
  들고 `favoriteCount` getter와 `isFavorite`/`toggleFavorite` action 제공
- **[WeatherStoreDashboard.vue](src/components/exercise/과제5/WeatherStoreDashboard.vue)** —
  과제4의 Router 버전과는 분리한 별도 실습. 라우팅 대신 `DetailPanel`을 로컬 상태로 열고 닫으며
  Pinia 적용에만 집중. `watch(() => configStore.unit, ...)`로 스토어 상태 변화 감시도 함께 확인
- **[DetailPanel.vue](src/components/exercise/과제5/DetailPanel.vue)** — 상세 정보를 라우터 이동
  없이 같은 화면에서 펼쳐 보여주는 본인 추가 컴포넌트

## 과제 6 실습 메모 (실전 날씨 애플리케이션 / OpenWeatherMap API)

`src/components/exercise/과제6/`

- **요구사항1 — OpenWeatherMap Current Weather**:
  **[CurrentWeatherCard.vue](src/components/exercise/과제6/CurrentWeatherCard.vue)** 가
  `/data/2.5/weather`를 axios로 호출. `location`(위경도) prop 또는 `configStore.unit`이 바뀌면
  `watch`로 재조회하고, 화씨 변환은 프론트에서 계산하지 않고 쿼리의 `units=metric|imperial`을
  바꿔 API가 변환한 값을 그대로 사용
- **요구사항2 — OpenWeatherMap의 다른 API 추가**:
  **[CitySearch.vue](src/components/exercise/과제6/CitySearch.vue)** 가 Geocoding API(`/geo/1.0/direct`)로
  영문 도시명을 위경도로 변환. 하드코딩된 좌표 대신 원하는 도시를 검색해 조회할 수 있게 확장
- **요구사항3 — 기타 외부 API 추가**:
  **[CountryInfoCard.vue](src/components/exercise/과제6/CountryInfoCard.vue)** 가 REST Countries
  API(`https://restcountries.com/v3.1/alpha/{code}`, 키 불필요)를 호출. 날씨 응답의
  `sys.country` 국가 코드를 받아 국기/수도/인구/통화를 표시
- **본인 추가**: **[WeatherAppDashboard.vue](src/components/exercise/과제6/WeatherAppDashboard.vue)** 가
  세 API를 조합하는 부모 역할을 하며, 과제5의 `UnitToggler`/`configStore`를 그대로 재사용해
  실제 API 데이터에도 단위 전환이 적용되도록 연결 (과제 간 스토어 재사용 데모)

### UI Library 적용 (Element Plus)

"외부 UI Library를 선정하고 3일차 과제에 적용" 요구사항에 따라, 손으로 짜던 마크업을
Element Plus 컴포넌트로 교체했다.

| 위치 | 적용 전 | 적용 후 |
| --- | --- | --- |
| `CitySearch` | `<input>` + `<button>` + `<ul>` | `el-input`(append 슬롯에 `el-button`) + `el-card` + `el-tag` |
| `CurrentWeatherCard` | `<div class="result-card">` + "불러오는 중" 문구 | `el-card` + `el-descriptions` + `el-skeleton` + `el-empty` |
| `CountryInfoCard` | `<div class="country-card">` | `el-card` + `el-descriptions` + `el-skeleton` |
| `WeatherAppDashboard` | `<div class="api-note">` | `el-alert` |
| 에러/경고 알림 | `window.alert()` (화면 차단) | `ElMessage.error()` / `ElMessage.warning()` (비차단 토스트) |

- 로딩 처리를 문구에서 `el-skeleton`으로 바꿔, 응답을 기다리는 동안 카드 형태가 미리 보인다.
- `@element-plus/icons-vue`는 element-plus의 전이 의존성으로만 깔려 있어 배포 빌드에서 깨질 수
  있으므로 `package.json`에 직접 의존성으로 명시했다.

### API 키 설정

API 키는 소스에 하드코딩하지 않고 환경 변수로 관리한다 (`.env`는 git에 커밋되지 않음).

```sh
cp .env.example .env
# .env를 열어 VITE_OPENWEATHER_API_KEY에 발급받은 키를 채워 넣는다
```

> 참고: `VITE_` 접두사가 붙은 값은 빌드 시 번들에 인라인되므로 배포된 정적 파일에서는 여전히
> 키를 볼 수 있다. 실습 범위에서는 충분하지만 실서비스라면 서버 프록시를 두어야 한다.

## 빌드 & 배포

### 빌드 모드별 환경 변수

`.env.staging` / `.env.production`의 `VITE_API_URL`이 `--mode`에 따라 주입되는 것을
**[EnvVariables.vue](src/components/practices/library/EnvVariables.vue)** 에서 화면과
`console.log`로 확인할 수 있다.

| 명령 | 로드되는 파일 | 주입되는 `VITE_API_URL` |
| --- | --- | --- |
| `npm run dev` | `.env` | (없음) |
| `npm run build:staging` | `.env` + `.env.staging` | `https://api-stage.skcc.com` |
| `npm run build:production` | `.env` + `.env.production` | `https://api-prod.skcc.com` |
| `npm run build` | `.env` + `.env.production` | `https://api-prod.skcc.com` |

`.env`(실제 API 키)만 git에서 제외되고, 비밀값이 없는 `.env.staging` / `.env.production`은
실습 재현을 위해 커밋한다.

### Vercel 배포

정적 호스팅에서 SPA를 서비스할 때 걸리는 문제가 하나 있다. 이 앱은 Vue Router를
`createWebHistory`(History 모드)로 쓰기 때문에, `/about`이나 `/weather/city_01` 주소로 **직접
접속하거나 새로고침하면** 서버가 그 경로의 실제 파일을 찾다가 404를 낸다. 그래서 모든 경로를
`index.html`로 넘겨주는 fallback 설정이 필요하다 — [vercel.json](vercel.json)의 `rewrites`가
그 역할을 한다.

1. GitHub 저장소를 Vercel에 import한다 (Framework Preset: Vite 자동 인식).
2. **Settings → Environment Variables** 에 `VITE_OPENWEATHER_API_KEY`를 등록한다.
   `.env`는 커밋되지 않으므로 이 등록을 빠뜨리면 날씨 조회가 전부 실패한다.
3. Deploy 후 `/weather/city_01`로 **직접 접속**해서 404가 아닌지 확인한다.

> GitHub Pages에 올릴 경우에는 프로젝트 사이트가 `/저장소명/` 하위 경로라서
> `vite.config.js`에 `base: '/저장소명/'`을 추가해야 한다. 라우터는 이미
> `createWebHistory(import.meta.env.BASE_URL)`로 되어 있어 `base`만 넣으면 따라온다.

### API 키에 대한 주의

`VITE_` 접두사가 붙은 값은 빌드 시 번들에 그대로 인라인되므로, 배포된 `dist/assets/index-*.js`
에서 키를 볼 수 있다. 프론트엔드 전용 프로젝트에서는 피할 수 없는 구조이며, 실제로 키를 숨기려면
서버 프록시를 두고 브라우저가 그 서버를 호출하게 해야 한다. 이 실습에서는 무료 키를 쓰되
git 저장소에는 올리지 않는 선까지를 범위로 한다.
