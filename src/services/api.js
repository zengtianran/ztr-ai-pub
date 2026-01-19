import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API Error:', error)
    throw new Error(error.response?.data?.error || '网络错误，请重试')
  }
)

export default {
  async sendMessage(message) {
    return apiClient.post('/chat', { message })
  },

  async resetChat() {
    return apiClient.post('/chat/reset')
  },

  async checkHealth() {
    return apiClient.get('/health')
  },

  async saveHistory(messages) {
    return apiClient.post('/chat/save', { messages })
  },

  async getHistoryList() {
    return apiClient.get('/chat/history')
  },

  async getHistoryItem(filename) {
    return apiClient.get(`/chat/history/${filename}`)
  }
}
