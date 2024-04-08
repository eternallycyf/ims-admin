import { useQuery } from '@tanstack/react-query'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Space,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Table from 'antd/es/table'
import type { TableRowSelection } from 'antd/es/table/interface'
import { useEffect, useState } from 'react'

import orgService from '@/api/services/orgService'

import type { Organization } from '#/entity'
import ProTag from '@/theme/antd/tag'
import IconButton from '@/components/icon/IconButton'
import Iconify from '@/components/icon/IconifyIcon'

type SearchFormFieldType = Pick<Organization, 'name' | 'status'>

export default function OrganizationPage() {
  const [searchForm] = Form.useForm()

  const [organizationModalPros, setOrganizationModalProps] = useState<OrganizationModalProps>({
    formValue: {
      id: '',
      name: '',
      status: 'enable',
    },
    title: 'New',
    show: false,
    onOk: () => {
      setOrganizationModalProps(prev => ({ ...prev, show: false }))
    },
    onCancel: () => {
      setOrganizationModalProps(prev => ({ ...prev, show: false }))
    },
  })

  const onEdit = (formValue: Organization) => {
    setOrganizationModalProps(prev => ({
      ...prev,
      show: true,
      title: 'Edit',
      formValue,
    }))
  }

  const columns: ColumnsType<Organization> = [
    { title: 'Name', dataIndex: 'name', width: 300 },
    { title: 'Order', dataIndex: 'order', align: 'center', width: 60 },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      width: 120,
      render: status => (
        <ProTag color={status === 'enable' ? 'success' : 'error'}>{status}</ProTag>
      ),
    },
    { title: 'Desc', dataIndex: 'desc', align: 'center', width: 300 },
    {
      title: 'Action',
      key: 'operation',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div className="w-full flex justify-center text-gray">
          <IconButton onClick={() => onEdit(record)}>
            <Iconify icon="solar:pen-bold-duotone" size={18} />
          </IconButton>
          <Popconfirm title="Delete the Organization" okText="Yes" cancelText="No" placement="left">
            <IconButton>
              <Iconify icon="mingcute:delete-2-fill" size={18} className="text-error" />
            </IconButton>
          </Popconfirm>
        </div>
      ),
    },
  ]

  // rowSelection objects indicates the need for row selection
  const rowSelection: TableRowSelection<Organization> = {

  }

  const { data } = useQuery({
    queryKey: ['orgs'],
    queryFn: orgService.getOrgList,
  })

  const onSearchFormReset = () => {
    searchForm.resetFields()
  }

  const onCreate = () => {
    setOrganizationModalProps(prev => ({
      ...prev,
      show: true,
      title: 'Create New',
      formValue: {
        ...prev.formValue,
        id: '',
        name: '',
        order: 1,
        desc: '',
        status: 'enable',
      },
    }))
  }

  return (
    <Space direction="vertical" size="large" className="w-full">
      <Card>
        <Form form={searchForm}>
          <Row gutter={[16, 16]}>
            <Col span={24} lg={6}>
              <Form.Item<SearchFormFieldType> label="Name" name="name" className="!mb-0">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24} lg={6}>
              <Form.Item<SearchFormFieldType> label="Status" name="status" className="!mb-0">
                <Select>
                  <Select.Option value="enable">
                    <ProTag color="success">Enable</ProTag>
                  </Select.Option>
                  <Select.Option value="disable">
                    <ProTag color="error">Disable</ProTag>
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24} lg={12}>
              <div className="flex justify-end">
                <Button onClick={onSearchFormReset}>Reset</Button>
                <Button type="primary" className="ml-4">
                  Search
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        title="Organization List"
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
          dataSource={data}
          rowSelection={{ ...rowSelection }}
        />
      </Card>

      <OrganizationModal {...organizationModalPros} />
    </Space>
  )
}

interface OrganizationModalProps {
  formValue: Organization
  title: string
  show: boolean
  onOk: VoidFunction
  onCancel: VoidFunction
}

function OrganizationModal({ title, show, formValue, onOk, onCancel }: OrganizationModalProps) {
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ ...formValue })
  }, [formValue, form])
  return (
    <Modal title={title} open={show} onOk={onOk} onCancel={onCancel}>
      <Form
        initialValues={formValue}
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
      >
        <Form.Item<Organization> label="Name" name="name" required>
          <Input />
        </Form.Item>
        <Form.Item<Organization> label="Order" name="order" required>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item<Organization> label="Status" name="status" required>
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio value="enable"> Enable </Radio>
            <Radio value="disable"> Disable </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item<Organization> label="Desc" name="desc">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  )
}
