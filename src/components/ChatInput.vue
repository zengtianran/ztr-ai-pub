<template>
  <div class="input-area">
    <div class="input-wrapper">
      <textarea
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @keydown.enter.exact.prevent="$emit('send')"
        v-bind="$attrs"
        rows="1"
        ref="inputRef"
      ></textarea>
    </div>
    <button 
      class="send-btn" 
      @click="$emit('send')"
      :disabled="!modelValue.trim() || disabled"
    >
      发送
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue', 'send'])

const inputRef = ref(null)

function focus() {
  nextTick(() => {
    inputRef.value?.focus()
  })
}

defineExpose({ focus })
</script>
