import type { TranEnterType, TranExitType, TranHoverType } from '../interface'

// https://www.framer.com/motion/transition/
// A transition defines how values Animate from one state to another.

export function varTranHover(props?: TranHoverType) {
  const duration = props?.duration || 0.32
  const ease = props?.ease || [0.43, 0.13, 0.23, 0.96]

  return { duration, ease }
}

export function varTranEnter(props?: TranEnterType) {
  const duration = props?.durationIn || 0.64
  const ease = props?.easeIn || [0.43, 0.13, 0.23, 0.96]

  return { duration, ease }
}

export function varTranExit(props?: TranExitType) {
  const duration = props?.durationOut || 0.48
  const ease = props?.easeOut || [0.43, 0.13, 0.23, 0.96]

  return { duration, ease }
}
