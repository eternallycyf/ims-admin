import { Button, Card, Popconfirm } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Table from 'antd/es/table'

import { USER_LIST } from '@/_mock/assets'

import type { Role, UserInfo } from '#/entity'
import { BasicStatus } from '#/enum'
import { IconButton, IconifyIcon } from '@/components'
import { usePathname, useRouter } from '@/hooks/router'
import { useThemeToken } from '@/hooks/theme'
import ProTag from '@/theme/antd/tag'

const USERS: UserInfo[] = USER_LIST

export default function RolePage() {
  const { colorTextSecondary } = useThemeToken()
  const { push } = useRouter()
  const pathname = usePathname()

  const columns: ColumnsType<UserInfo> = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 300,
      render: (_, record) => {
        return (
          <div className="flex">
            <img alt="" src={record.avatar} className="h-10 w-10 rounded-full" />
            <div className="ml-2 flex flex-col">
              <span className="text-sm">{record.username}</span>
              <span style={{ color: colorTextSecondary }} className="text-xs">
                {record.email}
              </span>
            </div>
          </div>
        )
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      align: 'center',
      width: 120,
      render: (role: Role) => <ProTag color="cyan">{role.name}</ProTag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      width: 120,
      render: status => (
        <ProTag color={status === BasicStatus.DISABLE ? 'error' : 'success'}>
          {status === BasicStatus.DISABLE ? 'Disable' : 'Enable'}
        </ProTag>
      ),
    },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="w-full flex justify-center text-gray">
          <IconButton
            onClick={() => {
              push(`${pathname}/${record.id}`)
            }}
          >
            <IconifyIcon icon="mdi:card-account-details" size={18} />
          </IconButton>
          <IconButton onClick={() => { }}>
            <IconifyIcon icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm title="Delete the User" okText="Yes" cancelText="No" placement="left">
            <IconButton>
              <IconifyIcon icon="mingcute:delete-2-fill" size={18} className="text-error" />
            </IconButton>
          </Popconfirm>
        </div>
      ),
    },
  ]

  return (
    <Card
      title="User List"
      extra={(
        <Button type="primary" onClick={() => { }}>
          New
        </Button>
      )}
    >
      <Table
        rowKey="id"
        size="small"
        scroll={{ x: 'max-content' }}
        pagination={false}
        columns={columns}
        dataSource={USERS}
      />
    </Card>
  )
}
