import React, { useState } from 'react'
import { Lightbulb, Copy, Check, Search, ChevronRight, Sparkles, Code2, PenTool, BarChart3, MessageSquare, CreativeCommonsSa, Zap, RefreshCw } from 'lucide-react'

const categories = [
  { name: '全部', icon: Sparkles, color: 'text-white' },
  { name: '写作助手', icon: PenTool, color: 'text-pink-400' },
  { name: '编程开发', icon: Code2, color: 'text-emerald-400' },
  { name: '数据分析', icon: BarChart3, color: 'text-blue-400' },
  { name: '对话沟通', icon: MessageSquare, color: 'text-amber-400' },
  { name: '创意创作', icon: CreativeCommonsSa, color: 'text-purple-400' },
]

const templates = [
  {
    name: '精确写作',
    category: '写作助手',
    desc: '让AI以特定风格、语气和结构完成写作任务',
    prompt: '请以[风格]的风格，写一篇关于[主题]的[文体类型]。要求：\n1. 目标读者：[读者群体]\n2. 主要观点：[3个核心要点]\n3. 字数要求：约[字数]\n4. 结尾呼吁：[行动号召]\n\n请确保语言流畅、逻辑清晰、数据可靠。',
    color: 'from-pink-500 to-rose-600',
  },
  {
    name: '代码审查',
    category: '编程开发',
    desc: '全面分析代码，找出bug、性能问题和改进建议',
    prompt: '请审查以下代码，重点关注：\n1. 潜在bug和安全漏洞\n2. 性能优化空间\n3. 代码可读性和可维护性\n4. 是否有更好的实现方式\n\n代码语言：[语言类型]\n代码：\n```\n[粘贴代码]\n```\n\n请给出详细的问题分析和建议。',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: '数据分析报告',
    category: '数据分析',
    desc: '根据数据生成专业的分析报告和洞察',
    prompt: '请分析以下数据，生成一份专业的分析报告：\n\n数据集：\n[描述数据内容、字段、样本]\n\n分析要求：\n1. 描述性统计：均值、中位数、分布情况\n2. 趋势分析：时间序列或分类维度的变化\n3. 关联分析：变量之间的相关关系\n4. 异常检测：识别异常值\n5. 结论和建议：基于分析的业务建议\n\n请用清晰的格式呈现，并附上数据可视化建议。',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    name: '对话角色扮演',
    category: '对话沟通',
    desc: '设定角色性格和背景，进行沉浸式对话',
    prompt: '请扮演[角色名称]，具备以下特点：\n- 性格：[性格描述]\n- 背景：[背景故事]\n- 专业领域：[擅长领域]\n- 沟通风格：[语言风格]\n\n请始终保持角色身份回应。如果信息不足以回答，请说明并提供合理的角色化建议。\n\n开始对话：[输入问题或场景]',
    color: 'from-amber-500 to-orange-600',
  },
  {
    name: '头脑风暴',
    category: '创意创作',
    desc: '激发创意，产生大量新颖的想法和方案',
    prompt: '请围绕[主题/问题]进行头脑风暴：\n\n目标：[要达成的结果]\n约束条件：[时间、成本、技术等限制]\n期望数量：至少[数量]个想法\n\n请分三个阶段：\n1. 发散阶段：天马行空，不设限制，产生尽可能多的想法\n2. 收敛阶段：评估每个想法的可行性和创新性\n3. 精选阶段：选出[数量]个最有价值的想法，详细阐述\n\n鼓励大胆创意，不要害怕极端想法！',
    color: 'from-purple-500 to-violet-600',
  },
  {
    name: '学习计划',
    category: '写作助手',
    desc: '根据目标和时间，定制个性化学习路径',
    prompt: '请为以下学习目标制定详细计划：\n\n学习主题：[想学的内容]\n当前水平：[现有基础]\n目标水平：[达到的目标]\n可用时间：每天[时长]，持续[周期]\n\n请提供：\n1. 学习路线图：分阶段的学习内容\n2. 每日/每周计划：具体的学习任务\n3. 资源推荐：书籍、课程、网站、工具\n4. 里程碑：关键检查点和自测方式\n5. 技巧建议：高效学习的具体方法',
    color: 'from-cyan-500 to-sky-600',
  },
  {
    name: '周报生成',
    category: '写作助手',
    desc: '总结一周工作，自动生成规范的周报',
    prompt: '请根据以下工作内容，生成规范的周报：\n\n本周完成：\n1. [任务1] - [结果/产出]\n2. [任务2] - [结果/产出]\n3. [任务3] - [结果/产出]\n\n本周数据：\n- [关键指标1]\n- [关键指标2]\n\n下周计划：\n1. [计划任务]\n2. [计划任务]\n\n问题与建议：\n[遇到的问题或需要的支持]\n\n请用专业但简洁的语言，量化成果，突出价值。',
    color: 'from-teal-500 to-green-600',
  },
  {
    name: '技术方案评审',
    category: '编程开发',
    desc: '评估技术方案的优劣，提供改进建议',
    prompt: '请评审以下技术方案，从多维度提供专业意见：\n\n方案名称：[名称]\n技术栈：[使用的技术]\n核心架构：[架构描述]\n\n评审维度：\n1. 可行性：技术是否成熟，团队能否驾驭\n2. 扩展性：未来功能扩展是否容易\n3. 性能：能否满足性能要求\n4. 安全：有哪些安全风险\n5. 成本：开发和维护成本评估\n6. 替代方案：是否有更好的选择\n\n请给出综合评分和具体改进建议。',
    color: 'from-green-500 to-emerald-600',
  },
]

