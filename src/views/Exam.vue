<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- 题库选择页面 -->
    <div v-if="currentStage === 'select'" class="p-4 space-y-4">
      <h1 class="text-xl font-bold text-gray-800 mb-6">选择题库</h1>

      <!-- 题库列表 -->
      <div
        v-for="examSet in examSets"
        :key="examSet.id"
        @click="selectExamSet(examSet.id)"
        class="bg-white rounded-xl p-4 shadow-sm cursor-pointer transition-all hover:shadow-md"
        :class="{ 'ring-2 ring-blue-500 bg-blue-50': selectedExamSet === examSet.id }"
      >
        <div class="flex justify-between items-center">
          <div class="flex-1">
            <h3 class="font-bold text-gray-800">{{ examSet.name }}</h3>
            <p class="text-sm text-gray-500 mt-1">
              共 {{ examSet.totalQuestions }} 题
              <span v-if="examSet.multipleChoiceQuestions">（含 {{ examSet.multipleChoiceQuestions }} 道多选）</span>
            </p>
          </div>
          <van-icon :name="selectedExamSet === examSet.id ? 'checked' : 'arrow'"
            :class="selectedExamSet === examSet.id ? 'text-blue-500' : 'text-gray-300'" />
        </div>
      </div>

      <!-- 配置选项 -->
      <div class="bg-white rounded-xl p-4 shadow-sm">
        <div class="mb-4">
          <label class="text-sm font-medium text-gray-700 block mb-2">题目数量</label>
          <van-radio-group v-model="config.questionCount" direction="horizontal">
            <van-radio :name="5" class="mr-4">5题</van-radio>
            <van-radio :name="10" class="mr-4">10题</van-radio>
            <van-radio :name="15" class="mr-4">15题</van-radio>
            <van-radio :name="20">20题</van-radio>
          </van-radio-group>
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700 block mb-2">答题模式</label>
          <van-radio-group v-model="config.mode" direction="horizontal">
            <van-radio name="practice" class="mr-4">练习模式</van-radio>
            <van-radio name="exam">考试模式</van-radio>
          </van-radio-group>
        </div>
      </div>

      <!-- 开始按钮 -->
      <button
        @click="startExam"
        :disabled="!selectedExamSet"
        class="w-full py-3 bg-blue-500 text-white rounded-full font-bold disabled:bg-gray-300 disabled:cursor-not-allowed active:scale-95 transition-transform"
      >
        开始答题
      </button>
    </div>

    <!-- 答题页面 -->
    <div v-else-if="currentStage === 'quiz'" class="p-4 space-y-4">
      <!-- 顶部进度 -->
      <div class="bg-white rounded-xl p-4 shadow-sm">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm text-gray-600">
            第 {{ currentIndex + 1 }}/{{ questions.length }} 题
            <span v-if="isMultipleChoice" class="text-orange-500 ml-1">（多选）</span>
          </span>
          <span class="text-sm text-blue-500">已答 {{ answeredCount }}/{{ questions.length }}</span>
        </div>
        <van-progress
          :percentage="Math.round((answeredCount / questions.length) * 100)"
          color="#3186FF"
          stroke-width="6"
        />
      </div>

      <!-- 题目卡片 -->
      <div class="bg-white rounded-xl p-4 shadow-sm">
        <h2 class="text-lg font-bold text-gray-800 mb-4">
          {{ currentQuestion.question }}
        </h2>

        <!-- 练习模式显示答案解析 -->
        <div v-if="config.mode === 'practice' && hasAnswered" class="mb-4 p-3 rounded-lg"
          :class="isCurrentAnswerCorrect ? 'bg-green-50' : 'bg-red-50'">
          <p class="text-sm font-medium"
            :class="isCurrentAnswerCorrect ? 'text-green-600' : 'text-red-600'">
            {{ isCurrentAnswerCorrect ? '✓ 回答正确' : '✗ 回答错误' }}
          </p>
          <p v-if="!isCurrentAnswerCorrect" class="text-sm text-gray-600 mt-1">
            正确答案：{{ formatAnswer(currentQuestion.answer) }}
          </p>
          <p v-if="currentQuestion.explanation" class="text-sm text-gray-500 mt-2">
            {{ currentQuestion.explanation }}
          </p>
        </div>

        <!-- 单选题 -->
        <van-radio-group v-if="!isMultipleChoice" v-model="singleAnswer" class="space-y-3">
          <van-radio
            v-for="option in currentQuestion.options"
            :key="option.key"
            :name="option.key"
            class="w-full p-3 rounded-lg border border-gray-200 transition-all"
            :class="getOptionClass(option.key)"
          >
            <span class="font-medium">{{ option.key }}.</span> {{ option.text }}
          </van-radio>
        </van-radio-group>

        <!-- 多选题 -->
        <van-checkbox-group v-else v-model="multipleAnswer" class="space-y-3">
          <van-checkbox
            v-for="option in currentQuestion.options"
            :key="option.key"
            :name="option.key"
            class="w-full p-3 rounded-lg border border-gray-200 transition-all"
            :class="getOptionClass(option.key)"
          >
            <span class="font-medium">{{ option.key }}.</span> {{ option.text }}
          </van-checkbox>
        </van-checkbox-group>
      </div>

      <!-- 操作按钮 -->
      <div class="flex gap-3">
        <button
          @click="previousQuestion"
          :disabled="currentIndex === 0"
          class="flex-1 py-3 bg-white border border-gray-200 rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all"
        >
          上一题
        </button>
        <button
          @click="nextQuestion"
          class="flex-1 py-3 bg-blue-500 text-white rounded-full font-bold active:scale-95 transition-all"
        >
          {{ currentIndex === questions.length - 1 ? '提交' : '下一题' }}
        </button>
      </div>

      <!-- 答题卡按钮 -->
      <button
        @click="showAnswerSheet = true"
        class="w-full py-3 bg-white border border-gray-200 rounded-full text-gray-700 font-medium active:scale-95 transition-all"
      >
        查看答题卡
      </button>
    </div>

    <!-- 结果页面 -->
    <div v-else-if="currentStage === 'result'" class="p-4 space-y-4">
      <h1 class="text-xl font-bold text-gray-800 mb-6">答题结果</h1>

      <!-- 成绩卡片 -->
      <div class="bg-gradient-to-br from-blue-500 to-blue-400 rounded-xl p-6 text-white">
        <div class="text-center">
          <div class="text-5xl font-bold mb-2">{{ result.score }}</div>
          <div class="text-sm opacity-90">总分</div>
        </div>

        <div class="grid grid-cols-3 gap-4 mt-6">
          <div class="text-center">
            <div class="text-2xl font-bold">{{ result.correct }}</div>
            <div class="text-xs opacity-90">正确</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold">{{ result.wrong }}</div>
            <div class="text-xs opacity-90">错误</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold">{{ Math.floor(result.duration / 60) }}</div>
            <div class="text-xs opacity-90">用时(分)</div>
          </div>
        </div>
      </div>

      <!-- 错题回顾 -->
      <div v-if="wrongQuestions.length > 0" class="bg-white rounded-xl p-4 shadow-sm">
        <h3 class="font-bold text-gray-800 mb-3">错题回顾</h3>
        <div class="space-y-3">
          <div
            v-for="item in wrongQuestions"
            :key="item.question.id"
            class="p-3 bg-red-50 rounded-lg border border-red-200"
          >
            <p class="text-sm font-medium text-gray-800 mb-2">
              {{ item.question.question }}
              <span v-if="item.question.type === 'multiple'" class="text-orange-500 text-xs ml-1">（多选）</span>
            </p>
            <div class="text-xs text-gray-600 space-y-1">
              <p><span class="font-medium">您的答案：</span>{{ formatUserAnswer(item.userAnswer) }}</p>
              <p><span class="font-medium text-green-600">正确答案：</span>{{ formatAnswer(item.question.answer) }}</p>
              <p v-if="item.question.explanation" class="text-gray-500">{{ item.question.explanation }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex gap-3">
        <button
          @click="restartExam"
          class="flex-1 py-3 bg-blue-500 text-white rounded-full font-bold active:scale-95 transition-all"
        >
          再来一次
        </button>
        <button
          @click="backToSelect"
          class="flex-1 py-3 bg-white border border-gray-200 rounded-full text-gray-700 font-bold active:scale-95 transition-all"
        >
          选择题库
        </button>
      </div>
    </div>

    <!-- 答题卡弹窗 -->
    <van-popup
      v-model:show="showAnswerSheet"
      position="bottom"
      :style="{ height: '60%' }"
      round
    >
      <div class="p-4 h-full flex flex-col">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold text-gray-800">答题卡</h3>
          <van-icon name="cross" size="20" class="text-gray-400 cursor-pointer" @click="showAnswerSheet = false" />
        </div>
        <div class="flex-1 overflow-auto">
          <div class="grid grid-cols-5 gap-2">
            <button
              v-for="(q, index) in questions"
              :key="q.id"
              @click="jumpToQuestion(index)"
              class="aspect-square rounded-full text-sm font-medium transition-all relative"
              :class="getAnswerSheetClass(q, index)"
            >
              {{ index + 1 }}
              <span v-if="q.type === 'multiple'" class="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full text-[8px] text-white flex items-center justify-center">多</span>
            </button>
          </div>
        </div>
      </div>
    </van-popup>

    <!-- 底部导航 -->
    <div class="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 flex justify-around items-center px-2 py-3 safe-area-bottom z-50">
      <div class="flex flex-col items-center gap-1 cursor-pointer" @click="$router.push('/')">
        <van-icon name="wap-home-o" size="24" :class="currentStage === 'select' ? 'text-gray-400' : 'text-gray-400'" />
        <span class="text-[10px] text-gray-400">首页</span>
      </div>
      <div class="flex flex-col items-center gap-1">
        <van-icon name="shop-o" size="24" class="text-gray-400" />
        <span class="text-[10px] text-gray-400">互联网医院</span>
      </div>
      <div class="flex flex-col items-center gap-1">
        <van-icon name="todo-list-o" size="24" class="text-blue-600" />
        <span class="text-[10px] text-blue-600 font-medium">刷题</span>
      </div>
      <div class="flex flex-col items-center gap-1 cursor-pointer" @click="$router.push('/user')">
        <van-icon name="manager-o" size="24" class="text-gray-400" />
        <span class="text-[10px] text-gray-400">个人中心</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast, showConfirmDialog } from 'vant'
