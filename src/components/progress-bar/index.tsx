import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect, useState } from 'react'

import { usePathname } from '@/hooks/router/use-pathname'
import { useThemeToken } from '@/hooks/theme/use-theme-token'

export default function ProgressBar(): JSX.Element {
  const pathname = usePathname()
  const { colorPrimary } = useThemeToken()

  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  const changeNprogressBar = () => {
    const nprogress = document.getElementById('nprogress')
    if (nprogress) {
      const bar: HTMLElement = nprogress.querySelector('.bar')!
      const peg: HTMLElement = nprogress.querySelector('.peg')!

      bar.style.background = colorPrimary
      bar.style.boxShadow = `0 0 2px ${colorPrimary}`

      peg.style.boxShadow = `0 0 10px ${colorPrimary}, 0 0 5px ${colorPrimary}`
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!visible) {
      NProgress.configure({
        showSpinner: false,
      })
      NProgress.start()
      changeNprogressBar()
      setVisible(true)
    }

    if (visible) {
      NProgress.done()
      setVisible(false)
    }

    if (!visible && mounted) {
      setVisible(false)
      NProgress.done()
    }

    return () => {
      NProgress.done()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, mounted])

  return null
}
