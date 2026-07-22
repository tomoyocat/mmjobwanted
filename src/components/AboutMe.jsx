import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// 统一动效配置
const easeIOS = [0.4, 0, 0.2, 1]

const pageVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeIOS },
  },
}

// 占位人物照片，后续可替换
const PROFILE_PHOTO =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop'

// 核心能力数据
const coreCapabilities = [
  {
    id: 'version',
    title: '版本架构',
    description:
      '主导年度精灵IP主线与周年庆版本包装，制定长线内容节奏，驱动持续增长。',
  },
  {
    id: 'gameplay',
    title: '玩法与内容策划',
    description:
      '具备从0到1设计玩法的完整能力，包括规则框架搭建、平衡性调优及玩法叙事包装。同时独立负责活动文案产出，能够完成从世界观设定到具体叙事的文案闭环。',
  },
  {
    id: 'resource',
    title: '资源投放与统筹',
    description:
      '依据各节点活跃目标制定奖励投放策略与内容排期。统筹场景、音效等美术音频全流程制作，擅长将玩法需求转化为可执行的美术制作清单，确保品质与排期可控。',
  },
]

/* 2026.07 更新：工作履历内的两个子项目（S级在前、副玩法在后） */
const workProjects = [
  {
    id: 's-tier-events',
    title: 'S级节点与运营活动（2020-2025年）',
    content:
      '负责春节、周年庆、国庆等战略级节点的完整包装设计与落地执行，涵盖主题叙事、资源投放策略与玩法框架设定。',
    outcome:
      '活跃稳步增长、衍生出多元话题、为项目营收和IP打造提供助力。',
    showMetrics: true,
  },
  {
    id: 'side-gameplay',
    title: '副玩法研发（2026年）',
    content:
      '在主玩法战斗设计瓶颈导致活跃持续下滑，用户反馈集中于"内容单一、缺乏新鲜感"的大背景下，主导副玩法的玩法设计和系统搭建，5个月内推动首测上线。玩法设计上不强制与主玩法养成绑定，为不同需求的用户提供独立体验空间。',
    outcome:
      '上线后参与率占活跃用户10%，7日留存达30%。用户画像分析显示，核心受众为高氪减负玩家与回流用户，与主玩法用户重合度低，成功开辟增量价值路径，为活跃回暖提供了新的增长点并为后续多元副玩法模式打下基础。',
  },
]

// 增长数据表格
const growthMetrics = [
  { label: 'DAU', from: '10', fromUnit: '万', to: '20', toUnit: '万' },
  { label: 'ACU', from: '6,000', fromUnit: '', to: '30,000', toUnit: '' },
  { label: 'PCU', from: '1', fromUnit: '万', to: '6', toUnit: '万' },
  { label: '月流水', from: '800', fromUnit: '万', to: '2000', toUnit: '万' },
]

const SELF_POSITIONING =
  '兼具策划思维与落地能力的复合型游戏从业者。既能独立完成玩法框架设计与文案包装，也能将需求精准拆解为美术、音频、程序可执行的方案并推进交付。具备商业化设计经验，对数值、付费节奏与资源投放有实操积累。相信好的设计不止于创意，更在于精准判断什么值得做，以及高效推动落地。'

