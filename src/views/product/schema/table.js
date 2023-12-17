import dayjs from 'dayjs'
import { Button, Space, Tooltip, Image, Popconfirm, Tag } from 'antd'

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
      title: '标题',
      dataIndex: 'title',
      align: 'center',
      key: 'title'
    },
    {
      title: '副标题',
      dataIndex: 'subtitle',
      align: 'center',
      key: 'subtitle',
      ellipsis: true,
      render: (text, record) => {
        return (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        )
      }
    },
    {
      title: '标签',
      dataIndex: 'name',
      align: 'center',
      key: 'name',
      render(text) {
        return <Tag color="success">{text}</Tag>
      }
    },
    {
      title: '运费(元)',
      dataIndex: 'freight',
      align: 'center',
      key: 'freight'
    },
    {
      title: '当前价格(元)',
      dataIndex: 'current_price',
      align: 'center',
      key: 'current_price'
    },
    {
      title: '之前价格(元)',
      dataIndex: 'previous_price',
      align: 'center',
      key: 'previous_price'
    },
    {
      title: '商品banner图片',
      dataIndex: 'banner_path',
      align: 'center',
      key: 'banner_path',
      render(text) {
        if (text) {
          return (
            <Image.PreviewGroup items={text.split(',')}>
              <Image src={text.split(',')[0]} />
            </Image.PreviewGroup>
          )
        }
        return ''
      }
    },
    {
      title: '商品详情图片',
      dataIndex: 'detail_path',
      align: 'center',
      key: 'detail_path',
      render(text) {
        if (text) {
          return (
            <Image.PreviewGroup items={text.split(',')}>
              <Image src={text.split(',')[0]} />
            </Image.PreviewGroup>
          )
        }
        return ''
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      align: 'center',
      key: 'createAt',
      width: 220,
      render(text, record, index) {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '更新时间',
      dataIndex: 'updateAt',
      align: 'center',
      key: 'updateAt',
      width: 220,
      render(text, record, index) {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
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
