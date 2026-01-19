<template>
  <div class="welcome-card">
    <div class="welcome-icon">🌿</div>
    <h2>健康小助手</h2>
    <p>你好！我是你的健康小助手</p>
    <p class="subtitle">我可以帮你解答健康问题、提供养生建议</p>
    <button class="start-btn" @click="$emit('start')">
      开始咨询
    </button>
  </div>
</template>

<script setup>
defineEmits(['start'])
</script>

<style scoped>
.welcome-card {
  text-align: center;
  padding: 40px 20px;
}

.welcome-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

h2 {
  color: var(--dark-blue);
  margin-bottom: 12px;
  font-size: 24px;
}

.subtitle {
  color: var(--gray-600);
  margin-bottom: 24px;
}

.start-btn {
  background: var(--primary-blue);
  color: var(--white);
  border: none;
  padding: 14px 32px;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.start-btn:hover {
  background: var(--dark-blue);
  transform: scale(1.05);
}
</style>
