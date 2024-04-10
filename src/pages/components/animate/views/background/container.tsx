import { m } from 'framer-motion'
import { useEffect, useMemo } from 'react'

import Cover3 from '@/assets/images/cover/cover_3.jpg'
import { MotionContainer, getVariant } from '@/components'
import { useThemeToken } from '@/hooks/theme'

interface Props {
  variant: string
}
export default function ContainerView({ variant }: Props) {
  const { colorBgLayout } = useThemeToken()
  const varients = useMemo(() => getVariant(variant), [variant])
  const isKenburns = variant.includes('kenburns')

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(varients)
  })
  return (
    <div
      key={variant}
      className="h-[480px] overflow-scroll rounded-lg"
      style={{ backgroundColor: colorBgLayout }}
    >
      <MotionContainer className="h-full w-full flex flex-col items-center gap-6">
        {isKenburns
          ? (
            <m.img src={Cover3} className="h-full w-full object-cover" variants={varients} />
            )
          : (
            <m.div {...varients} className="h-full w-full" />
            )}
      </MotionContainer>
    </div>
  )
}
