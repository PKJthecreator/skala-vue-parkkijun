<template>
  <div class="practice-section">
    <h2>ℹ️ 서비스 소개</h2>

    <div class="about-card">
      <p>본 앱은 Vue 3 및 Vue Router 4 기반 제작된 실습용 기상 관측 대시보드 시스템입니다.</p>
      <ul>
        <li><code>components/exercise/</code> 폴더 내부의 독립 부품 컴포넌트 연동</li>
        <li>클라이언트 사이드 라우팅을 통한 새로고침 없는 화면 전환</li>
        <li>동적 경로 매칭(<code>/weather/:cityId</code>)을 활용한 상세 페이지 조회</li>
        <li>지연 로딩(Lazy Loading)과 Catch-all Route(404 처리) 적용</li>
      </ul>
    </div>

    <RouterLink to="/" class="home-btn">대시보드 홈으로 이동</RouterLink>
  </div>
</template>

<style scoped>
.about-card {
  background-color: #fff;
  border: 1px solid #dbe3f0;
  border-radius: 10px;
  padding: 16px 18px;
  margin: 16px 0;
  line-height: 1.6;
}

.about-card ul {
  margin: 10px 0 0;
  padding-left: 20px;
}

.home-btn {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background-color: #0984e3;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}

.home-btn:hover {
  background-color: #0768b8;
}
</style>
