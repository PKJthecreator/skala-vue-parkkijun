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
import WeatherMockup from './components/practices/basic/과제 1/WeatherMockup.vue'
import GradeMockup from './components/practices/basic/과제 1/GradeMockup.vue'
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
</style>
