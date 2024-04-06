import { LazyMotion, domMax, m } from 'framer-motion'

interface Props {
  children: React.ReactNode
}
/**
 * [Reduce bundle size by lazy-Loading a subset of Motion's features](https://www.framer.com/motion/lazy-motion/)
 */
function MotionLazy({ children }: Props) {
  return (
    <LazyMotion strict features={domMax}>
      <m.div style={{ height: '100%' }}>{children}</m.div>
    </LazyMotion>
  )
}

export default MotionLazy
