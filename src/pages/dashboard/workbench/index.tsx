import { useState } from 'react'
import { Button } from 'antd'
import Page from '@/components/Page'

function WorkBench() {
  const [sticky, setSticky] = useState(false)

  return (
    <div h-full w-full style={{ overflow: !sticky ? 'hidden' : 'auto' }}>
      {sticky
        ? (
          <Page className="h-full w-full">
            <div>
              <div style={{ position: 'sticky', top: 0, zIndex: 9999, background: '#fff' }}>
                sticky-header
                <Button onClick={() => setSticky(sticky => !sticky)}>{sticky ? 'fixed' : 'sticky'}</Button>
              </div>
              {Array.from({ length: 100 }).map((_, index) => <div key={index} m-b-20>{index}</div>)}
            </div>
          </Page>
          )
        : (
          <Page className="h-full w-full flex flex-col overflow-hidden">
            <div style={{ flex: 'unset' }}>
              fixed-header
              <Button onClick={() => setSticky(sticky => !sticky)}>{sticky ? 'fixed' : 'sticky'}</Button>
            </div>
            <div overflow-y-scroll style={{ flex: 1 }}>
              {Array.from({ length: 100 }).map((_, index) => <div key={index} m-b-20>{index}</div>)}
            </div>
          </Page>
          )}
    </div>

  )
}

export default WorkBench
