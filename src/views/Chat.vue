<template>
  <div class="h-screen w-full flex flex-col bg-gray-50 overflow-hidden">
    <ChatHeader 
      @reset="handleReset"
      @toggle-history="openHistory"
    />

    <MessageList 
      ref="msgListRef"
      :messages="chatStore.messages" 
    />

    <!-- Input area wrapper with padding for bottom nav -->
    <div class="pb-[60px]">
      <MessageInput 
        :disabled="chatStore.isLoading"
        @send="handleSend" 
      />
    </div>

    <!-- Bottom Navigation -->
    <div class="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 flex justify-around items-center px-2 py-3 safe-area-bottom z-50">
      <div class="flex flex-col items-center gap-1" @click="$router.push('/')">
        <van-icon name="wap-home-o" size="24" class="text-gray-400" />
        <span class="text-[10px] text-gray-400">首页</span>
      </div>
      <div class="flex flex-col items-center gap-1">
        <van-icon name="shop-o" size="24" class="text-gray-400" />
        <span class="text-[10px] text-gray-400">互联网医院</span>
      </div>
      <div class="flex flex-col items-center gap-1">
        <van-icon name="chat" size="24" class="text-blue-600" />
        <span class="text-[10px] text-blue-600 font-medium">消息提醒</span>
      </div>
      <div class="flex flex-col items-center gap-1" @click="$router.push('/user')">
        <van-icon name="manager-o" size="24" class="text-gray-400" />
        <span class="text-[10px] text-gray-400">个人中心</span>
      </div>
    </div>

    <HistoryDrawer
      v-model="showHistory"
      :loading="historyLoading"
      :history-list="historyList"
      @save="handleSave"
      @load="handleLoad"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useChatStore } from '../stores/chat.js'
import { showConfirmDialog, showSuccessToast, showFailToast } from 'vant'

import ChatHeader from '../components/ChatHeader.vue'
import MessageList from '../components/MessageList.vue'
import MessageInput from '../components/MessageInput.vue'
import HistoryDrawer from '../components/HistoryDrawer.vue'

const chatStore = useChatStore()
const msgListRef = ref(null)
const showHistory = ref(false)
const historyLoading = ref(false)
const historyList = ref([])

function handleSend(content) {
  chatStore.sendMessage(content)
}

function handleReset() {
  showConfirmDialog({
    title: '重新开始',
    message: '确定要清空当前对话吗？这不会影响已保存的历史记录。',
  })
    .then(() => {
      chatStore.resetChat()
    })
    .catch(() => {
      // on cancel
    })
}

async function openHistory() {
  showHistory.value = true
  historyLoading.value = true
  try {
    historyList.value = await chatStore.fetchHistoryList()
  } catch (error) {
    showFailToast(error.message)
  } finally {
    historyLoading.value = false
  }
}

async function handleSave() {
  try {
    await chatStore.saveHistory()
    showSuccessToast('保存成功')
    // Refresh list
    historyList.value = await chatStore.fetchHistoryList()
  } catch (error) {
    showFailToast(error.message)
  }
}

async function handleLoad(filename) {
  try {
    await chatStore.loadHistory(filename)
    showSuccessToast('加载成功')
  } catch (error) {
    showFailToast(error.message)
  }
}

onMounted(() => {
  chatStore.initializeChat()
})
</script>

<style scoped>
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom, 20px);
}
</style>
