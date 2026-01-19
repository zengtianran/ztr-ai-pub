<template>
  <div class="min-h-screen flex flex-col bg-white">
    <!-- Header Section with Blue Gradient and Curves -->
    <div class="relative bg-gradient-to-br from-[#4A90FF] to-[#3186FF] h-[35vh] overflow-hidden flex flex-col justify-center px-8 pb-10">
      <!-- Decorator Circles -->
      <div class="absolute top-[-20%] right-[-10%] w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
      <div class="absolute bottom-[10%] left-[-10%] w-40 h-40 rounded-full bg-white/10 blur-2xl"></div>
      
      <!-- Text Content -->
      <div class="relative z-10 text-white space-y-2 mb-8 animate-fade-in-up">
        <h1 class="text-4xl font-bold tracking-wide">你好，</h1>
        <p class="text-blue-100 text-lg font-medium opacity-90">莆田附属第一医院，欢迎你</p>
      </div>
    </div>

    <!-- Main Content Card -->
    <div class="flex-1 bg-white relative -mt-8 rounded-t-[32px] px-8 pt-12 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div class="space-y-8">
        <!-- Input Group -->
        <div class="space-y-6">
          <!-- Phone Input -->
          <div class="border-b border-gray-100 py-2">
            <van-field
              v-model="phone"
              placeholder="请输入手机号"
              :border="false"
              class="!p-0 bg-transparent items-center"
            >
              <template #left-icon>
                <div class="mr-2 text-gray-400">
                  <van-icon name="phone-o" size="22" />
                </div>
              </template>
            </van-field>
          </div>

          <!-- Code Input -->
          <div class="border-b border-gray-100 py-2">
            <van-field
              v-model="code"
              placeholder="请输入验证码"
              :border="false"
              class="!p-0 bg-transparent items-center"
            >
              <template #left-icon>
                <div class="mr-2 text-gray-400">
                  <van-icon name="shield-o" size="22" />
                </div>
              </template>
              <template #button>
                <span class="text-primary font-medium bg-blue-50 px-3 py-1 rounded text-sm">6688</span>
              </template>
            </van-field>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="pt-4">
          <van-button 
            block 
            color="#3186FF" 
            class="!h-12 !rounded-lg !text-lg !font-medium shadow-lg shadow-blue-500/30"
            @click="handleLogin"
            :loading="loading"
          >
            获取验证码
          </van-button>
        </div>

        <!-- Agreement -->
        <div class="flex items-start justify-center text-xs text-gray-400 gap-2">
          <div 
            class="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center mt-0.5 cursor-pointer transition-colors"
            :class="{ 'bg-primary border-primary': agreed }"
            @click="agreed = !agreed"
          >
            <van-icon name="success" color="white" size="10" v-if="agreed" />
          </div>
          <p class="leading-relaxed">
            已阅读并同意
            <span class="text-primary cursor-pointer">《用户服务协议》</span>
            及
            <span class="text-primary cursor-pointer">《用户隐私协议》</span>
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div class="absolute bottom-8 left-0 w-full text-center text-gray-300 text-sm">
        没有账号，登录即注册
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()
const phone = ref('')
const code = ref('')
const agreed = ref(false)
const loading = ref(false)

const handleLogin = () => {
  if (!phone.value) {
    showToast('请输入手机号')
    return
  }
  if (!code.value) {
    showToast('请输入验证码')
    return
  }
  if (!agreed.value) {
    showToast('请同意服务协议')
    return
  }

  loading.value = true
  setTimeout(() => {
    loading.value = false
    showToast({
      type: 'success',
      message: '登录成功',
      onClose: () => {
        router.push('/')
      }
    })
  }, 1000)
}
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Customize Vant Field to match design */
:deep(.van-field__control) {
  font-size: 16px;
  color: #333;
}

:deep(.van-field__control::placeholder) {
  color: #c8c9cc;
}
</style>
