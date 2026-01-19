<template>
  <van-popup
    v-model:show="show"
    position="left"
    :style="{ width: '80%', height: '100%', maxWidth: '360px' }"
    class="flex flex-col bg-gray-50"
  >
    <div class="p-4 border-b border-gray-100 bg-white flex justify-between items-center sticky top-0 z-10">
      <h2 class="text-lg font-bold text-gray-800">历史记录</h2>
      <van-icon name="cross" class="text-gray-400 p-2" @click="show = false" />
    </div>

    <div class="p-4 space-y-3 flex-1 overflow-y-auto">
      <button 
        @click="handleSaveCurrent" 
        class="w-full bg-white p-4 rounded-xl shadow-sm border border-blue-100 flex items-center justify-between group active:scale-[0.98] transition-all"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <van-icon name="down" size="20" />
          </div>
          <div class="text-left">
            <div class="font-medium text-gray-800">保存当前对话</div>
            <div class="text-xs text-gray-500">保存到服务器</div>
          </div>
        </div>
        <van-icon name="arrow" class="text-gray-300" />
      </button>

      <div class="h-px bg-gray-200 my-4"></div>
      
      <div v-if="loading" class="flex justify-center py-6">
        <van-loading type="spinner" color="#1989fa" />
      </div>

      <div v-else-if="historyList.length === 0" class="text-center py-10 text-gray-400">
        <van-icon name="newspaper-o" size="48" class="mb-2 opacity-50" />
        <p class="text-sm">暂无历史记录</p>
      </div>

      <div v-else class="space-y-3">
        <div 
          v-for="item in historyList" 
          :key="item.filename"
          @click="handleLoadHistory(item.filename)"
          class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm active:bg-gray-50 active:scale-[0.99] transition-all cursor-pointer"
        >
          <div class="flex justify-between items-start mb-1">
            <span class="text-xs text-gray-400">{{ formatDate(item.timestamp) }}</span>
            <van-tag type="primary" plain size="mini">JSON</van-tag>
          </div>
          <p class="text-sm text-gray-700 line-clamp-2 leading-relaxed">
            {{ item.summary || '无预览内容' }}
          </p>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { computed } from 'vue'
import { showToast, showSuccessToast, showFailToast } from 'vant'

const props = defineProps({
  modelValue: Boolean,
  loading: Boolean,
  historyList: Array
})

const emit = defineEmits(['update:modelValue', 'save', 'load'])

const show = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString('zh-CN', {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })
}

const handleSaveCurrent = () => {
    emit('save')
}

const handleLoadHistory = (filename) => {
    emit('load', filename)
    show.value = false
}
</script>
