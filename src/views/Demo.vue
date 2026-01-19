<template>
  <div class="min-h-screen bg-gray-50 p-4 space-y-8">
    <h1 class="text-xl font-bold text-gray-800 mb-6">业务流程演示</h1>

    <!-- Blue Flow -->
    <div class="flex items-stretch h-12 w-full filter drop-shadow-sm">
      <div 
        v-for="(item, index) in flow1" 
        :key="index"
        class="relative flex-1"
        :style="{ 
          marginLeft: index === 0 ? '0' : '-10px', 
          zIndex: flow1.length - index 
        }"
      >
        <!-- Border/Container -->
        <div 
          class="absolute inset-0"
          :class="[
            item.active ? 'bg-blue-400' : 'bg-transparent'
          ]"
          :style="{ clipPath: getClipPath(index, flow1.length) }"
        ></div>
        
        <!-- Content -->
        <div 
          class="absolute inset-[1px] flex items-center justify-center gap-2"
          :class="[
            item.active ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-500'
          ]"
          :style="{ clipPath: getClipPath(index, flow1.length) }"
        >
          <div v-if="item.active" class="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
          <span class="text-sm font-medium">{{ item.label }}</span>
          <span class="text-sm" :class="item.active ? 'font-bold' : ''">{{ item.count }}</span>
          <span class="text-xs scale-90">件</span>
        </div>
      </div>
    </div>

    <!-- Red Flow -->
    <div class="flex items-stretch h-12 w-full filter drop-shadow-sm">
      <div 
        v-for="(item, index) in flow2" 
        :key="index"
        class="relative flex-1"
        :style="{ 
          marginLeft: index === 0 ? '0' : '-10px', 
          zIndex: flow2.length - index 
        }"
      >
        <!-- Border -->
        <div 
          class="absolute inset-0"
          :class="[
            item.error ? 'bg-red-400' : 'bg-transparent'
          ]"
          :style="{ clipPath: getClipPath(index, flow2.length) }"
        ></div>
        
        <!-- Content -->
        <div 
          class="absolute inset-[1px] flex items-center justify-center gap-2"
          :class="[
            item.error ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-500'
          ]"
          :style="{ clipPath: getClipPath(index, flow2.length) }"
        >
          <div v-if="item.error" class="w-1.5 h-1.5 rounded-full bg-red-500"></div>
          <span class="text-xs font-medium truncate max-w-[8em]">{{ item.label }}</span>
          <span class="text-sm" :class="item.error ? 'font-bold' : ''">{{ item.count }}</span>
          <span class="text-xs scale-90">件</span>
        </div>
      </div>
    </div>

    <!-- Orange Flow -->
    <div class="flex items-stretch h-12 w-full filter drop-shadow-sm">
      <div class="flex-1 relative z-10">
         <!-- Content (Placeholder for long empty space) -->
         <div class="h-full bg-white clip-arrow-start flex items-center justify-center text-gray-400">
           已结案 <span class="text-gray-800 font-bold mx-1">20</span> 件
         </div>
      </div>
      
      <!-- Last Item -->
      <div class="flex-[2] relative -ml-4 z-0">
          <div 
            class="absolute inset-0 bg-orange-400"
            style="clip-path: polygon(20px 0%, 100% 0%, 100% 100%, 20px 100%, 0% 50%)"
          ></div>
          <div 
            class="absolute inset-[1px] bg-orange-50 text-orange-600 flex items-center justify-center gap-2"
            style="clip-path: polygon(20px 0%, 100% 0%, 100% 100%, 20px 100%, 0% 50%)"
          >
            <div class="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
            <span class="text-sm font-medium">未结案</span>
            <span class="text-lg font-bold">10</span>
            <span class="text-xs">件</span>
          </div>
      </div>
    </div>

    <!-- Custom Back Button -->
    <div class="mt-12 text-center">
      <button @click="$router.push('/')" class="px-6 py-2 bg-white border border-gray-200 rounded-full text-gray-600 text-sm shadow-sm hover:bg-gray-50 transition-colors">
        返回首页
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const flow1 = ref([
  { label: '待响应', count: 20, active: true },
  { label: '待处理', count: 10, active: false },
  { label: '及时处理', count: 10, active: false },
  { label: '超期处理', count: 10, active: false },
])

const flow2 = ref([
  { label: '品质主管审核数量', count: 20, error: false },
  { label: '排查和初步分析数量', count: 10, error: true },
  { label: '根因分析和对策', count: 10, error: false },
  { label: '标准化', count: 10, error: false },
  { label: '对策有效性闭环确认', count: 10, error: false },
])

const ARROW_SIZE = 15 // px

// Generate polygon string
// box width is 100%, height is 100%
// Arrow protrudes to right, notch recedes on left
const getClipPath = (index, total) => {
  // First item: Flat left, Arrow right
  if (index === 0) {
    return `polygon(
      0% 0%, 
      calc(100% - ${ARROW_SIZE}px) 0%, 
      100% 50%, 
      calc(100% - ${ARROW_SIZE}px) 100%, 
      0% 100%
    )`
  }
  
  // Last item: Notch left, Arrow right (or flat if desired, keeping arrow for consistency as per image structure typically flows)
  // Actually image row 1 last item looks like it has an arrow tip.
  return `polygon(
    0% 0%, 
    calc(100% - ${ARROW_SIZE}px) 0%, 
    100% 50%, 
    calc(100% - ${ARROW_SIZE}px) 100%, 
    0% 100%, 
    ${ARROW_SIZE}px 50%
  )`
}
</script>

<style scoped>
.clip-arrow-start {
  clip-path: polygon(
    0% 0%, 
    calc(100% - 15px) 0%, 
    100% 50%, 
    calc(100% - 15px) 100%, 
    0% 100%
  );
}
</style>
