# 과제6: 실전 날씨 애플리케이션 (OpenWeatherMap API)

## 요구사항 요약 (텍스트로 전달받음, 스크린샷 없음)

1. OpenWeatherMap API를 통해 실제 날씨 데이터를 가져와 적용한다.
2. OpenWeatherMap에서 제공되는 API를 추가하여 Application 기능을 확장한다.
3. 기타 외부 API를 추가하여 Application 기능을 확장한다.

사용자가 이미 axios 설치 및 OpenWeatherMap 가입/키 발급을 완료한 상태로 아래 정보를 전달함:
- API Key: `.env`의 `VITE_OPENWEATHER_API_KEY`로 관리 (git 미추적, `.env.example` 참고)
- Current Weather Data: `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`

## 참고한 기존 파일 (설계/패턴 근거)

- `src/components/practices/library/AxiosWeather.vue` — 이미 같은 API 키/좌표(서울, lat 35.158582 / lon 126.804975)로 axios GET + try/catch/finally + `isLoading` 패턴을 쓰고 있어 그대로 재사용. 단, AxiosWeather.vue는 "실습용 단발성 통신 검증"이 목적이라 그대로 확장하지 않고, 과제6은 별도 폴더에 실제로 쓸 수 있는 형태(도시 검색, 국가 정보까지 딸린 미니 앱)로 새로 구성
- `src/components/exercise/과제5/UnitToggler.vue` + `src/stores/configStore.js` — 과제5에서 만든 Pinia 단위(섭씨/화씨) 스토어를 그대로 재사용. `configStore.unit`에 따라 OpenWeatherMap 쿼리의 `units` 파라미터를 `metric`/`imperial`로 바꿔서, 프론트에서 직접 화씨 계산을 하지 않고 API가 변환해서 내려주는 값을 그대로 사용
- `src/components/exercise/과제4,5` 폴더 구조(부모 컴포넌트 + 자식 컴포넌트로 분리, props/emits로 통신) — 과제6도 동일한 관례를 따름

## 설계 결정: 3개 API를 어떻게 배치했는가

- **요구사항1 (OpenWeatherMap Current Weather)** → `CurrentWeatherCard.vue`: `location`(위경도) prop이 바뀌거나 `configStore.unit`이 바뀔 때마다 `watch`로 재조회. 기본값은 서울(AxiosWeather.vue와 동일 좌표)이라 페이지 진입 시 바로 실제 날씨가 보인다.
- **요구사항2 (OpenWeatherMap의 다른 API 추가)** → `CitySearch.vue`: **Geocoding API**(`/geo/1.0/direct`)로 영문 도시명을 위경도로 변환. 하드코딩된 좌표 대신 사용자가 원하는 도시를 검색해서 `CurrentWeatherCard`에 넘겨줄 수 있게 됨 → "Application 기능을 확장"의 실질적 의미(다른 도시 조회 가능)를 충족
- **요구사항3 (기타 외부 API)** → `CountryInfoCard.vue`: OpenWeatherMap이 아닌 **REST Countries API**(`https://restcountries.com/v3.1/alpha/{code}`, 키 불필요)를 추가. 날씨 응답(`weatherData.sys.country`)의 국가 코드를 그대로 넘겨받아 국기/수도/인구/통화 등 국가 정보를 보여줌으로써 날씨 앱을 자연스럽게 확장
- **본인 추가**: 세 API를 조합한 `WeatherAppDashboard.vue`가 부모 역할을 하며, 과제5의 `UnitToggler`/`configStore`를 재사용해 실제 API 데이터에도 단위 전환이 적용되도록 연결 (과제 간 스토어 재사용 데모)

## 파일 위치 및 App.vue 등록

- 신규: `src/components/exercise/과제6/{WeatherAppDashboard,CitySearch,CurrentWeatherCard,CountryInfoCard}.vue`
- 수정: `src/App.vue` — `AxiosJson` 아래에 `과제6: 실전 날씨 애플리케이션 (OpenWeatherMap API)` 섹션을 새로 추가, `WeatherAppDashboard`만 등록

## 보안 관련 메모

OpenWeatherMap API 키는 `CitySearch.vue`, `CurrentWeatherCard.vue`, `AxiosWeather.vue` 모두 `import.meta.env.VITE_OPENWEATHER_API_KEY`로 읽는다. 실제 값은 git에 추적되지 않는 `.env`에만 있고, 레포에는 빈 `.env.example`만 커밋되어 있다 (교수님 원본 `AxiosWeather.vue`는 키가 소스에 하드코딩되어 있었음).

다만 `VITE_` 접두사가 붙은 값은 빌드 시 번들에 그대로 인라인되므로, 배포된 정적 파일에서는 여전히 키를 볼 수 있다. 실습 범위에서는 충분하지만 실서비스라면 서버 프록시를 두어야 한다.

## 검증

- `npm run lint`, `npm run build` 통과 여부를 기록 (헤드리스 브라우저 실행이 이 환경에서 불가능해 실제 API 응답/화면 확인은 사용자가 `npm run dev`로 직접 확인 필요 — 특히 OpenWeatherMap 키가 방금 발급된 경우 활성화까지 몇 분 정도 지연될 수 있음)