import examQuestions from '../data/exam-questions.json'

const route = useRoute()
const router = useRouter()

// 状态管理
const currentStage = ref('select') // 'select' | 'quiz' | 'result'
const selectedExamSet = ref(null)
const config = ref({
  questionCount: 10,
  mode: 'practice'
})
const currentIndex = ref(0)
const questions = ref([])
const userAnswers = ref(new Map())
const result = ref(null)
const startTime = ref(null)
const showAnswerSheet = ref(false)

// 临时存储当前题目的答案
const singleAnswer = ref('')
const multipleAnswer = ref([])

// 计算属性
const examSets = computed(() => examQuestions.examSets)
const currentQuestion = computed(() => questions.value[currentIndex.value])

// 判断是否是多选题
const isMultipleChoice = computed(() => {
  return currentQuestion.value?.type === 'multiple'
})

// 判断当前题目是否已作答
const hasAnswered = computed(() => {
  const q = currentQuestion.value
  if (!q) return false
  const answer = userAnswers.value.get(q.id)
  if (isMultipleChoice.value) {
    return answer && answer.length > 0
  }
  return answer !== undefined && answer !== ''
})

// 已答题数量
const answeredCount = computed(() => {
  let count = 0
  questions.value.forEach(q => {
    const answer = userAnswers.value.get(q.id)
    if (q.type === 'multiple') {
      if (answer && answer.length > 0) count++
    } else {
      if (answer !== undefined && answer !== '') count++
    }
  })
  return count
})

