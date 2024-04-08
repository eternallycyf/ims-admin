import { useEffect } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { createPubSub } from '@/utils/publish'
import Page from '@/components/Page'

export interface Record {
  name: string
}
export const PubSub = createPubSub<{ handleOpenModal: (record: Record) => void }, Record>()

function WorkBench() {
  const navigate = useNavigate()

  useEffect(() => {
    message.success('重新渲染了')
  }, [])

  const go = () => {
    navigate({
      pathname: `/management/system/user/123123`,
      search: createSearchParams({ query: 'someQuery' }).toString(),
    }, {
      state: {
        tabTitle: '123123',
      },
    })
  }

  const go2 = () => {
    navigate({
      pathname: `/management/system/user/123123`,
      search: createSearchParams({ query: 'replace state' }).toString(),
    }, {
      state: {
        tabTitle: 'replace state',
      },
    })
  }

  const go3 = () => {
    navigate({
      pathname: `/management/system/user/123123`,
      search: createSearchParams({ query: 'replace state' }).toString(),
    }, {
      state: {
        tabTitle: 'replace state',
      },
    })

    setTimeout(() => {
      PubSub.emit('handleOpenModal', { name: 'zs' })
    }, 1000)
  }

  return (
    <Page>
      <a block="" onClick={go}>
        router-123123
      </a>
      <a block="" onClick={go2}>
        replace state
      </a>
      <a block="" onClick={go3}>
        跨tabs传参 切触发事件
      </a>
    </Page>
  )
}

export default WorkBench
