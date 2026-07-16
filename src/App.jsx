import { useState } from 'react'
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

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [tabIndex, setTabIndex] = useState(0)

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />
  }

  const ActiveComponent = tabs[tabIndex].component

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#1a1a1a]">
      <nav className="fixed top-0 left-0 z-20 w-full bg-[#FAFAF9]/80 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-[720px] justify-center gap-8">
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
    </div>
  )
}

export default App