// 判断当前答案是否正确
const isCurrentAnswerCorrect = computed(() => {
  const q = currentQuestion.value
  if (!q) return false
  const userAnswer = userAnswers.value.get(q.id)

  if (q.type === 'multiple') {
    if (!userAnswer || userAnswer.length === 0) return false
    // 多选题：必须完全匹配才正确
    const sortedUser = [...userAnswer].sort().join('')
    const sortedCorrect = [...q.answer].sort().join('')
    return sortedUser === sortedCorrect
  } else {
    return userAnswer === q.answer
  }
})

// 错题列表
const wrongQuestions = computed(() => {
  if (!result.value) return []
  return questions.value.map(q => {
    const userAnswer = userAnswers.value.get(q.id)
    let isCorrect = false

    if (q.type === 'multiple') {
      if (userAnswer && userAnswer.length > 0) {
        const sortedUser = [...userAnswer].sort().join('')
        const sortedCorrect = [...q.answer].sort().join('')
        isCorrect = sortedUser === sortedCorrect
      }
    } else {
      isCorrect = userAnswer === q.answer
    }

    return {
      question: q,
      userAnswer: userAnswer,
      isCorrect
    }
  }).filter(item => !item.isCorrect)
})

// 监听题目变化，更新临时答案
watch([currentIndex, questions], () => {
  const q = currentQuestion.value
  if (!q) return

  const answer = userAnswers.value.get(q.id)

  if (q.type === 'multiple') {
    multipleAnswer.value = answer || []
    singleAnswer.value = ''
  } else {
    singleAnswer.value = answer || ''
    multipleAnswer.value = []
  }
}, { immediate: true })

// 监听单选答案变化
watch(singleAnswer, (newVal) => {
  const q = currentQuestion.value
  if (q && q.type !== 'multiple') {
    userAnswers.value.set(q.id, newVal)
  }
})

// 监听多选答案变化
watch(multipleAnswer, (newVal) => {
  const q = currentQuestion.value
  if (q && q.type === 'multiple') {
    userAnswers.value.set(q.id, [...newVal])
  }
})

// 格式化答案显示
function formatAnswer(answer) {
  if (!answer) return ''
  return answer.split('').join('、')
}

