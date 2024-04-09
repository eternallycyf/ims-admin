import { forwardRef, memo } from 'react'
import type { Props as SimplebarProps } from 'simplebar-react'
import SimpleBar from 'simplebar-react'

const ScrollBar = forwardRef<HTMLElement, SimplebarProps>(({ children, ...other }, ref) => {
  return (
    <SimpleBar className="h-full" scrollableNodeProps={{ ref }} clickOnTrack={false} {...other}>
      {children}
    </SimpleBar>
  )
})

ScrollBar.displayName = 'ScrollBar'

export default memo(ScrollBar)
