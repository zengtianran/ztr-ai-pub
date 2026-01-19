<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- Top Header -->
    <div class="bg-white px-4 py-3 flex items-center gap-2">
      <div class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
        <van-icon name="plus" />
      </div>
      <h1 class="text-lg font-bold text-gray-800">某某医院智慧医院</h1>
    </div>

    <!-- Patient Card -->
    <div class="px-4 mt-2">
      <div class="bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl p-5 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
        <!-- Decorator -->
        <div class="absolute right-[-20px] top-[-20px] w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        
        <div class="relative z-10 flex justify-between items-start">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xl font-bold">陈晓文</span>
              <span class="text-sm opacity-90 font-mono">350524199909090099</span>
              <van-icon name="eye-o" class="opacity-80" />
            </div>
            <div class="mt-4">
              <button class="bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm px-3 py-1 rounded-full text-xs flex items-center gap-1">
                <van-icon name="exchange" />
                切换就诊人
              </button>
            </div>
          </div>
          <div class="flex flex-col items-center gap-1">
            <div class="bg-white/90 p-1.5 rounded-lg">
              <van-icon name="qr" size="40" class="text-gray-800" />
            </div>
            <span class="text-[10px] opacity-90">医保电子凭证</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Medical Services -->
    <div class="px-4 mt-4">
      <div class="bg-white rounded-xl p-4 shadow-sm">
        <h2 class="text-base font-bold text-gray-800 mb-4 px-2">医疗服务</h2>
        <van-grid :column-num="4" :border="false" class="custom-grid">
          <van-grid-item v-for="item in medicalServices" :key="item.text">
            <div class="flex flex-col items-center gap-2 mb-2">
              <div :class="`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`">
                <van-icon :name="item.icon" size="24" :class="item.color" />
              </div>
              <span class="text-xs text-gray-600">{{ item.text }}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>

    <!-- Health Services -->
    <div class="px-4 mt-4">
      <div class="bg-white rounded-xl p-4 shadow-sm">
        <h2 class="text-base font-bold text-gray-800 mb-4 px-2">健康服务</h2>
        <van-grid :column-num="4" :border="false">
          <van-grid-item v-for="item in healthServices" :key="item.text">
            <div class="flex flex-col items-center gap-2 mb-2">
              <div :class="`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center border border-gray-100`">
                <van-icon :name="item.icon" size="24" :class="item.color" />
              </div>
              <span class="text-xs text-gray-600">{{ item.text }}</span>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>

    <!-- Health Tools -->
    <div class="px-4 mt-4">
      <h2 class="text-base font-bold text-gray-800 mb-2 px-2">健康工具</h2>
      <div class="bg-white rounded-xl overflow-hidden shadow-sm">
        <div class="p-4 flex items-center justify-between border-b border-gray-50 active:bg-gray-50 transition-colors">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <van-icon name="hotel-o" size="24" class="text-blue-500" />
            </div>
            <div>
              <div class="font-bold text-gray-800">乙肝五项自测</div>
              <div class="text-xs text-gray-400 mt-0.5">预估自评测</div>
            </div>
          </div>
          <van-icon name="arrow" class="text-gray-300" />
        </div>
        
        <div class="p-4 flex items-center justify-between active:bg-gray-50 transition-colors">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
              <van-icon name="like-o" size="24" class="text-red-400" />
            </div>
            <div>
              <div class="font-bold text-gray-800">预产期预测</div>
              <div class="text-xs text-gray-400 mt-0.5">好孕帮手 期待宝宝来临</div>
            </div>
          </div>
          <van-icon name="arrow" class="text-gray-300" />
        </div>

        <div class="p-4 flex items-center justify-between active:bg-gray-50 transition-colors cursor-pointer" @click="$router.push('/exam')">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
              <van-icon name="todo-list-o" size="24" class="text-green-500" />
            </div>
            <div>
              <div class="font-bold text-gray-800">劳动知识刷题</div>
              <div class="text-xs text-gray-400 mt-0.5">随时练习 巩固知识</div>
            </div>
          </div>
          <van-icon name="arrow" class="text-gray-300" />
        </div>

        <div class="p-3 text-center border-t border-gray-50">
          <span class="text-sm text-blue-500 flex items-center justify-center gap-1">
            更多工具 <van-icon name="arrow" class="text-xs" />
          </span>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 flex justify-around items-center px-2 py-3 safe-area-bottom z-50">
      <div class="flex flex-col items-center gap-1">
        <van-icon name="wap-home" size="24" class="text-blue-600" />
        <span class="text-[10px] text-blue-600 font-medium">首页</span>
      </div>
      <div class="flex flex-col items-center gap-1">
        <van-icon name="shop-o" size="24" class="text-gray-400" />
        <span class="text-[10px] text-gray-400">互联网医院</span>
      </div>
      <div class="flex flex-col items-center gap-1" @click="$router.push('/chat')">
        <van-icon name="chat-o" size="24" class="text-gray-400" />
        <span class="text-[10px] text-gray-400">消息提醒</span>
      </div>
      <div class="flex flex-col items-center gap-1" @click="$router.push('/user')">
        <van-icon name="manager-o" size="24" class="text-gray-400" />
        <span class="text-[10px] text-gray-400">个人中心</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const medicalServices = [
  { text: '预约挂号', icon: 'notes-o', color: 'text-blue-500', bg: 'bg-blue-50' },
  { text: '门诊结算', icon: 'card', color: 'text-blue-500', bg: 'bg-blue-50' },
  { text: '报告查询', icon: 'search', color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { text: '门诊充值', icon: 'balance-pay', color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { text: '充值记录', icon: 'todo-list-o', color: 'text-blue-500', bg: 'bg-blue-50' },
  { text: '病历复印', icon: 'printer', color: 'text-orange-500', bg: 'bg-orange-50' },
  { text: '电子发票', icon: 'coupon-o', color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { text: '更多服务', icon: 'apps-o', color: 'text-blue-500', bg: 'bg-blue-50' },
]

const healthServices = [
  { text: '医院介绍', icon: 'hotel-o', color: 'text-blue-500', bg: 'bg-white' },
  { text: '科室介绍', icon: 'cluster-o', color: 'text-blue-500', bg: 'bg-white' },
  { text: '医生介绍', icon: 'friends-o', color: 'text-blue-500', bg: 'bg-white' },
  { text: '院内导航', icon: 'location-o', color: 'text-blue-500', bg: 'bg-white' },
]
</script>

<style scoped>
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom, 20px);
}
:deep(.van-grid-item__content) {
  padding: 0 !important;
  background: transparent !important;
}
</style>
