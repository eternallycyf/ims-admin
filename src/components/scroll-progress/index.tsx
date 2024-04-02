import type { HTMLMotionProps, MotionValue } from 'framer-motion'
import { m, useSpring } from 'framer-motion'
import type { CSSProperties } from 'react'

import { useThemeToken } from '@/hooks/theme/use-theme-token'

interface Props extends HTMLMotionProps<'div'> {
  color?: string
  scrollYProgress: MotionValue<number>
  height?: number
}
/**
 * https://www.framer.com/motion/scroll-animations/##spring-smoothing
 */
export default function ScrollProgress({ scrollYProgress, height = 4, color, ...other }: Props) {
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const { colorPrimary } = useThemeToken()
  const backgroundColor = color || colorPrimary

  const style: CSSProperties = {
    transformOrigin: '0%',
    height,
    backgroundColor,
  }

  return <m.div style={{ scaleX, ...style }} {...other} />
}
