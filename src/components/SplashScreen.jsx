import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function SplashScreen({ onFinish }) {
  const [isExiting, setIsExiting] = useState(false)
  const isExitingRef = useRef(false)

  const handleFinish = () => {
    if (isExitingRef.current) return
    isExitingRef.current = true
    setIsExiting(true)
  }

  useEffect(() => {
    const timer = setTimeout(handleFinish, 4000)
    return () => clearTimeout(timer)
  }, [])

  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer overflow-hidden"
      style={{ backgroundColor: '#121212' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      onClick={handleFinish}
      onAnimationComplete={() => {
        if (isExiting) onFinish()
      }}
    >
      {/* 背景光晕：缓慢呼吸，增加暗色背景的空气感 */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[35%] h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(30, 30, 50, 0.6) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <motion.h1
        className="relative z-10 text-5xl font-light tracking-wider text-white"
        {...fadeIn}
      >
        曹茂鑫
      </motion.h1>

      <motion.p
        className="relative z-10 mt-4 text-lg text-gray-400"
        {...fadeIn}
      >
        玩法/活动策划
      </motion.p>
    </motion.div>
  )
}

export default SplashScreen
