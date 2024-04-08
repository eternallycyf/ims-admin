import { useLayoutEffect } from 'react'
import { useRouter } from '@/hooks/router'

interface Props {
  src: string
}

export default function ExternalLink({ src }: Props) {
  const { back } = useRouter()
  useLayoutEffect(() => {
    window.open(src, '_black')
    back()
  })
  return <div />
}
