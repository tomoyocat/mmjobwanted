import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// 统一动效配置
const easeIOS = [0.4, 0, 0.2, 1]

// ─── 作品数据 ───────────────────────────────────────────────────────────────

/** 副玩法 */
const sideGameplay = {
  id: 'star-cards',
  title: '群星牌',
  bvid: 'BV19FQ4BZE3f',
  description:
    '游戏内首个独立副玩法。核心灵感来源于《炉石传说：酒馆战棋》的自走棋对战框架，借鉴了《月圆之夜：镜中对决》的前后排站位设计，并融合了《金铲铲之战》中"小小英雄"的局内表现思路。在玩法落地上，将上述机制与游戏本身的精灵IP和赛尔机器人设定相结合，重构为一套独立于主玩法养成体系之外的"自走牌"对战规则。',
  designThought:
    '主玩法陷入战斗瓶颈时，团队需要一套不依赖主玩法数值的独立对战体系。设计上刻意剥离了主玩法的养成线绑定，让玩家无需练度即可参与，为疲于重复战斗的高氪玩家提供减负空间，同时以较低的上手门槛承接回坑用户。',
}

/** 主推活动 → S级版本运营活动 */
const featuredActivities = [
  {
    id: 'jing-dice',
    title: '晶骰传说',
    bvid: 'BV165TLzCEFu',
    description:
      '2025年公测暨周年庆主推活动。玩法灵感源自《杀戮尖塔》的肉鸽卡牌框架与《骰死地牢》的骰子随机机制，设计了一套"投骰决定行动路径"的轻肉鸽策略玩法。活动周期为三周，每周解锁不同初始角色与Boss挑战，引入局外天赋树养成，配合版本节点持续更新内容。',
    implementationThought:
      '周年庆需要兼具深度与话题性的内容载体。以骰子随机性降低策略门槛，以天赋树提供长线目标，确保轻度玩家能上手、重度玩家有追求。三周的分段更新既维持了新鲜感，也为数据调优留出了窗口。',
  },
  {
    id: 'deep-sea',
    title: '深海巡航',
    bvid: 'BV1rku2zkEz8',
    description:
      '2025年夏活主推活动。游戏玩法灵感汲取于《潜水员戴夫》，以海洋探险为叙事背景，融合肉鸽探索、地图收集与核心战斗内容，以精灵收集为驱动串联整体流程。',
    implementationThought:
      '夏季活动需要轻松、开阔的题材氛围。设计上以"探索感"为核心，用海洋地图的未知区域逐步解锁制造叙事悬念，同时将精灵收集作为成长反馈，使活动体验与游戏核心乐趣保持一致。',
  },
]

/** 常规活动 */
const regularActivities = [
  {
    id: 'spring-fireworks',
    title: '春节烟花盛会',
    bvid: 'BV1kZ4y1Z7CA',
    description:
      '玩家使用给定的植物形状与类别填充地图版图，每季度根据不同的结算规则获取分数，考验路线规划能力。',
    inspiration: '桌游《王国制图师》',
  },
  {
    id: 'locked-space',
    title: '探索闭锁空间',
    bvid: 'BV1wSFAeTEdE',
    description:
      '轻肉鸽爬塔玩法，融合精灵对战、棋盘博弈及多分支剧情事件。',
    inspiration: '爬塔类游戏',
  },
  {
    id: 'soup-time',
    title: '喝汤时间',
    bvid: 'BV1A3411o7TS',
    description:
      '文字解谜游戏，玩家通过提问获取"是/否"反馈，逐步还原谜题真相。',
    inspiration: '桌游《海龟汤》',
  },
  {
    id: 'new-year-market',
    title: '年货市场',
    bvid: 'BV1VJ411p7em',
    description:
      '每回合选取材料装入容器，合理搭配材料类别与容器尺寸以获取高分。',
    inspiration: '桌游《花砖物语》',
  },
  {
    id: 'pvp-flash-dark',
    title: 'PVP·闪光精灵VS暗黑精灵',
    bvid: 'BV1jM411r7Ne',
    description:
      '对战棋类游戏，双方各6枚棋子轮替使用，连成一线且数字含1/2/3者获胜。',
    inspiration: '井字棋机制变体',
  },
  {
    id: 'pvp-arena',
    title: 'PVP·擂台斗技',
    bvid: 'BV1Jo4y1J79R',
    description:
      '三名角色同场赛跑，玩家在每回合为任意角色投注，考验预判与分配策略。',
    inspiration: '赌马机制+卡牌',
  },
  {
    id: 'pvp-legion',
    title: 'PVP·军团之争',
    bvid: 'BV1g14y1f76m',
    description:
      '双方各100名士兵，通过9轮数字比拼决定胜负，比的是资源分配与心理博弈。',
    inspiration: '综艺游戏机制',
  },
  {
    id: 'rescue-green-ball',
    title: '营救绿棘球模拟作战',
    bvid: 'BV11L4y1J7Q9',
    description:
      '通过探索房间收集线索与道具，规划不同路线完成逃脱任务。',
    inspiration: '游戏《逃脱者》',
  },
  {
    id: 'kuixing',
    title: '魁星结巧',
    bvid: 'BV1mCYfeWEqh',
    description:
      '卡牌组合玩法，从手牌与展示区中各选2张进行配对，考验即时决策。',
    inspiration: '游戏《小丑牌》',
  },
  {
    id: 'rebuild-town',
    title: '重建枫曳镇',
    bvid: 'BV1tK411F72Q',
    description:
      '在版图上放置资源，根据形状排列合成对应建筑，侧重空间规划。',
    inspiration: '桌游《小小城镇》',
  },
  {
    id: 'aimu-diary',
    title: '哀目黑子的日记本',
    bvid: 'BV1JE411c77A',
    description:
      '密码推理游戏，每次猜测后获得位置正确的数量提示，逐步逼近答案。',
    inspiration: '桌游《珠玑妙算》',
  },
  {
    id: 'spring-outing',
    title: '我们的踏青时节',
    bvid: 'BV15F41137Cw',
    description:
      '将随机事件合理安排至计划表中，追求最优路线收益。',
    inspiration: '桌游《暑假日记》',
  },
]

