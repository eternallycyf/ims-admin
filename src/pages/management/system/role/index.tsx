import { Button, Card, Popconfirm } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Table from 'antd/es/table'
import { useState } from 'react'

import { RoleModal, type RoleModalProps } from './role-modal'
import { ROLE_LIST } from '@/_mock/assets'

import type { Role } from '#/entity'
import { BasicStatus } from '#/enum'
import { IconButton, IconifyIcon } from '@/components'
import ProTag from '@/theme/antd/tag'

const ROLES: Role[] = ROLE_LIST

const DEFAULE_ROLE_VALUE: Role = {
  id: '',
  name: '',
  label: '',
  status: BasicStatus.ENABLE,
  permission: [],
}
export default function RolePage() {
  const [roleModalPros, setRoleModalProps] = useState<RoleModalProps>({
    formValue: { ...DEFAULE_ROLE_VALUE },
    title: 'New',
    show: false,
    onOk: () => {
      setRoleModalProps(prev => ({ ...prev, show: false }))
    },
    onCancel: () => {
      setRoleModalProps(prev => ({ ...prev, show: false }))
    },
  })

  const onCreate = () => {
    setRoleModalProps(prev => ({
      ...prev,
      show: true,
      title: 'Create New',
      formValue: {
        ...prev.formValue,
        ...DEFAULE_ROLE_VALUE,
      },
    }))
  }

  const onEdit = (formValue: Role) => {
    setRoleModalProps(prev => ({
      ...prev,
      show: true,
      title: 'Edit',
      formValue,
    }))
  }

  const columns: ColumnsType<Role> = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 300,
    },
    {
      title: 'Label',
      dataIndex: 'label',
    },
    { title: 'Order', dataIndex: 'order', width: 60 },
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
    { title: 'Desc', dataIndex: 'desc' },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="w-full flex justify-center text-gray">
          <IconButton onClick={() => onEdit(record)}>
            <IconifyIcon icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm title="Delete the Role" okText="Yes" cancelText="No" placement="left">
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
      title="Role List"
      extra={(
        <Button type="primary" onClick={onCreate}>
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
        dataSource={ROLES}
      />

      <RoleModal {...roleModalPros} />
    </Card>
  )
}