/** 增长数据表格（紧凑版 + 交替行底色 + 数字淡入） */
function MetricsTable() {
  return (
    <div className="mt-4 overflow-hidden rounded-xl bg-white p-3 shadow-sm sm:p-4">
      <div className="grid grid-cols-3 gap-2 border-b border-gray-100 pb-2">
        <span className="text-xs font-medium text-gray-500">指标</span>
        <span className="text-xs font-medium text-gray-500">2020年度</span>
        <span className="text-xs font-medium text-gray-500">2025年度</span>
      </div>

      {growthMetrics.map((row, index) => (
        <motion.div
          key={row.label}
          className={`grid grid-cols-3 items-center gap-2 py-2.5 ${
            index < growthMetrics.length - 1 ? 'border-b border-gray-100' : ''
          } ${
            /* 装饰元素：偶数行极淡背景 */
            index % 2 === 1 ? 'bg-gray-50/50' : ''
          }`}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: index * 0.06, ease: easeIOS }}
        >
          <span className="text-xs font-medium text-gray-500">{row.label}</span>
          <div>
            <span className="text-lg font-light text-gray-900 sm:text-xl">
              {row.from}
            </span>
            {row.fromUnit && (
              <span className="ml-0.5 text-xs text-gray-400">{row.fromUnit}</span>
            )}
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-light text-gray-900 sm:text-xl">
              {row.to}
            </span>
            {row.toUnit && (
              <span className="ml-0.5 text-xs text-gray-400">{row.toUnit}</span>
            )}
            <span className="ml-1 text-xs text-emerald-500" aria-hidden="true">
              ↗
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/**
 * 手风琴折叠项
 * - open：当前是否展开
 * - onToggle：点击标题切换
 */
function AccordionItem({ label, summary, open, onToggle, children }) {
  return (
    <div
      className={`mb-3 overflow-hidden rounded-xl border border-gray-100 bg-white transition-colors ${
        /* 装饰元素：展开时左侧暖橙边框 */
        open ? 'border-l-2 border-l-amber-400' : 'border-l border-l-gray-100'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-gray-50/50"
        aria-expanded={open}
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="w-24 shrink-0 text-xs uppercase tracking-widest text-gray-400">
            {label}
          </span>
          <span className="truncate text-sm text-gray-600">{summary}</span>
        </div>
        <motion.span
          className="shrink-0 text-lg text-gray-400"
          animate={{ rotate: open ? 45 : 0, scale: open ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: 'easeInOut' },
              opacity: { duration: 0.2, ease: 'easeInOut' },
            }}
            className="overflow-hidden"
          >
            <div className="relative border-t border-gray-50 px-5 pb-4 pt-2">
              {/* 装饰元素：展开内容顶部柔和渐变遮罩 */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-0 h-3 bg-gradient-to-b from-white to-transparent"
                aria-hidden="true"
              />
              <div className="relative z-10 pl-4 text-sm leading-relaxed text-gray-600 sm:pl-6">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** 核心能力独立小抽屉（不受手风琴限制） */
function CapabilityDrawer({ item, open, onToggle }) {
  return (
    <div
      className={`mb-2 overflow-hidden rounded-xl border border-gray-100 bg-white transition-colors ${
        /* 装饰元素：展开时左侧暖橙边框 */
        open ? 'border-l-2 border-l-amber-400' : 'border-l border-l-gray-100'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors hover:bg-gray-50/50"
        aria-expanded={open}
      >
        <h3 className="text-base font-medium text-gray-900">{item.title}</h3>
        <motion.span
          className="shrink-0 text-lg text-gray-400"
          animate={{ rotate: open ? 45 : 0, scale: open ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="cap-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: 'easeInOut' },
              opacity: { duration: 0.2, ease: 'easeInOut' },
            }}
            className="overflow-hidden"
          >
            <div className="relative px-5 pb-4">
              {/* 装饰元素：展开内容顶部柔和渐变遮罩 */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-0 h-3 bg-gradient-to-b from-white to-transparent"
                aria-hidden="true"
              />
              <p className="relative z-10 border-l-2 border-gray-200 pl-4 text-sm leading-relaxed text-gray-600">
                {item.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function AboutMe() {
  /* 2026.07 更新：工作履历默认展开，面试官优先浏览 */
  const [openSection, setOpenSection] = useState('work')

  // 核心能力：三条全部默认展开
  const [openCapabilities, setOpenCapabilities] = useState(() =>
    coreCapabilities.map(() => true),
  )

  const toggleSection = (key) => {
    setOpenSection((prev) => (prev === key ? null : key))
  }

  const toggleCapability = (index) => {
    setOpenCapabilities((prev) =>
      prev.map((open, i) => (i === index ? !open : open)),
    )
  }

  return (
    <div className="relative">
      {/* 背景层 */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <img
          src={PROFILE_PHOTO}
          alt=""
          className="h-full w-full scale-110 object-cover opacity-30 blur-2xl"
        />
        <div className="absolute inset-0 bg-white/70" />
        {/* 装饰元素：网格纹理 + 右上光晕 */}
        <div className="content-grid-bg absolute inset-0" />
        <div className="content-glow-bg absolute inset-0" />
      </div>

      <section className="relative z-10 mx-auto max-w-[720px] px-6 pb-16 pt-4 md:px-10 sm:pb-20 sm:pt-6">
        <motion.div
          variants={pageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {/* 标题区：始终可见 */}
          <motion.header variants={sectionVariants}>
            <div className="flex items-center gap-3">
              {/* 装饰元素：名字左侧暖橙竖线 */}
              <span
                className="h-5 w-1 shrink-0 rounded-full bg-amber-400/60"
                aria-hidden="true"
              />
              <h1 className="text-4xl font-light tracking-wide text-gray-900 sm:text-5xl">
                曹茂鑫
              </h1>
            </div>
            <p className="mt-3 text-base font-light text-gray-500 sm:text-lg">
              6年+游戏策划经验 | 玩法设计 / 内容策划 / 资源统筹
            </p>
            <div className="mb-8 mt-8 border-b border-gray-200" />
          </motion.header>

          {/* 2026.07 更新：个人经历 — 教育背景 */}
          <motion.div variants={sectionVariants}>
            <AccordionItem
              label="教育背景"
              summary="东华大学 · 卓越软件工程 本科 · 2015.09 - 2019.06"
              open={openSection === 'education'}
              onToggle={() => toggleSection('education')}
            >
              {/* 2026.07 更新：统一列表样式，去掉 ACM 特殊徽章 */}
              <ul className="list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-gray-600">
                <li>校ACM程序设计竞赛银奖</li>
                <li>CET-6（563分）</li>
                <li>校学习优秀奖学金</li>
              </ul>
            </AccordionItem>
          </motion.div>

          {/* 2026.07 更新：个人经历 — 工作履历（默认展开，内含两个子项目） */}
          <motion.div variants={sectionVariants}>
            <AccordionItem
              label="工作履历"
              summary="上海淘米网络科技有限公司 · 赛尔号项目组 · 2019.07 - 2026.05 · 活动策划"
              open={openSection === 'work'}
              onToggle={() => toggleSection('work')}
            >
              <div className="space-y-6">
                {workProjects.map((project, index) => (
                  <div key={project.id}>
                    {index > 0 && (
                      /* 2026.07 更新：子项目之间的分割线 */
                      <div className="mb-6 border-t border-gray-100" />
                    )}
                    <article className="border-l-2 border-blue-400 pl-4">
                      <h3 className="mb-2 text-base font-medium text-gray-900">
                        {project.title}
                      </h3>
                      <p className="mb-2 text-sm leading-relaxed text-gray-600">
                        {project.content}
                      </p>
                      <p className="text-sm leading-relaxed text-gray-600">
                        {project.outcome}
                      </p>
                      {project.showMetrics && <MetricsTable />}
                    </article>
                  </div>
                ))}
              </div>
            </AccordionItem>
          </motion.div>

          {/* 核心能力：三条独立小抽屉 */}
          <motion.section className="mb-3 mt-6" variants={sectionVariants}>
            <p className="mb-3 px-1 text-xs uppercase tracking-widest text-gray-400">
              核心能力
            </p>
            {coreCapabilities.map((item, index) => (
              <CapabilityDrawer
                key={item.id}
                item={item}
                open={openCapabilities[index]}
                onToggle={() => toggleCapability(index)}
              />
            ))}
          </motion.section>

          {/* 自我定位：折叠 */}
          <motion.div variants={sectionVariants}>
            <AccordionItem
              label="自我定位"
              summary="复合型游戏策划"
              open={openSection === 'positioning'}
              onToggle={() => toggleSection('positioning')}
            >
              <blockquote className="border-l-2 border-gray-300 pl-4 text-sm leading-relaxed text-gray-600">
                {SELF_POSITIONING}
              </blockquote>
            </AccordionItem>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

export default AboutMe
