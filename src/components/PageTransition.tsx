import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

// PageTransition - 페이지 진입/이탈 시 슬라이드+페이드 애니메이션
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="flex min-h-screen flex-1 flex-col"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
