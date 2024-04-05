import { Card } from 'antd'
import { USER_LIST } from '@/_mock/assets'

import type { UserInfo } from '#/entity'
import { useParams } from '@/hooks/router'

const USERS: UserInfo[] = USER_LIST

export default function UserDetail() {
  const { id } = useParams()
  const user = USERS.find(user => user.id === id)
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
