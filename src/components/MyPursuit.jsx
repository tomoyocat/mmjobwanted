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

// ─── 数据常量 ───────────────────────────────────────────────────────────────

/** 设计理念要点 */
const designPrinciples = [
  {
    emoji: '🎯',
    title: '上手难度',
    description: '降低非品类受众的进入门槛，提升触达与转化。',
  },
  {
    emoji: '🔄',
    title: '体验循环/正反馈',
    description: '保证游戏过程的完整性，让玩家自然产生"继续玩"的惯性。',
  },
  {
    emoji: '📊',
    title: '内容深度',
    description: '服务核心受众，提供从1到100的深度体验空间。',
  },
]

/** 优先级流程链 */
const priorityChain = [
  '适配性',
  '体验循环/正反馈',
  '上手难度',
  '内容深度',
]

/** 游戏审美卡片 */
const gameAesthetics = [
  {
    /* 2026.07 更新：卡片图标 */
    emoji: '🤖',
    title: '《杀戮尖塔》',
    content:
      '规则驱动深度，好系统的化学反应优于内容堆叠。"爬塔"式节点地图，已成为后续无数肉鸽游戏参考的设计范本。',
  },
  {
    emoji: '🌱',
    title: '《星露谷物语》',
    content:
      '每天种地、收菜、跟邻居打招呼，看起来重复，但每一次登录我都知道自己要干嘛、有什么在等我。有预期的内容收获也是一个重要的情感锚点。',
  },
  {
    emoji: '⚔️',
    title: '《艾尔登法环》',
    content:
      '在探索中持续变强的过程，在荒野上自由探索的选择，丰富的内容体验和宏大的叙事风格让人沉浸。',
  },
  {
    emoji: '🧊',
    title: '《冰汽时代》',
    content:
      '困境策略中压力尺度的拿捏，被迫选择时产生的情绪和在持续压力中的资源运行，这也能成为游戏体验中关键的一部分。',
  },
]

/** 团队协作风格卡片 */
const teamStyleCards = [
  {
    emoji: '🤝',
    title: '合作偏好',
    content:
      '喜欢和执行能力强、反馈及时的人共事，希望对方有明确的时间观念，任何异动能第一时间同步，不隐瞒不拖延。',
  },
  {
    emoji: '🎯',
    title: '重视顺序',
    /* 2026.07 更新：重视顺序文案 */
    content:
      '以项目目标为优先，个人风格为辅助。一切协作以最终产出为衡量标准。我的协作优先级：坦诚 > 能力 > 态度。',
  },
  {
    emoji: '🚫',
    title: '不能接受',
    content:
      '管理混乱的团队结构、优柔寡断的决策风格。一个内容落地的方向应该在前期推演中逐步完整，推进中的方向调整需要明确的决策依据和排期同步，而非临时起意。',
  },
]

// ─── 子组件 ─────────────────────────────────────────────────────────────────

