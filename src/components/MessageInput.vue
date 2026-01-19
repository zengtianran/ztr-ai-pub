<template>
  <div class="bg-white/90 backdrop-blur-sm border-t border-gray-100 p-4 pb-6 safe-area-bottom">
    <div class="max-w-4xl mx-auto flex items-end gap-3 bg-gray-50 p-2 rounded-3xl border border-gray-200 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition-all shadow-sm">
      <textarea
        v-model="inputContent"
        @keydown.enter.exact.prevent="handleSend"
        placeholder="输入您的健康问题..."
        rows="1"
        class="flex-1 bg-transparent border-none outline-none resize-none px-4 py-3 min-h-[48px] max-h-[120px] text-gray-700 placeholder-gray-400"
        ref="textareaRef"
        @input="autoResize"
      ></textarea>
      
      <button 
        @click="handleSend"
        :disabled="!inputContent.trim() || disabled"
        :class="[
          'p-3 rounded-full flex items-center justify-center transition-all duration-200',
          !inputContent.trim() || disabled
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-primary text-white shadow-md hover:bg-blue-600 active:scale-95'
        ]"
      >
        <van-icon name="guide-o" size="20" class="transform rotate-90" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  disabled: Boolean
})

const emit = defineEmits(['send'])
const inputContent = ref('')
const textareaRef = ref(null)

const autoResize = () => {
  const el = textareaRef.value
  if (el) {
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }
}

const handleSend = () => {
  const content = inputContent.value.trim()
  if (!content || props.disabled) return
  
  emit('send', content)
  inputContent.value = ''
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto'
    }
  })
}
</script>

<style scoped>
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom, 24px);
}
</style>
