import { Card, message } from 'antd'
import { useEffect } from 'react'
import { USER_LIST } from '@/_mock/assets'

import type { UserInfo } from '#/entity'
import { useParams } from '@/hooks/router'
import { PubSub, type Record } from '@/pages/dashboard/analysis'

const USERS: UserInfo[] = USER_LIST

export default function UserDetail() {
  const { id } = useParams()
  const user = USERS.find(user => user.id === id)

  useEffect(() => {
    message.success('重新渲染了')
  }, [])

  const handleInitPage = (record: Record) => {
    message.success(`强制渲染${JSON.stringify(record)}`)
  }

  useEffect(() => {
    PubSub.on('handleOpenModal', handleInitPage)
    return () => {
      PubSub.off('handleOpenModal', handleInitPage)
    }
  }, [])

  return (
    <Card>
      <p>
        这是用户
        {user?.username}
        :
        {id}
        的详情页面
      </p>
    </Card>
  )
}