export default function App() {
  const [category, setCategory] = useState('全部')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [copied, setCopied] = useState(false)
  const [customPrompt, setCustomPrompt] = useState('')

  const filtered = templates.filter(t =>
    (category === '全部' || t.category === category) &&
    (t.name.includes(search) || t.desc.includes(search) || t.prompt.includes(search))
  )

  const copyPrompt = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const randomTemplate = () => {
    const random = templates[Math.floor(Math.random() * templates.length)]
    setSelected(random)
    setCustomPrompt(random.prompt)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-gray-900/60 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-bold">AI 提示词工坊</h1>
                <p className="text-xs text-white/40">{templates.length} 个精选提示词模板</p>
              </div>
            </div>
            <button onClick={randomTemplate} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-sm transition-all">
              <RefreshCw className="w-4 h-4 text-yellow-400" />
              随机一个
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            用好提示词，AI 效率翻倍
          </h2>
          <p className="text-white/50 text-sm">精选高质量提示词模板，一键复制使用</p>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <input
            type="text"
            placeholder="搜索模板..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 outline-none focus:border-yellow-500/50 transition-all text-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setCategory(cat.name)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
                category === cat.name
                  ? 'bg-white text-gray-900 font-medium'
                  : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              <cat.icon className={`w-3.5 h-3.5 ${cat.color}`} />
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Template list */}
          <div>
            <div className="text-xs text-white/30 mb-3 uppercase tracking-wider">
              {category} · {filtered.length} 个模板
            </div>
            <div className="space-y-3">
              {filtered.map((t, i) => (
                <button
                  key={i}
                  onClick={() => { setSelected(t); setCustomPrompt(t.prompt) }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selected === t
                      ? 'bg-white/8 border-yellow-500/30'
                      : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${t.color} flex items-center justify-center`}>
                        <Lightbulb className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-sm">{t.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20" />
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{t.desc}</p>
                  <span className="inline-block mt-2 text-xs bg-white/10 text-white/50 px-2 py-0.5 rounded-full">{t.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div>
            <div className="text-xs text-white/30 mb-3 uppercase tracking-wider">
              {selected ? '提示词编辑器' : '选择一个模板开始'}
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              {selected && (
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${selected.color} flex items-center justify-center`}>
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{selected.name}</div>
                      <div className="text-xs text-white/40">{selected.desc}</div>
                    </div>
                  </div>
                </div>
              )}
              <textarea
                value={customPrompt}
                onChange={e => setCustomPrompt(e.target.value)}
                placeholder="选择一个模板，或在这里直接编写你的提示词..."
                className="w-full h-80 p-4 bg-transparent resize-none outline-none text-sm leading-relaxed placeholder-white/20"
              />
              <div className="flex items-center justify-between p-4 border-t border-white/10">
                <span className="text-xs text-white/30">{customPrompt.length} 字符</span>
                <button
                  onClick={() => copyPrompt(customPrompt)}
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium px-5 py-2 rounded-xl text-sm transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? '已复制' : '复制提示词'}
                </button>
              </div>
            </div>

            {/* Tips */}
            {selected && (
              <div className="mt-4 p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-amber-400">使用技巧</span>
                </div>
                <p className="text-xs text-white/50 leading-relaxed">
                  将方括号 [内容] 替换为你的具体需求，可以让提示词更精准。不同AI工具（ChatGPT/Claude/Gemini）对同一提示词的效果可能有差异，建议根据实际情况微调。
                </p>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-12 text-center text-xs text-white/20">
          <p>AI 提示词工坊 · 持续更新中</p>
        </footer>
      </div>
    </div>
  )
}
