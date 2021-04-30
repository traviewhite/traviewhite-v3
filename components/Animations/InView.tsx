import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Props {
  children: React.ReactNode
}
const InView = ({ children }: Props) => {
  const animation = useAnimation()
  const [ref, inView, entry]: any = useInView({ triggerOnce: true, threshold: 0.25 })
  useEffect(() => {
    if (inView) {
      animation.start('visible')
    } else {
      animation.start('hidden')
    }
  }, [animation, inView])
  const variants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    hidden: {
      y: entry,
      opacity: 0,
    },
  }
  return (
    <motion.div ref={ref} animate={animation} initial='hidden' exit={{ opacity: 0 }} variants={variants}>
      {children}
    </motion.div>
  )
}

export default InView