/** 手风琴折叠项 */
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
          <span className="w-28 shrink-0 text-xs uppercase tracking-widest text-gray-400">
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
            <div className="relative border-t border-gray-50 px-5 pb-5 pt-3">
              {/* 装饰元素：展开内容顶部柔和渐变遮罩 */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-0 h-3 bg-gradient-to-b from-white to-transparent"
                aria-hidden="true"
              />
              <div className="relative z-10 pl-2 text-sm leading-relaxed text-gray-600 sm:pl-4">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** 设计理念要点卡片 */
function PrincipleCard({ emoji, title, description }) {
  return (
    <article className="rounded-xl bg-gray-50 p-4">
      <span className="text-2xl" role="img" aria-hidden="true">
        {emoji}
      </span>
      <h3 className="mt-2 text-base font-medium text-gray-900">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{description}</p>
    </article>
  )
}

/** 游戏审美卡片 */
function AestheticCard({ emoji, title, content }) {
  return (
    <article
      /* 装饰元素：hover 暖橙微光边框 */
      className="rounded-xl bg-gray-50 p-4 transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(255,140,66,0.2)]"
    >
      {/* 2026.07 更新：图标 + 标题，对齐团队协作卡片风格 */}
      <div className="flex items-center gap-2">
        <span className="text-2xl" role="img" aria-hidden="true">
          {emoji}
        </span>
        <h3 className="text-base font-medium text-gray-900">{title}</h3>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{content}</p>
    </article>
  )
}

/** 团队协作卡片 */
function TeamStyleCard({ emoji, title, content }) {
  return (
    <article className="rounded-xl bg-gray-50 p-4">
      {/* 图标 + 标题同行，与游戏审美卡片统一 */}
      <div className="flex items-center gap-2">
        <span className="text-2xl" role="img" aria-hidden="true">
          {emoji}
        </span>
        <h3 className="text-base font-medium text-gray-900">{title}</h3>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">{content}</p>
    </article>
  )
}

// ─── 主组件 ─────────────────────────────────────────────────────────────────

function MyPursuit() {
  // 手风琴：同一时间只展开一个区块
  const [openSection, setOpenSection] = useState(null)

  const toggleSection = (key) => {
    setOpenSection((prev) => (prev === key ? null : key))
  }

  return (
    <div className="relative">
      {/* 背景层：柔和渐变 + 模糊光斑 + 网格 */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute -right-16 bottom-32 h-72 w-72 rounded-full bg-amber-50/50 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-100/60 blur-3xl" />
        {/* 装饰元素：网格纹理 */}
        <div className="content-grid-bg absolute inset-0 opacity-60" />
      </div>

      <section className="relative z-10 mx-auto max-w-[720px] px-6 pb-16 pt-4 md:px-10 sm:pb-20 sm:pt-6">
        <motion.div
          variants={pageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {/* Slogan 区：始终可见 */}
          <motion.header className="mb-10" variants={sectionVariants}>
            <p className="mb-2 text-xs uppercase tracking-widest text-gray-400">
              Slogan
            </p>
            <div className="flex flex-col items-start">
              {/* 装饰元素：Slogan 上方短线 */}
              <span
                className="mb-3 h-px w-10 bg-gray-300"
                aria-hidden="true"
              />
              <h1 className="text-2xl font-light text-gray-900 sm:text-3xl">
                灵感无限，出品有界
              </h1>
              {/* 装饰元素：Slogan 下方短线 */}
              <span
                className="mt-3 h-px w-10 bg-gray-300"
                aria-hidden="true"
              />
            </div>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-500">
              平时大量接触桌游、综艺、独立游戏，从中积累玩法素材与设计灵感。储备够多，调用才快。但创意最终要经过排期、产能和预算的检验，资源充足时做深做透，资源有限时做精做稳，确保每一次出品有品质底线。
            </p>
          </motion.header>

          {/* 设计理念：折叠 */}
          <motion.div variants={sectionVariants}>
            <AccordionItem
              label="设计理念"
              summary="适配性 → 体验循环/正反馈 → 上手难度 → 内容深度"
              open={openSection === 'philosophy'}
              onToggle={() => toggleSection('philosophy')}
            >
              <p className="mb-5 text-sm leading-relaxed text-gray-600">
                游戏的核心价值是&ldquo;好玩&rdquo;。但&ldquo;好玩&rdquo;没有统一标准，所以需要策略来匹配不同玩家的需求：
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {designPrinciples.map((item) => (
                  <PrincipleCard key={item.title} {...item} />
                ))}
              </div>

              <blockquote className="mt-5 border-l-2 border-gray-300 pl-4 text-sm leading-relaxed text-gray-600">
                在项目中做运营活动时，以上三者之上还有一条前置标准——适配性。活动的内容、包装、输出方式必须符合它在整个游戏框架中的定位，不偏离主产品气质，不与核心系统冲突。
              </blockquote>

              {/* 优先级链条：展开内容末尾收尾 */}
              <div className="mt-5 flex flex-wrap items-center gap-1.5">
                {priorityChain.map((step, index) => (
                  <div key={step} className="flex items-center gap-1.5">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                      {step}
                    </span>
                    {index < priorityChain.length - 1 && (
                      /* 装饰元素：pill 间箭头 */
                      <span className="text-xs text-gray-400" aria-hidden="true">
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </AccordionItem>
          </motion.div>

          {/* 游戏审美：折叠 */}
          <motion.div variants={sectionVariants}>
            <AccordionItem
              label="游戏审美"
              summary="杀戮尖塔 / 星露谷物语 / 艾尔登法环 / 冰汽时代"
              open={openSection === 'aesthetics'}
              onToggle={() => toggleSection('aesthetics')}
            >
              <p className="mb-5 text-sm leading-relaxed text-gray-600">
                深度体验过《杀戮尖塔》《星露谷物语》《艾尔登法环》《冰汽时代》等品类差异较大的作品，各有收获：
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {gameAesthetics.map((game) => (
                  <AestheticCard key={game.title} {...game} />
                ))}
              </div>

              <blockquote className="mt-5 border-l-2 border-gray-300 pl-4 text-sm font-medium leading-relaxed text-gray-700">
                好的游戏让玩家在每一次操作中感受到选择的重量，并在长线中持续获得&ldquo;我在变强、我还有目标&rdquo;的感知。
              </blockquote>
            </AccordionItem>
          </motion.div>

          {/* 团队协作：折叠 */}
          <motion.div variants={sectionVariants}>
            <AccordionItem
              label="团队协作"
              summary="坦诚 > 能力 > 态度"
              open={openSection === 'team'}
              onToggle={() => toggleSection('team')}
            >
              <p className="mb-5 text-sm leading-relaxed text-gray-600">
                在团队中通常扮演创意提出者+执行推进者的角色，也会牵头组织活动主题的框架搭建。
              </p>

              <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                {teamStyleCards.map((card) => (
                  <TeamStyleCard key={card.title} {...card} />
                ))}
              </div>

              {/* 2026.07 更新：双向选择说明（小字批注） */}
              <p className="mt-4 border-t border-gray-100 pt-3 text-xs italic text-gray-400">
                以上为我的真实工作偏好。每个团队有各自的节奏，匹配比将就更重要。
              </p>
            </AccordionItem>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

export default MyPursuit
