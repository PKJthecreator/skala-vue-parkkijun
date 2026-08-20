<template>
  <div class="practice-section not-found">
    <p class="emoji">🌤️❓</p>
    <h2>페이지를 찾을 수 없습니다.</h2>
    <p>요청하신 주소가 존재하지 않거나, 아직 개발되지 않았습니다.</p>
    <RouterLink to="/" class="home-btn">날씨 메인으로 이동</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 40px 20px;
}

.emoji {
  font-size: 2.5rem;
  margin: 0 0 8px;
}

.home-btn {
  display: inline-block;
  margin-top: 16px;
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
