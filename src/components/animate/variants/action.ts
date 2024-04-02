/**
 * https://www.framer.com/motion/gestures/
 * @param hover
 * @param tap
 */
export function varHover(hover = 1.09, tap = 0.97) {
  return {
    hover: { scale: hover },
    tap: { scale: tap },
  }
}
