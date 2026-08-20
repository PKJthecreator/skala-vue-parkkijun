# CLAUDE.md

이 문서는 `과제2: 날씨 Composition API` (`WeatherComposition.vue`) 구현 계획을 정리한 기록입니다.
(참고: `Full-stack Engineering_3.Frontend-framework_Vue.js_강병호_0807.pdf` 145쪽 "Hands on -
Weather Composition" 슬라이드. 이 환경에는 PDF 렌더링 도구(poppler-utils 등)가 없어 PDF 파일을
직접 열람하지는 못했지만, 저장소 루트의 `과제 2.png`에 해당 슬라이드의 과제 요구사항 텍스트와
교수님 예시 화면(검색창 → 지역별 날씨 현황 카드 → 상태바 → watch/watchEffect 콘솔 로그 패널
구성, 그리고 카드 아래 온도 단위 변환 버튼)이 캡처되어 있어 이 이미지를 직접 확인하고 설계에
반영했습니다. 사용자가 프롬프트에 옮겨 적은 요구사항 원문과도 내용이 일치함을 확인했습니다.)

## 1. 요구사항 정리

1. 반응형 상태: `searchQuery`, `selectedCityInfo`, `weatherList`
2. `computed`로 만든 `filteredWeatherList` (도시 이름에 `searchQuery` 포함된 항목만 필터링)
3. 감시자
   - `watch(selectedCityInfo, ...)`: 상태바 문구가 바뀔 때마다 콘솔 로그
   - `watchEffect(...)`: `searchQuery` 타이핑을 자동 추적하여 콘솔 로그
4. 템플릿 분기: 검색어 없음 → 원본 전체 / 일치 항목 있음 → 필터 결과 / 일치 항목 없음 → 안내 문구
5. 본인만의 반응형 상태·computed·watcher 1개씩 추가

## 2. 참고 자료와 재사용 범위

과제 조건상 `src/components/practices/basic`, `src/components/practices/composition` 두 폴더
안의 코드만 참고해서 만들었습니다.

- **디자인 양식**: `basic/과제 1/WeatherMockup.vue`의 `mockup-panel` 레이아웃(검색창 →
  도시 카드 리스트 → 상태바)과 배지(`badge-hot/cool/normal`) 분류 기준, 색상 팔레트를
  그대로 재사용했습니다. `basic/과제 1/GradeMockup.vue`가 같은 레이아웃을 다른 도메인
  (성적표)에 적용해 둔 전례가 있어, 이 디자인이 "과제1 폴더의 공통 양식"이라고 판단했습니다.
- **Composition API 패턴**: `composition/ComputedBasic.vue`(computed 캐싱),
  `composition/WatchersBasic.vue` / `WatchersReactive.vue`(watch 사용법과 `.monitor` 로그
  패널 UI), `composition/WatchersWatchEffect.vue`(watchEffect 사용법과 안내 문구 스타일)를
  참고해 감시자 코드와 "👁️‍🗨️ 모니터링 시스템" UI 패턴을 그대로 가져왔습니다.
- **데이터 재사용**: `weatherList`의 도시 4개(`서울/도쿄/베이징/평양`)와 필드 구조
  (`id`, `name`, `temp`, `status`)는 `WeatherMockup.vue`와 동일하게 맞춰서, 과제1 → 과제2로
  이어지는 동일 도메인의 "Options 스타일 → Composition 스타일" 리팩터링처럼 보이도록 했습니다.

## 3. 설계 결정

- **`selectedCityInfo`는 문자열이 아니라 도시 객체 전체**를 담도록 설계했습니다.
  (과제1의 `selectedCity`는 이름 문자열만 저장) 이름이 `...Info`로 끝나는 것도 그렇고,
  상태바 문구(도시명 + 상태 + 기온)를 `watch` 콜백 하나에서 전부 조합하려면 객체 전체가
  필요하기 때문입니다.
- **`filteredWeatherList`가 요구사항 4의 세 가지 분기를 자연스럽게 포괄**하도록 설계했습니다.
  `searchQuery`가 빈 문자열일 때 `city.name.includes('')`는 항상 `true`이므로, 별도 분기
  없이도 `filteredWeatherList`가 전체 목록과 동일해집니다. 템플릿에서는 안내 문구(제목/빈
  결과 메시지)만 `v-if / v-else-if / v-else`로 나누고, 실제 렌더링 데이터는 계속
  `filteredWeatherList` 계열을 사용해 요구사항 2와 4를 하나의 데이터 흐름으로 연결했습니다.
