import { m } from 'framer-motion'
import { useMemo } from 'react'

import Cover3 from '@/assets/images/cover/cover_3.jpg'
import { MotionContainer, getVariant } from '@/components'
import { useThemeToken } from '@/hooks/theme'

/**
 * Returns an array with `value` repeated `n` times.
 * @param {any} value - The value to repeat.
 * @param {number} n - Number of times to repeat the value.
 * @returns {Array} - The new array with `value` repeated `n` times.
 */
export function repeat<T>(value: T, n: number): T[] {
  return Array(n).fill(value)
}

const TEXT = 'SlashAdmin'
interface Props {
  isText: boolean
  isMulti: boolean
  variant: string
}
export default function ContainerView({ isText, variant, isMulti }: Props) {
  const { colorBgLayout } = useThemeToken()
  const varients = useMemo(() => getVariant(variant), [variant])
  const imgs = useMemo(() => (isMulti ? repeat(Cover3, 5) : [Cover3]), [isMulti])

  return (
    <div
      key={variant}
      className="overflow-auto rounded-lg xs:p-20"
      style={{ backgroundColor: colorBgLayout }}
    >
      {isText
        ? (
          <MotionContainer className="h-80 flex items-center justify-center font-bold md:text-6xl">
            {TEXT.split('').map((letter, index) => (
              <m.div key={index} variants={varients} className="xs:ml-1">
                {letter}
              </m.div>
            ))}
          </MotionContainer>
          )
        : (
          <MotionContainer className="flex flex-col items-center gap-6">
            {imgs.map((img, index) => (
              <m.img
                key={index}
                src={img}
                style={{
                  objectFit: 'cover',
                  width: '480px',
                  height: isMulti ? '72px' : '320px',
                  margin: 'auto',
                  borderRadius: '8px',
                }}
                variants={varients}
              />
            ))}
          </MotionContainer>
          )}
    </div>
  )
}
