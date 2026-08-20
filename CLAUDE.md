# CLAUDE.md

이 문서는 `과제3: 날씨 컴포넌트 분리` (`WeatherParent.vue` 외 5개 파일) 구현 계획을 정리한
기록입니다. (참고: `Full-stack Engineering_3.Frontend-framework_Vue.js_강병호_0807.pdf` "Hands
on - Weather Component" 슬라이드. 이 환경에는 PDF 렌더링 도구(poppler-utils 등)가 없어 PDF를
직접 열람하지는 못했지만, 저장소 루트의 `과제3.png`에 해당 슬라이드의 과제 요구사항 텍스트와
예시 화면(도시 검색 박스 → 지역별 날씨 현황 카드 리스트 → 카드 클릭 시 상태 표시 안내 문구)이
캡처되어 있어 이 이미지를 직접 확인하고 설계에 반영했습니다.)

## 1. 요구사항 정리 (`과제3.png` 원문)

기능 변경 없이 아래 4개 컴포넌트로 분리:

1. `WeatherParent.vue` — 모든 반응형 데이터 유지
2. `BaseDashboardCard.vue` — 검색박스와 리스트박스의 디자인을 공통화, `<slot>`으로 부모가
   도시 검색 UI/날씨 현황 UI를 주입
3. `SearchBar.vue` — 부모로부터 검색어(반응형 데이터)를 `props`로 전달받아 표시, 검색 시
   `update-query` 이벤트로 검색어를 부모에게 `emit`
4. `WeatherCard.vue` — 선택된 도시 객체를 `props`로 전달받아 표시, `select-card` /
   `click-detail` 이벤트를 부모에게 `emit`
5. 각 컴포넌트의 디자인은 `<style scoped>`로 분리
6. Slot으로 주입되는 `SearchBar`/`WeatherCard`는 화면상 `BaseDashboardCard` 내부에 있지만
   스크립트적으로는 `WeatherParent`의 스코프에서 평가되므로, `WeatherParent`가 두 컴포넌트와
   직접 props/emits로 통신
7. 본인 Mockup에서 추가한 기능을 컴포넌트로 분리하거나, 위 4개를 더 세분화하여 추가 컴포넌트
   작성

## 2. 참고 자료와 재사용 범위

과제 조건상 `src/components/practices` 폴더 안의 기존 예제만 참고해서 만들었습니다.

- **기능/데이터 원본**: `composition/과제2/WeatherComposition.vue`의 반응형 상태
  (`weatherList`, `searchQuery`, `selectedCityInfo`, `isFahrenheit`), computed
  (`filteredWeatherList`, `displayWeatherList`), watch/watchEffect 로직을 기능 변경 없이
  그대로 `WeatherParent.vue`로 옮기고, 템플릿만 4(+2)개 컴포넌트로 쪼갰습니다.
- **Props/Emits 패턴**: `component/PropsEmitsParent.vue` / `PropsEmitsChild.vue`의
  `defineProps` + `defineEmits` + 페이로드를 실어 보내는 핸들러 작성 방식을 `SearchBar`,
  `WeatherCard`, `UnitToggle`에 그대로 적용했습니다.
