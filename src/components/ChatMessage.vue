<template>
  <div :class="['message', role, type]">
    <div class="message-avatar">
      <span>{{ role === 'user' ? '你' : '助手' }}</span>
    </div>
    <div class="message-content">{{ content }}</div>
  </div>
</template>

<script setup>
defineProps({
  role: {
    type: String,
    required: true,
    validator: (value) => ['user', 'assistant'].includes(value)
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'normal'
  }
})
</script>
