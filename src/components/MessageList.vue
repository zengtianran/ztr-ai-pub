<template>
  <div class="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth" ref="messagesContainer">
    <div 
      v-for="(msg, index) in messages" 
      :key="index"
      :class="['flex w-full', msg.role === 'user' ? 'justify-end' : 'justify-start']"
    >
      <!-- Assistant Avatar -->
      <div v-if="msg.role !== 'user'" class="flex-shrink-0 mr-3">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white shadow-md">
          <van-icon name="manager" size="20" />
        </div>
      </div>

      <!-- Message Bubble -->
      <div 
        :class="[
          'max-w-[80%] rounded-2xl px-5 py-3 shadow-sm text-sm leading-relaxed',
          msg.role === 'user' 
            ? 'bg-primary text-white rounded-br-none' 
            : 'bg-white text-gray-700 rounded-bl-none border border-gray-100'
        ]"
      >
        <div v-if="msg.type === 'loading'" class="flex space-x-1 items-center h-6">
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0s"></div>
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
        </div>
        <div v-else class="whitespace-pre-wrap">{{ msg.content }}</div>
      </div>

      <!-- User Avatar -->
      <div v-if="msg.role === 'user'" class="flex-shrink-0 ml-3">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white shadow-md">
          <van-icon name="user-o" size="20" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  messages: {
    type: Array,
    required: true
  }
})

const messagesContainer = ref(null)

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

watch(() => props.messages.length, () => {
  scrollToBottom()
}, { flush: 'post' })

defineExpose({ scrollToBottom })
</script>
