import { Button, Card, Popconfirm } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Table from 'antd/es/table'
import { isNil } from 'lodash'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import PermissionModal, { type PermissionModalProps } from './permission-modal'
import { useUserPermission } from '@/store/userStore'

import type { Permission } from '#/entity'
import { BasicStatus, PermissionType } from '#/enum'
import { IconButton, IconifyIcon, SvgIcon } from '@/components'
import ProTag from '@/theme/antd/tag'

const defaultPermissionValue: Permission = {
  id: '',
  parentId: '',
  name: '',
  label: '',
  route: '',
  component: '',
  icon: '',
  hide: false,
  status: BasicStatus.ENABLE,
  type: PermissionType.CATALOGUE,
}
export default function PermissionPage() {
  const permissions = useUserPermission()
  const { t } = useTranslation()

  const [permissionModalProps, setPermissionModalProps] = useState<PermissionModalProps>({
    formValue: { ...defaultPermissionValue },
    title: 'New',
    show: false,
    onOk: () => {
      setPermissionModalProps(prev => ({ ...prev, show: false }))
    },
    onCancel: () => {
      setPermissionModalProps(prev => ({ ...prev, show: false }))
    },
  })

  const onCreate = (parentId?: string) => {
    setPermissionModalProps(prev => ({
      ...prev,
      show: true,
      ...defaultPermissionValue,
      title: 'New',
      formValue: { ...defaultPermissionValue, parentId: parentId ?? '' },
    }))
  }

  const onEdit = (formValue: Permission) => {
    setPermissionModalProps(prev => ({
      ...prev,
      show: true,
      title: 'Edit',
      formValue,
    }))
  }

  const columns: ColumnsType<Permission> = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 300,
      render: (_, record) => <div>{t(record.label)}</div>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      width: 60,
      render: (_, record) => <ProTag color="processing">{PermissionType[record.type]}</ProTag>,
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      width: 60,
      render: (icon) => {
        if (isNil(icon))
          return ''
        if (icon.startsWith('ic'))
          return <SvgIcon icon={icon} size={18} className="ant-menu-item-icon" />

        return <IconifyIcon icon={icon} size={18} className="ant-menu-item-icon" />
      },
    },
    {
      title: 'Component',
      dataIndex: 'component',
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
    { title: 'Order', dataIndex: 'order', width: 60 },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="w-full flex justify-end text-gray">
          {record?.type === PermissionType.CATALOGUE && (
            <IconButton onClick={() => onCreate(record.id)}>
              <IconifyIcon icon="gridicons:add-outline" size={18} />
            </IconButton>
          )}
          <IconButton onClick={() => onEdit(record)}>
            <IconifyIcon icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm title="Delete the Permission" okText="Yes" cancelText="No" placement="left">
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
      title="Permission List"
      extra={(
        <Button type="primary" onClick={() => onCreate()}>
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
        dataSource={permissions}
      />

      <PermissionModal {...permissionModalProps} />
    </Card>
  )
}