- **Slot 패턴**: `component/SlotDefaultParent.vue` / `SlotDefaultChild.vue`의 "부모가
  마크업 전체를 주입하고 자식은 `<slot>`만 배치" 구조를 `BaseDashboardCard`에 적용했습니다.
  (요구사항 6에서 "Named Slot으로 헤더/바디를 나눌 필요는 없다"고 판단해 `SlotNamedChild.vue`
  대신 기본 슬롯 1개 방식을 선택했습니다 — 검색 박스/리스트 박스 각각을
  `BaseDashboardCard`로 감싸 재사용하는 쪽이 요구사항 2 "검색박스와 리스트박스의 디자인을
  공통화"에 더 직접적으로 맞기 때문입니다.)
- **디자인 원형**: `basic/과제 1/WeatherMockup.vue` · `composition/과제2/WeatherComposition.vue`의
  `mockup-panel`(전체 패널) / `search-box`(검색 박스) / `weather-card`(카드) / `badge-*`
  / `status-bar` / `monitor` 스타일을 그대로 재사용하되, 각 클래스가 실제로 사용되는
  컴포넌트의 `<style scoped>`로 나눠 옮겼습니다.

## 3. 컴포넌트 설계

```
WeatherParent (반응형 상태 전부 보유)
├─ BaseDashboardCard (title="도시 검색")
│   ├─ SearchBar        (props: query / emits: update-query)
│   └─ UnitToggle       (props: isFahrenheit / emits: toggle-unit)  ← 요구사항 7 (본인 추가 기능 분리)
├─ BaseDashboardCard (title="지역별 날씨 현황 ...")
│   └─ WeatherCard v-for (props: city / emits: select-card, click-detail)
└─ StatusBar            (props: selectedCity)                        ← 요구사항 7 (컴포넌트 추가 분리)
```

- **`BaseDashboardCard`**: `icon`, `title` props + 기본 슬롯 1개. 검색 박스/리스트 박스가
  기존에 각각 갖고 있던 흰색 카드 배경·라운드·타이틀 스타일을 여기 하나로 합쳐, 두 군데에서
  재사용합니다(요구사항 2). 내부 데이터는 없고 오직 레이아웃/디자인만 담당합니다.
- **`SearchBar`**: `query`(String, required) prop을 `:value`로 그대로 표시만 하고, 로컬
  상태를 만들지 않습니다(단방향 데이터 흐름 유지). `@input`에서 `update-query`를 emit해
  `WeatherParent`가 `searchQuery.value`를 갱신합니다.
- **`WeatherCard`**: `city`(Object, required — `displayTemp`/`unit`까지 계산된 형태)를
  받아 그대로 렌더링만 하고, 카드 클릭은 `select-card`, 상세보기 버튼(`@click.stop`)은
  `click-detail`로 각각 emit해 부모의 `selectCity` / `showDetail` 로직을 그대로 재사용합니다.
- **`UnitToggle`** (추가): `과제2`에서 "본인 추가 기능"이었던 섭씨/화씨 토글 버튼을 그대로
  분리한 컴포넌트. `isFahrenheit` prop으로 현재 단위를 표시하고 클릭 시 `toggle-unit`을
  emit — 실제 토글 로직(`isFahrenheit.value = !isFahrenheit.value`)은 `WeatherParent`에
  그대로 둡니다.
- **`StatusBar`** (추가): 요구사항 4개 중 어디에도 속하지 않던 하단 상태 문구 영역을 별도
  분리. `selectedCity` prop(Object | null)만 받아 문구를 조합해 표시합니다.
- **watch/watchEffect 모니터링 패널**은 `WeatherParent`의 반응형 상태를 직접 참조하는
  디버그용 UI라 별도 분리하지 않고 `WeatherParent`에 그대로 남겼습니다(기능 변경 없음
  요구사항 준수).

## 4. 파일 위치 및 등록

- 컴포넌트: `src/components/practices/component/과제3/` 폴더에 6개 파일
  (`WeatherParent.vue`, `BaseDashboardCard.vue`, `SearchBar.vue`, `WeatherCard.vue`,
  `UnitToggle.vue`, `StatusBar.vue`) — `basic/과제 1/`, `composition/과제2/` 폴더 관례를
  그대로 따라 `component/과제3/`로 구성했습니다.
- `src/App.vue`에 `WeatherParent`를 import하고, 과제1·과제2와 동일한
  `<section class="assignment-block">` 패턴으로 "과제3: 날씨 컴포넌트 분리" 섹션을
  기존 컴포넌트 실습들 다음에 추가합니다.

## 5. 검증

- `npm run lint` (oxlint + eslint --fix): 통과
- `npm run build` (vite build): 통과
- 브라우저 인터랙션 테스트는 시도했으나, 이 환경의 Playwright 헤드리스 Chromium 실행에
  필요한 시스템 공유 라이브러리(`libnspr4.so` 등)가 없고 `sudo` 권한도 없어 실제로 클릭/
  입력까지 확인하지는 못했습니다. 대신 각 컴포넌트의 `props`/`emits` 이름이 부모-자식 간에
  1:1로 정확히 대응하는지(`SearchBar` ↔ `query`/`update-query`, `WeatherCard` ↔
  `city`/`select-card`/`click-detail`, `UnitToggle` ↔ `isFahrenheit`/`toggle-unit`,
  `StatusBar` ↔ `selectedCity`) 코드로 직접 대조했고, `WeatherParent`의 반응형 상태·
  computed·watch/watchEffect 로직은 이미 브라우저에서 검증된 `WeatherComposition.vue`
  코드를 값 그대로 옮긴 것이라 기능적으로는 동일할 것으로 판단됩니다.
