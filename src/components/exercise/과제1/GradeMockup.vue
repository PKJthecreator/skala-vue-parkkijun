<script setup>
import { ref } from 'vue'

const courseList = ref([
  { id: 'course_01', name: 'Vue.js 프론트엔드', score: 95 },
  { id: 'course_02', name: '자료구조', score: 82 },
  { id: 'course_03', name: '데이터베이스', score: 74 },
  { id: 'course_04', name: '네트워크', score: 58 },
])

// 검색창: WeatherMockup과 동일하게 v-model 대신 :value + @input 방식 사용
const searchCourse = ref('')

// 카드 클릭 → 선택된 과목 표시 (WeatherMockup의 selectedCity 패턴 응용)
const selectedCourse = ref('')

// 학점 구간별 뱃지/막대 색상 클래스 (VueBindClass.vue의 :class 배열 바인딩 응용)
const gradeClass = (score) => {
  if (score >= 90) return 'grade-a'
  if (score >= 80) return 'grade-b'
  if (score >= 70) return 'grade-c'
  return 'grade-f'
}

// [상세보기] 버튼 → 버블링 차단 + alert (EventModifier.vue의 @click.stop 패턴 응용)
const showDetail = (course) => {
  window.alert(`${course.name}의 점수는 ${course.score}점 입니다.`)
}
</script>

<template>
  <div class="practice-section">
    <div class="mockup-panel">
      <h2 class="panel-title"><span>🎓</span> 성적표 (Mockup)</h2>

      <div class="search-box">
        <label class="search-label">🔍 과목 검색</label>
        <input
          type="text"
          :value="searchCourse"
          @input="searchCourse = $event.target.value"
          placeholder="검색할 과목 이름 입력"
        />
        <p class="search-hint">검색 중인 과목: {{ searchCourse || '전체' }}</p>
      </div>

      <h3 class="section-title">📚 수강 과목 성적 현황</h3>
      <div class="course-cards">
        <div
          v-for="course in courseList.filter((c) => c.name.includes(searchCourse))"
          :key="course.id"
          class="course-card"
          @click="selectedCourse = course.name"
        >
          <div class="course-info">
            <p class="course-name">{{ course.name }}</p>
            <p class="course-score">점수: {{ course.score }}점</p>

            <span class="grade-badge" :class="gradeClass(course.score)">
              <span v-if="course.score >= 90">A 학점</span>
              <span v-else-if="course.score >= 80">B 학점</span>
              <span v-else-if="course.score >= 70">C 학점</span>
              <span v-else>F 학점</span>
            </span>

            <div class="score-bar-track">
              <div
                class="score-bar-fill"
                :class="gradeClass(course.score)"
                :style="{ width: course.score + '%' }"
              ></div>
            </div>
          </div>

          <button class="detail-btn" @click.stop="showDetail(course)">상세보기</button>
        </div>
      </div>

      <div class="status-bar">
        {{ selectedCourse ? `${selectedCourse}이 선택되었습니다.` : '과목 카드를 클릭하거나 검색해 보세요.' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.mockup-panel {
  background-color: #f3f0fb;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
}

.panel-title {
  margin: 0 0 16px;
  font-size: 1.15rem;
}

.search-box {
  background-color: #fff;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 18px;
}

.search-label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #4a3f78;
}

.search-box input {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 10px;
  border: 1px solid #ccd0dd;
  border-radius: 6px;
  font-size: 0.95rem;
}

.search-hint {
  margin: 8px 0 0;
  font-size: 0.85rem;
  color: #8a8a8a;
}

.section-title {
  margin: 0 0 10px;
  color: #4a3f78;
}

.course-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.course-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fff;
  border: 1px solid #e3e1ef;
  border-radius: 10px;
  padding: 14px 16px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.2s ease;
}

.course-card:hover {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
}

.course-info {
  flex: 1;
}

.course-name {
  margin: 0 0 4px;
  font-weight: 700;
  font-size: 1.02rem;
}

.course-score {
  margin: 0 0 8px;
  color: #6b6b6b;
  font-size: 0.88rem;
}

.grade-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.grade-badge.grade-a {
  background-color: #eafbea;
  color: #1e8e3e;
}
.grade-badge.grade-b {
  background-color: #e8f0fe;
  color: #1a73e8;
}
.grade-badge.grade-c {
  background-color: #fff6e0;
  color: #b26a00;
}
.grade-badge.grade-f {
  background-color: #fdecea;
  color: #d93025;
}

.score-bar-track {
  width: 160px;
  max-width: 100%;
  height: 6px;
  border-radius: 3px;
  background-color: #eceff5;
  overflow: hidden;
}

.score-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.score-bar-fill.grade-a {
  background-color: #34a853;
}
.score-bar-fill.grade-b {
  background-color: #1a73e8;
}
.score-bar-fill.grade-c {
  background-color: #f9a825;
}
.score-bar-fill.grade-f {
  background-color: #ea4335;
}

.detail-btn {
  flex-shrink: 0;
  margin-left: 12px;
  padding: 6px 12px;
  border: 1px solid #ccd0dd;
  border-radius: 6px;
  background-color: #fff;
  cursor: pointer;
  font-size: 0.85rem;
}

.detail-btn:hover {
  background-color: #f5f4fa;
}

.status-bar {
  margin-top: 14px;
  padding: 10px 14px;
  background-color: #eef2fd;
  color: #3b4faa;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
}
</style>