// ─── 动画配置 ───────────────────────────────────────────────────────────────

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

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeIOS },
  },
}

// ─── 子组件 ─────────────────────────────────────────────────────────────────

/** 区块标签 + 装饰线 */
function SectionLabel({ children, diamond = false }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="flex items-center gap-2">
        <p className="text-xs uppercase tracking-widest text-gray-400">{children}</p>
        {/* 装饰元素：副玩法标题旁暖橙菱形 */}
        {diamond && (
          <span
            className="h-1.5 w-1.5 shrink-0 rotate-45 bg-amber-400/70"
            aria-hidden="true"
          />
        )}
      </div>
      <div className="h-px flex-1 bg-gray-200" aria-hidden="true" />
    </div>
  )
}

/**
 * 封面预览：用 B 站播放器 iframe（不自动播放）展示封面，
 * scale 放大裁剪掉播放器控件，pointer-events-none 让点击穿透到卡片。
 */
function VideoCoverPreview({ bvid, title, aspectClass = 'aspect-video' }) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl bg-gray-100 ${aspectClass}`}
    >
      <iframe
        src={`https://player.bilibili.com/player.html?bvid=${bvid}&autoplay=0&muted=1&t=0`}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ border: 'none', transform: 'scale(1.5)', transformOrigin: 'center' }}
        title={title}
        loading="lazy"
      />
      {/* 悬浮播放按钮覆盖层 */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
          <svg
            className="ml-0.5 h-5 w-5 text-gray-800"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

/** 主推 / 副玩法视频卡片 */
function FeaturedVideoCard({ item, onClick, badge, cornerMark = false }) {
  return (
    <button
      type="button"
      onClick={() => onClick(item)}
      className="group relative w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
    >
      {/* 装饰元素：主推卡片右上角 L 形角标 */}
      {cornerMark && (
        <span
          className="pointer-events-none absolute -right-1 -top-1 z-10 h-5 w-5 border-r border-t border-gray-200"
          aria-hidden="true"
        />
      )}
      <div className="relative shadow-sm transition-shadow duration-300 group-hover:shadow-md">
        <VideoCoverPreview
          bvid={item.bvid}
          title={item.title}
          aspectClass="aspect-[21/9] sm:aspect-[2/1]"
        />
        {badge && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-800 backdrop-blur-sm">
            {badge}
          </span>
        )}
      </div>
      <h3 className="mt-3 font-medium text-gray-900">{item.title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-gray-500">{item.description}</p>
    </button>
  )
}

/** 常规活动卡片 */
function RegularActivityCard({ item, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(item)}
      className="group w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
    >
      <div className="shadow-sm transition-shadow duration-300 group-hover:shadow-md">
        <VideoCoverPreview bvid={item.bvid} title={item.title} />
      </div>
      <h3 className="mt-3 font-medium text-gray-900">{item.title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-gray-500">{item.description}</p>
      <span className="mt-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
        {item.inspiration}
      </span>
    </button>
  )
}

/** 视频播放模态窗 */
function VideoModal({ video, onClose }) {
  const handleBackdropClick = useCallback(() => onClose(), [onClose])

  const handleContainerClick = useCallback((event) => {
    event.stopPropagation()
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: easeIOS }}
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />

      <motion.div
        className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.35, ease: easeIOS }}
        onClick={handleContainerClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
      >
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4 sm:px-6">
          <h2 id="video-modal-title" className="text-lg font-medium text-gray-900">
            {video.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="关闭"
          >
            <span className="text-xl leading-none">&times;</span>
          </button>
        </div>

        <div className="aspect-video w-full bg-black">
          <iframe
            src={`https://player.bilibili.com/player.html?bvid=${video.bvid}&autoplay=1&high_quality=1`}
            title={video.title}
            className="h-full w-full"
            allowFullScreen
            allow="autoplay; fullscreen"
            frameBorder="0"
          />
        </div>

        <div className="space-y-4 px-5 py-5 sm:px-6">
          <p className="text-sm leading-relaxed text-gray-600">{video.description}</p>

          {video.designThought && (
            <div className="rounded-lg border-l-2 border-blue-400 bg-blue-50/50 px-3 py-2.5">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                设计思路
              </p>
              <p className="mt-1 text-sm leading-relaxed text-gray-700">
                {video.designThought}
              </p>
            </div>
          )}

          {video.implementationThought && (
            <div className="rounded-lg border-l-2 border-emerald-400 bg-emerald-50/50 px-3 py-2.5">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                落地思路
              </p>
              <p className="mt-1 text-sm leading-relaxed text-gray-700">
                {video.implementationThought}
              </p>
            </div>
          )}

          {video.inspiration && (
            <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
              灵感来源：{video.inspiration}
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── 主组件 ─────────────────────────────────────────────────────────────────

function Portfolio() {
  const [currentVideo, setCurrentVideo] = useState(null)

  // ESC 键关闭模态窗
  useEffect(() => {
    if (!currentVideo) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setCurrentVideo(null)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [currentVideo])

  return (
    <div className="relative">
      {/* 背景层：网格 + 光晕 */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="content-grid-bg absolute inset-0" />
        <div className="content-glow-bg absolute inset-0" />
      </div>

      <section className="relative z-10 mx-auto max-w-[900px] px-6 pb-16 pt-4 md:px-10 sm:pb-20 sm:pt-6">
        {/* 标题区：始终可见 */}
        <header className="mb-6 pb-4">
          <h1 className="text-3xl font-light text-gray-900">作品集</h1>
          {/* 2026.07 更新：标题区说明小字 */}
          <p className="mt-1 text-xs text-gray-400">
            以下为 2020-2026 年部分活动案例
          </p>
          <div className="mt-4 border-b border-gray-200" />
        </header>

        <motion.div
          className="mt-6 space-y-12 sm:space-y-16"
          variants={pageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {/* 副玩法区块：始终可见 + 暖橙左边线 */}
          <motion.section variants={sectionVariants}>
            {/* 2026.07 更新：左侧暖橙装饰线 */}
            <div className="rounded-l-lg border-l-2 border-amber-400/60 pl-4">
              <SectionLabel diamond>副玩法</SectionLabel>
              <FeaturedVideoCard
                item={sideGameplay}
                badge="独立副玩法"
                onClick={setCurrentVideo}
              />
            </div>
          </motion.section>

          {/* 2026.07 更新：主推活动 → S级版本运营活动 */}
          <motion.section variants={sectionVariants}>
            <div className="rounded-l-lg border-l-2 border-amber-400/60 pl-4">
              <SectionLabel>S级版本运营活动</SectionLabel>
              <div className="space-y-10">
                {featuredActivities.map((item) => (
                  <FeaturedVideoCard
                    key={item.id}
                    item={item}
                    badge="S级活动"
                    cornerMark
                    onClick={setCurrentVideo}
                  />
                ))}
              </div>
            </div>
          </motion.section>

          {/* 2026.07 更新：常规活动直接展示，取消折叠 */}
          <motion.section variants={sectionVariants}>
            <div className="rounded-l-lg border-l-2 border-amber-400/60 pl-4">
              <SectionLabel>常规活动</SectionLabel>
              <motion.div
                className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
                variants={gridVariants}
              >
                {regularActivities.map((item) => (
                  <motion.div key={item.id} variants={cardVariants}>
                    <RegularActivityCard
                      item={item}
                      onClick={setCurrentVideo}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>
        </motion.div>

        <AnimatePresence>
          {currentVideo && (
            <VideoModal
              video={currentVideo}
              onClose={() => setCurrentVideo(null)}
            />
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}

export default Portfolio
