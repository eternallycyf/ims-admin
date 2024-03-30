import { useEffect, useRef } from 'react'
import { useDebounceFn, useThrottleFn } from 'ahooks'

export type RemoveEventFn = () => void
export interface UseEventParams {
  el?: Element | React.RefObject<Element | undefined> | Window | any
  name: string
  listener: EventListener
  options?: boolean | AddEventListenerOptions
  autoRemove?: boolean
  isDebounce?: boolean
  wait?: number
}

export function useEventListener({
  el = window,
  name,
  listener,
  options,
  autoRemove = true,
  isDebounce = true,
  wait = 80,
}: UseEventParams): { removeEvent: RemoveEventFn } {
  const remove = useRef<RemoveEventFn>(() => {})
  const isAddRef = useRef(false)

  useEffect(() => {
    const element = el instanceof Element ? el : el.current

    if (element) {
      const handler = isDebounce
        ? useDebounceFn(listener, { wait })
        : useThrottleFn(listener, { wait })
      const realHandler = wait ? handler : listener

      const removeEventListener = () => {
        isAddRef.current = true
        element.removeEventListener(name, realHandler, options)
      }

      const addEventListener = () => element.addEventListener(name, realHandler, options)

      if (!isAddRef.current)
        addEventListener()

      const cleanup = () => {
        autoRemove && removeEventListener()
      }

      return () => {
        removeEventListener()
        cleanup()
      }
    }
  }, [el, name, listener, options, autoRemove, isDebounce, wait])

  return { removeEvent: remove.current }
}