- **본인 추가 항목: 섭씨/화씨 단위 토글**
  - 반응형 상태: `isFahrenheit` (`ref(false)`)
  - computed: `displayWeatherList` — `filteredWeatherList`(요구사항 2의 결과)를 이어받아
    `isFahrenheit` 값에 따라 변환된 `displayTemp`, `unit`을 붙여 재가공합니다. computed가
    다른 computed를 체이닝하는 예시를 보여주기 위한 설계입니다.
  - watch: `isFahrenheit`를 감시해 단위가 바뀔 때마다 콘솔 로그를 남깁니다.
  - 더움/보통/선선함 배지 판정은 화씨로 바뀌어도 기준이 흔들리지 않도록 항상 원본 섭씨
    값(`city.temp`)을 기준으로 계산합니다.
  - `과제 2.png` 예시 화면에도 날씨 카드 아래 "온도 단위 변환" 버튼이 배치되어 있어,
    이 위치와 성격의 기능이 "본인만의 추가"로 기대된다는 것을 확인하고 그대로 채택했습니다.

## 4. 파일 위치 및 등록

- 컴포넌트: `src/components/practices/composition/과제2/WeatherComposition.vue`
  (`basic/과제 1/` 폴더 관례를 그대로 따라 `composition/과제2/`로 구성)
- `src/App.vue`에 `WeatherComposition`을 import하고, 과제1과 동일한
  `<section class="assignment-block">` 패턴으로 "과제2: 날씨 Composition API" 섹션을
  `WatchersWatchEffect` 다음에 추가했습니다.

## 5. 검증

- `npm run lint` (oxlint + eslint --fix): 통과
- `npm run build` (vite build): 통과
- Playwright 헤드리스 브라우저로 실제 인터랙션 확인: 검색 필터링, "일치하는 도시 없음" 문구,
  카드 클릭 시 상태바 갱신, 단위 변환 버튼(°C ↔ °F 값 정상 변환) — 콘솔 로그도 watch /
  watchEffect 모두 정상 발화 확인

## 6. 코드 리뷰 반영 (2차 수정)

첫 구현 이후 코드 리뷰(GPT Codex)에서 아래 3가지를 지적받아 반영했습니다.

1. **CLAUDE.md의 PDF 참고 표기 부정확** — "PDF를 직접 열람하지 못했다"고만 적혀 있었으나,
   실제로는 저장소 루트의 `과제 2.png`(145쪽 슬라이드 캡처)를 확인하고 설계에 반영했습니다.
   위 1절 서두와 3절에 이 내용을 반영해 정정했습니다.
2. **`watch(selectedCityInfo)` 로그가 도시 이름만 출력** — 상태바에 실제로 표시되는 문구
   전체("서울이 선택되었습니다.")를 로그로 남기도록 수정해, `과제 2.png`의 교수님 예시 콘솔
   로그(`[watch 감지] 상태 바 문구가 업데이트되었습니다 -> '...'`)와 동일한 형식으로
   맞췄습니다. `watchEffect` 로그도 같은 방식으로 문구를 다듬었습니다.
3. **"보통" 배지 라벨 오류** — 배지 분기 조건은 `temp < 25`면 선선함, 그 외(25 이상 35 미만)는
   보통으로 처리되는데 라벨은 `보통 (26~34)`로 표기되어 25도가 라벨 범위에서 빠져 보이는
   문제가 있었습니다. `보통 (25~34도)`로 라벨을 수정해 실제 조건과 일치시켰습니다.

추가로, OS/브라우저가 다크 모드일 때 흰색 카드 위 텍스트가 상속된 기본 글자색 때문에 흐리게
보일 수 있다는 지적에 따라 `.mockup-panel`, `.panel-title`, `.city-name`, `.monitor h3/p`에
명시적으로 어두운 글자색(`#1a1a1a`)을 지정해 항상 밝은 테마와 동일하게 보이도록 했습니다.
