import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplashScreen from './components/SplashScreen'
import AboutMe from './components/AboutMe'
import Portfolio from './components/Portfolio'
import MyPursuit from './components/MyPursuit'

const easeIOS = [0.4, 0, 0.2, 1]

const tabs = [
  { label: '关于我', component: AboutMe },
  { label: '作品集', component: Portfolio },
  { label: '我想要的', component: MyPursuit },
]

/** 微信二维码弹窗 */
function WeChatModal({ onClose }) {
  const [imgFailed, setImgFailed] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: easeIOS }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      <motion.div
        className="relative z-10 w-full max-w-xs rounded-2xl bg-white p-6 shadow-2xl"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3, ease: easeIOS }}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="wechat-modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          aria-label="关闭"
        >
          <span className="text-xl leading-none">&times;</span>
        </button>

        <h2 id="wechat-modal-title" className="sr-only">
          微信二维码
        </h2>

        <div className="mx-auto mt-2 flex aspect-square w-full max-w-[220px] items-center justify-center overflow-hidden rounded-xl bg-gray-100">
          {imgFailed ? (
            <p className="px-4 text-center text-sm text-gray-400">
              请替换为微信二维码
            </p>
          ) : (
            <img
              src="/images/wechat-qr.jpg"
              alt="微信二维码"
              className="h-full w-full object-contain"
              onError={() => setImgFailed(true)}
            />
          )}
        </div>

        <p className="mt-3 text-center text-sm text-gray-500">
          扫码添加微信 · 备注&quot;游戏策划&quot;
        </p>
      </motion.div>
    </motion.div>
  )
}

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [tabIndex, setTabIndex] = useState(0)
  const [showWeChat, setShowWeChat] = useState(false)

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />
  }

  const ActiveComponent = tabs[tabIndex].component

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#1a1a1a]">
      <nav className="fixed top-0 left-0 z-20 w-full bg-[#FAFAF9]/80 shadow-sm backdrop-blur-md">
        <div className="relative mx-auto flex max-w-[720px] items-center justify-center gap-8">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setTabIndex(index)}
              className={`relative px-2 py-4 text-base transition-colors duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                tabIndex === index
                  ? 'font-medium text-gray-900'
                  : 'font-normal text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.label}
              {tabIndex === index && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#1a1a1a]"
                  // 装饰元素：弹簧回弹指示器
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {/* 装饰元素：选中页签暖橙微光点 */}
                  <span
                    className="tab-amber-glow absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/40"
                    aria-hidden="true"
                  />
                </motion.div>
              )}
            </button>
          ))}
        </div>
        {/* 装饰元素：页签栏底部渐变分割线 */}
        <div className="tab-gradient-line h-px w-full" aria-hidden="true" />
      </nav>

      {/* 微信联系按钮：开屏结束后显示 */}
      <button
        type="button"
        onClick={() => setShowWeChat(true)}
        className="fixed top-3 right-4 z-30 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
        aria-label="微信联系"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5 text-green-500"
          aria-hidden="true"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L2 20l3.71-.97C7.02 19.64 8.46 20 10 20h2c5.52 0 10-4.48 10-10S17.52 2 12 2zm-2 5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-4 8c-2.21 0-4-1.79-4-4 0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.21-1.79 4-4 4z" />
        </svg>
      </button>

      <main className="min-h-screen pt-32">
        <div className="mx-auto max-w-[720px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tabIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.5, ease: easeIOS }}
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {showWeChat && <WeChatModal onClose={() => setShowWeChat(false)} />}
      </AnimatePresence>
    </div>
  )
}

export default App
