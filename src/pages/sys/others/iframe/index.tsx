interface Props {
  src: string
}
export default function Iframe({ src = '' }: Props) {
  return (
    <div className="h-full w-full">
      <iframe
        style={{ width: '100%', height: '100%' }}
        allowFullScreen
        referrerPolicy="same-origin"
        frameBorder="0"

        src={src}
        title="iframe-page"
        className="h-full w-full"
      />
    </div>
  )
}
