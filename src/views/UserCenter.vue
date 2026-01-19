<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- Header Area -->
    <div class="bg-gradient-to-b from-blue-50 to-white px-6 pt-12 pb-6">
      <!-- Top Bar -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold text-gray-900">个人中心</h1>
        <div class="bg-white/80 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-2 border border-gray-200">
          <van-icon name="ellipsis" size="20" class="text-gray-600" />
          <div class="w-px h-4 bg-gray-300"></div>
          <van-icon name="circle" size="18" class="text-gray-600" />
        </div>
      </div>

      <!-- Login Card -->
      <div class="flex justify-between items-center" @click="$router.push('/login')">
        <div class="space-y-1">
          <h2 class="text-2xl font-bold text-gray-900">立即登录</h2>
          <div class="flex items-center text-gray-500 text-sm">
            <span>登录使用更多服务</span>
            <van-icon name="arrow" class="ml-1 text-xs" />
          </div>
        </div>
        <div class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white">
          <van-icon name="manager" size="32" class="text-blue-300" />
        </div>
      </div>
    </div>

    <!-- Quick Actions Grid -->
    <div class="px-6 -mt-2">
      <div class="bg-white rounded-2xl p-6 shadow-sm flex justify-between items-center">
        <div class="flex flex-col items-center gap-2">
          <div class="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
            <van-icon name="orders-o" size="24" class="text-emerald-500" />
          </div>
          <span class="text-sm text-gray-600">预约记录</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
             <van-icon name="balance-o" size="24" class="text-orange-500" />
          </div>
          <span class="text-sm text-gray-600">充值记录</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
             <van-icon name="records-o" size="24" class="text-primary" />
          </div>
          <span class="text-sm text-gray-600">就诊记录</span>
        </div>
      </div>
    </div>

    <!-- Menu List -->
    <div class="mt-8 px-6">
      <h3 class="text-lg font-bold text-gray-900 mb-4">更多服务</h3>
      <div class="bg-white rounded-2xl overflow-hidden shadow-sm">
        <div class="divide-y divide-gray-50">
          <div class="flex items-center justify-between p-4 active:bg-gray-50 transition-colors">
            <div class="flex items-center gap-3">
              <van-icon name="idcard" size="20" class="text-gray-400" />
              <span class="font-medium text-gray-700">就诊人管理</span>
            </div>
            <van-icon name="arrow" class="text-gray-300 text-sm" />
          </div>
          
          <div class="flex items-center justify-between p-4 active:bg-gray-50 transition-colors">
            <div class="flex items-center gap-3">
              <van-icon name="notes-o" size="20" class="text-gray-400" />
              <span class="font-medium text-gray-700">问诊订单</span>
            </div>
            <van-icon name="arrow" class="text-gray-300 text-sm" />
          </div>
          
          <div class="flex items-center justify-between p-4 active:bg-gray-50 transition-colors">
            <div class="flex items-center gap-3">
              <van-icon name="description-o" size="20" class="text-gray-400" />
              <span class="font-medium text-gray-700">用户协议</span>
            </div>
            <van-icon name="arrow" class="text-gray-300 text-sm" />
          </div>
          
          <div class="flex items-center justify-between p-4 active:bg-gray-50 transition-colors">
            <div class="flex items-center gap-3">
              <van-icon name="envelop-o" size="20" class="text-gray-400" />
              <span class="font-medium text-gray-700">意见反馈</span>
            </div>
            <van-icon name="arrow" class="text-gray-300 text-sm" />
          </div>
          
          <div class="flex items-center justify-between p-4 active:bg-gray-50 transition-colors">
            <div class="flex items-center gap-3">
              <van-icon name="setting-o" size="20" class="text-gray-400" />
              <span class="font-medium text-gray-700">设置</span>
            </div>
            <van-icon name="arrow" class="text-gray-300 text-sm" />
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 flex justify-around items-center px-2 py-3 safe-area-bottom">
      <div class="flex flex-col items-center gap-1" @click="$router.push('/')">
        <van-icon name="wap-home-o" size="24" class="text-gray-400" />
        <span class="text-[10px] text-gray-400">首页</span>
      </div>
      <div class="flex flex-col items-center gap-1">
        <van-icon name="shop-o" size="24" class="text-gray-400" />
        <span class="text-[10px] text-gray-400">互联网医院</span>
      </div>
      <div class="flex flex-col items-center gap-1">
        <van-icon name="chat-o" size="24" class="text-gray-400" />
        <span class="text-[10px] text-gray-400">消息提醒</span>
      </div>
      <div class="flex flex-col items-center gap-1">
        <div class="relative">
          <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-sm">
            <van-icon name="manager" size="18" />
          </div>
        </div>
        <span class="text-[10px] text-primary font-medium">个人中心</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped>
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom, 20px);
}
</style>
