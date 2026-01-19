import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api.js'

export const useChatStore = defineStore('chat', () => {
  const messages = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const hasStarted = ref(false)

  const welcomeMessage = {
    role: 'assistant',
    content: '你好！我是你的健康小助手 🌿\n\n我可以帮你解答健康问题、提供养生建议。\n\n请问你今天感觉怎么样？有什么健康方面的困扰吗？',
    type: 'welcome'
  }

  function initializeChat() {
    if (!hasStarted.value) {
      messages.value = [welcomeMessage]
      hasStarted.value = true
    }
  }

  async function sendMessage(content) {
    if (!content.trim() || isLoading.value) return

    messages.value.push({
      role: 'user',
      content: content.trim(),
      type: 'user'
    })

    isLoading.value = true
    error.value = null

    try {
      const result = await api.sendMessage(content)
      
      messages.value.push({
        role: 'assistant',
        content: result.response,
        type: 'assistant'
      })
    } catch (err) {
      error.value = err.message || '发送失败，请重试'
      messages.value.push({
        role: 'assistant',
        content: '抱歉，我现在有点忙。请稍后再试，或者重新发送你的问题。',
        type: 'error'
      })
    } finally {
      isLoading.value = false
    }
  }

  function resetChat() {
    messages.value = []
    hasStarted.value = false
    error.value = null
    initializeChat()
  }

  return {
    messages,
    isLoading,
    error,
    hasStarted,
    initializeChat,
    sendMessage,
    resetChat,
    
    // History actions
    saveHistory: async () => {
      try {
        if (messages.value.length === 0) return
        await api.saveHistory(messages.value)
        return true
      } catch (err) {
        throw new Error('保存失败: ' + err.message)
      }
    },
    
    fetchHistoryList: async () => {
      try {
        return await api.getHistoryList()
      } catch (err) {
        throw new Error('获取历史列表失败')
      }
    },
    
    loadHistory: async (filename) => {
      try {
        isLoading.value = true
        const historyMessages = await api.getHistoryItem(filename)
        messages.value = historyMessages
      } catch (err) {
        throw new Error('加载历史失败')
      } finally {
        isLoading.value = false
      }
    }
  }
})
