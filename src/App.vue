<script setup>
import SampleOne from './components/practices/basic/SampleOne.vue'
import SampleTwo from './components/practices/basic/SampleTwo.vue'
import VueHtml from './components/practices/basic/VueHtml.vue'
import VueHtmlXss from './components/practices/basic/VueHtmlXss.vue'
import VueText from './components/practices/basic/VueText.vue'
import VueBind from './components/practices/basic/VueBind.vue'
import VueBindClass from './components/practices/basic/VueBindClass.vue'
import VueBindStyle from './components/practices/basic/VueBindStyle.vue'
import VueBindShorthand from './components/practices/basic/VueBindShorthand.vue'
import VueIf from './components/practices/basic/VueIf.vue'
import VueShow from './components/practices/basic/VueShow.vue'
import VueFor from './components/practices/basic/VueFor.vue'
import VuePre from './components/practices/basic/VuePre.vue'
import VueCloak from './components/practices/basic/VueCloak.vue'
import VueOnce from './components/practices/basic/VueOnce.vue'
import VueMemo from './components/practices/basic/VueMemo.vue'
import EventBasic from './components/practices/basic/EventBasic.vue'
import EventModifier from './components/practices/basic/EventModifier.vue'
import EventObject from './components/practices/basic/EventObject.vue'
import ModelBasic from './components/practices/basic/ModelBasic.vue'
import ModelModifier from './components/practices/basic/ModelModifier.vue'
import ModelForm from './components/practices/basic/ModelForm.vue'
import StyleScoped from './components/practices/basic/StyleScoped.vue'
import WeatherMockup from './components/exercise/과제1/WeatherMockup.vue'
import GradeMockup from './components/exercise/과제1/GradeMockup.vue'
import ReactiveRef from './components/practices/composition/ReactiveRef.vue'
import ReactiveReactive from './components/practices/composition/ReactiveReactive.vue'
import ComputedBasic from './components/practices/composition/ComputedBasic.vue'
import WatchersBasic from './components/practices/composition/WatchersBasic.vue'
import WatchersDeep from './components/practices/composition/WatchersDeep.vue'
import WatchersMulti from './components/practices/composition/WatchersMulti.vue'
import WatchersReactive from './components/practices/composition/WatchersReactive.vue'
import WatchersWatchEffect from './components/practices/composition/WatchersWatchEffect.vue'
import WeatherComposition from './components/exercise/과제2/WeatherComposition.vue'
import LifecycleParent from './components/practices/component/LifecycleParent.vue'
import PropsEmitsParent from './components/practices/component/PropsEmitsParent.vue'
import ParentComponent1 from './components/practices/component/ParentComponent1.vue'
import ParentComponent2 from './components/practices/component/ParentComponent2.vue'
import SlotDefaultParent from './components/practices/component/SlotDefaultParent.vue'
import SlotNamedParent from './components/practices/component/SlotNamedParent.vue'
import SlotScopedParent from './components/practices/component/SlotScopedparent.vue'
import WeatherParent from './components/exercise/과제3/WeatherParent.vue'
import StoreCounter from './components/practices/library/StoreCounter.vue'
import AxiosWeather from './components/practices/library/AxiosWeather.vue'
import AxiosJson from './components/practices/library/AxiosJson.vue'
import ElementPlus from './components/practices/library/ElementPlus.vue'
import WeatherStoreDashboard from './components/exercise/과제5/WeatherStoreDashboard.vue'
import WeatherAppDashboard from './components/exercise/과제6/WeatherAppDashboard.vue'
</script>

<template>
  <div style="padding: 20px">
    <SampleOne />
    <hr />
    <SampleTwo />
    <hr />
    <VueHtml />
    <hr />
    <VueHtmlXss />
    <hr />
    <VueText />
    <hr />
    <VueBind />
    <hr />
    <VueBindClass />
    <hr />
    <VueBindStyle />
    <hr />
    <VueBindShorthand />
    <hr />
    <VueIf />
    <hr />
    <VueShow />
    <hr />
    <VueFor />
    <hr />
    <VuePre />
    <hr />
    <VueCloak />
    <hr />
    <VueOnce />
    <hr />
    <VueMemo />
    <hr />
    <EventBasic />
    <hr />
    <EventModifier />
    <hr />
    <EventObject />
    <hr />
    <ModelBasic />
    <hr />
    <ModelModifier />
    <hr />
    <ModelForm />
    <hr />
    <StyleScoped />
    <hr />

    <section class="assignment-block">
      <h1 class="assignment-title">과제1: 날씨 목업</h1>
      <hr class="assignment-divider" />
      <WeatherMockup />
    </section>

    <section class="assignment-block">
      <h1 class="assignment-title">과제1 : 추가 성적표 목업</h1>
      <hr class="assignment-divider" />
      <GradeMockup />
    </section>

    <ReactiveRef />
    <hr />
    <ReactiveReactive />
    <hr />
    <ComputedBasic />
    <hr />
    <WatchersBasic />
    <hr />
    <WatchersDeep />
    <hr />
    <WatchersMulti />
    <hr />
    <WatchersReactive />
    <hr />
    <WatchersWatchEffect />

    <section class="assignment-block">
      <h1 class="assignment-title">과제2: 날씨 Composition API</h1>
      <hr class="assignment-divider" />
      <WeatherComposition />
    </section>

    <hr />
    <LifecycleParent />
    <hr />
    <PropsEmitsParent />
    <ParentComponent1 />
    <hr />
    <ParentComponent2 />
    <hr />
    <SlotDefaultParent />
    <hr />
    <SlotNamedParent />
    <hr />
    <SlotScopedParent />

    <section class="assignment-block">
      <h1 class="assignment-title">과제3: 날씨 컴포넌트 분리</h1>
      <hr class="assignment-divider" />
      <WeatherParent />
    </section>

    <section class="assignment-block">
      <h1 class="assignment-title">과제4: 날씨 Router (Vue Router)</h1>
      <hr class="assignment-divider" />
      <nav class="weather-nav">
        <RouterLink to="/">날씨 대시보드</RouterLink>
        <RouterLink to="/about">서비스 소개</RouterLink>
        <RouterLink to="/stats">통계</RouterLink>
      </nav>
      <RouterView />
    </section>

    <hr />
    <StoreCounter />

    <section class="assignment-block">
      <h1 class="assignment-title">과제5: 날씨 Store (Pinia)</h1>
      <hr class="assignment-divider" />
      <WeatherStoreDashboard />
    </section>

    <hr />
    <AxiosWeather />
    <hr />
    <AxiosJson />

    <section class="assignment-block">
      <h1 class="assignment-title">과제6: 실전 날씨 애플리케이션 (OpenWeatherMap API)</h1>
      <hr class="assignment-divider" />
      <WeatherAppDashboard />
    </section>

    <hr />
    <ElementPlus />
  </div>
</template>

<style scoped>
.assignment-block {
  margin-top: 56px;
}

.assignment-title {
  font-family:
    'Pretendard',
    -apple-system,
    'Segoe UI',
    'Malgun Gothic',
    sans-serif;
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 12px;
}

.assignment-divider {
  border: none;
  border-top: 4px solid #333;
  margin: 0 0 24px;
}

.weather-nav {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.weather-nav a {
  padding: 8px 16px;
  border: 1px solid #ccd6e6;
  border-radius: 6px;
  color: #2b4a7a;
  text-decoration: none;
  font-weight: 600;
}

.weather-nav a:hover {
  background-color: #f5f8fd;
}

.weather-nav a.router-link-exact-active {
  background-color: #0984e3;
  border-color: #0984e3;
  color: #fff;
}
</style>
