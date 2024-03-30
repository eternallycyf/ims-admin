import React, { useRef } from 'react'
import type { MutableRefObject } from 'react'
import { useEventListener } from './useEventListener'
import { screenEnum, screenMap, sizeEnum } from '@/emums/breakpointEnum'

let globalScreenRef: MutableRefObject<sizeEnum | undefined>
let globalWidthRef: MutableRefObject<number>
let globalRealWidthRef: MutableRefObject<number>

export interface CreateCallbackParams {
  screen: MutableRefObject<sizeEnum | undefined>
  width: MutableRefObject<number>
  realWidth: MutableRefObject<number>
  screenEnum: typeof screenEnum
  screenMap: Map<sizeEnum, number>
  sizeEnum: typeof sizeEnum
}

export function useBreakpoint() {
  return {
    screenRef: globalScreenRef,
    widthRef: globalWidthRef,
    screenEnum,
    realWidthRef: globalRealWidthRef,
  }
}

// Just call it once
export function createBreakpointListen(fn?: (opt: CreateCallbackParams) => void) {
  const screenRef = useRef<sizeEnum>(sizeEnum.XL)
  const realWidthRef = useRef(window.innerWidth)

  function getWindowWidth() {
    const width = document.body.clientWidth
    const xs = screenMap.get(sizeEnum.XS)!
    const sm = screenMap.get(sizeEnum.SM)!
    const md = screenMap.get(sizeEnum.MD)!
    const lg = screenMap.get(sizeEnum.LG)!
    const xl = screenMap.get(sizeEnum.XL)!

    if (width < xs)
      screenRef.current = sizeEnum.XS
    else if (width < sm)
      screenRef.current = sizeEnum.SM
    else if (width < md)
      screenRef.current = sizeEnum.MD
    else if (width < lg)
      screenRef.current = sizeEnum.LG
    else if (width < xl)
      screenRef.current = sizeEnum.XL
    else screenRef.current = sizeEnum.XXL

    realWidthRef.current = width
  }

  useEventListener({
    el: window,
    name: 'resize',

    listener: () => {
      getWindowWidth()
      resizeFn()
    },
    // wait: 100,
  })

  getWindowWidth()
  globalScreenRef = React.useMemo(() => screenRef, [])
  globalWidthRef = React.useMemo(
    () => ({
      current: screenMap.get(globalScreenRef.current!)!,
    }),
    [],
  )
  globalRealWidthRef = React.useMemo(() => realWidthRef, [])

  function resizeFn() {
    fn?.({
      screen: globalScreenRef,
      width: globalWidthRef,
      realWidth: globalRealWidthRef,
      screenEnum,
      screenMap,
      sizeEnum,
    })
  }

  resizeFn()
  return {
    screenRef: globalScreenRef,
    screenEnum,
    widthRef: globalWidthRef,
    realWidthRef: globalRealWidthRef,
  }
}
