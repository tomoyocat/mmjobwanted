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
          扫码添加微信并备注
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
          fill="#07C160"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.952-7.062-6.122zm-2.18 2.769c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z" />
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
