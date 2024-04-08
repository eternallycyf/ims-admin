import type { PropsWithChildren } from 'react'

type PageProps = PropsWithChildren<{
  className?: string
  style?: React.CSSProperties
}>

function Page(props: PageProps) {
  const { className, style, children } = props
  return (
    <div className={`p-[10px] ${className}`} style={style}>
      {children}
    </div>
  )
}

export default Page