// 格式化用户答案显示
function formatUserAnswer(answer) {
  if (!answer) return '未作答'
  if (Array.isArray(answer)) {
    return answer.length > 0 ? answer.join('、') : '未作答'
  }
  return answer
}

// 获取选项样式类
function getOptionClass(optionKey) {
  if (config.value.mode !== 'practice' || !hasAnswered.value) {
    return ''
  }

  const q = currentQuestion.value
  const isCorrectOption = q.answer.includes(optionKey)
  const userAnswer = userAnswers.value.get(q.id)
  const isSelected = q.type === 'multiple'
    ? (userAnswer && userAnswer.includes(optionKey))
    : userAnswer === optionKey

  if (isCorrectOption) {
    return 'border-green-500 bg-green-50'
  } else if (isSelected) {
    return 'border-red-500 bg-red-50'
  }
  return ''
}

// 获取答题卡样式类
function getAnswerSheetClass(q, index) {
  const answer = userAnswers.value.get(q.id)
  const hasAnswer = q.type === 'multiple'
    ? (answer && answer.length > 0)
    : (answer !== undefined && answer !== '')

  const classes = []

  if (hasAnswer) {
    classes.push('bg-blue-500', 'text-white')
  } else {
    classes.push('bg-gray-200', 'text-gray-600')
  }

  if (currentIndex.value === index) {
    classes.push('ring-2', 'ring-offset-2', 'ring-blue-500')
  }

  return classes.join(' ')
}

// 方法
function selectExamSet(examSetId) {
  selectedExamSet.value = examSetId
}

function startExam() {
  const examSet = examSets.value.find(set => set.id === selectedExamSet.value)
  if (!examSet) {
    showToast('请选择题库')
    return
  }

  if (examSet.totalQuestions === 0) {
    showToast('该题库暂无题目')
    return
  }

  // 随机抽题
  const shuffled = [...examSet.questions].sort(() => Math.random() - 0.5)
  const count = Math.min(config.value.questionCount, shuffled.length)
  questions.value = shuffled.slice(0, count)

  // 为没有 type 字段的题目设置默认值
  questions.value.forEach(q => {
    if (!q.type) {
      q.type = 'single'
    }
  })

  // 初始化状态
  currentIndex.value = 0
  userAnswers.value = new Map()
  singleAnswer.value = ''
  multipleAnswer.value = []
  startTime.value = Date.now()
  currentStage.value = 'quiz'
}

function previousQuestion() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

function nextQuestion() {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++
  } else {
    // 提交试卷
    submitExam()
  }
}

function jumpToQuestion(index) {
  currentIndex.value = index
  showAnswerSheet.value = false
}

function submitExam() {
  const answered = answeredCount.value
  const total = questions.value.length

  if (answered < total) {
    showConfirmDialog({
      title: '提示',
      message: `还有 ${total - answered} 题未答，确定提交吗？`,
    }).then(() => {
      calculateResult()
    }).catch(() => {
      // 取消提交
    })
  } else {
    showConfirmDialog({
      title: '提示',
      message: '确定提交试卷吗？',
    }).then(() => {
      calculateResult()
    }).catch(() => {
      // 取消提交
    })
  }
}

function calculateResult() {
  let correct = 0
  questions.value.forEach(q => {
    const userAnswer = userAnswers.value.get(q.id)

    if (q.type === 'multiple') {
      if (userAnswer && userAnswer.length > 0) {
        const sortedUser = [...userAnswer].sort().join('')
        const sortedCorrect = [...q.answer].sort().join('')
        if (sortedUser === sortedCorrect) {
          correct++
        }
      }
    } else {
      if (userAnswer === q.answer) {
        correct++
      }
    }
  })

  result.value = {
    total: questions.value.length,
    correct,
    wrong: questions.value.length - correct,
    score: Math.round((correct / questions.value.length) * 100),
    duration: Math.floor((Date.now() - startTime.value) / 1000)
  }

  currentStage.value = 'result'
}

function restartExam() {
  startExam()
}

function backToSelect() {
  currentStage.value = 'select'
  selectedExamSet.value = null
  questions.value = []
  userAnswers.value = new Map()
  singleAnswer.value = ''
  multipleAnswer.value = []
  result.value = null
}

onMounted(() => {
  // 可以从路由参数获取题库ID
  if (route.query.examSet) {
    selectedExamSet.value = route.query.examSet
  }
})
</script>

<style scoped>
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom, 20px);
}

:deep(.van-radio) {
  align-items: flex-start;
  padding: 12px;
  margin-bottom: 8px;
}

:deep(.van-radio__label) {
  margin-left: 8px;
  line-height: 1.5;
}

:deep(.van-checkbox) {
  align-items: flex-start;
  padding: 12px;
  margin-bottom: 8px;
}

:deep(.van-checkbox__label) {
  margin-left: 8px;
  line-height: 1.5;
}
</style>
