<template>
  <header class="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10 px-4 py-3 flex justify-between items-center border-b border-gray-100">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-lg">
        <van-icon name="comment" size="18" />
      </div>
      <h1 class="text-lg font-bold text-gray-800">健康小助手</h1>
    </div>
    
    <div class="flex items-center gap-3">
      <button 
        @click="$emit('toggle-history')" 
        class="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
        title="历史记录"
      >
        <van-icon name="todo-list-o" size="20" />
      </button>
      
      <button 
        @click="$emit('reset')" 
        class="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
        title="重新开始"
      >
        <van-icon name="replay" size="20" />
      </button>
    </div>
  </header>
</template>

<script setup>
defineEmits(['reset', 'toggle-history'])
</script>
