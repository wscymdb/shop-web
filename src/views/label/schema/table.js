import dayjs from 'dayjs'
import { Button, Space, Tooltip, Image, Popconfirm } from 'antd'

function getColumns({ handleDelete = () => {}, handleEdit = () => {} } = {}) {
  const confirm = (record) => {
    handleDelete(record)
  }
  return [
    // {
    //   title: 'id',
    //   dataIndex: 'id',
    //   align: 'center',
    //   key: 'id',
    //   fixed: 'left'
    // },
    {
      title: '标签名',
      dataIndex: 'name',
      align: 'center',
      key: 'name'
    },
    {
      title: '标签icon',
      dataIndex: 'icon',
      align: 'center',
      key: 'icon',
      render(url) {
        return <Image width={70} height={50} src={url} />
      }
    },

    {
      title: '操作',
      key: 'action',
      render(text, record) {
        return (
          <Space size="small">
            <Button type="link" onClick={() => handleEdit(record)}>
              编辑
            </Button>

            <Popconfirm
              title="删除"
              description="此操作将会永久删除"
              onConfirm={(e) => confirm(record, e)}
              okText="确定"
              cancelText="取消"
            >
              <Button type="link">删除</Button>
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
}

export default getColumns
