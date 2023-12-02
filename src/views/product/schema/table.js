import dayjs from 'dayjs'
import { Button, Space } from 'antd'
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    align: 'center',
    key: 'id'
  },
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
    key: 'subtitle'
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
    title: '商品图片',
    dataIndex: 'img_paths',
    align: 'center',
    key: 'img_paths'
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
    align: 'center',
    key: 'createAt',
    render(text, record, index) {
      return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    title: '更新时间',
    dataIndex: 'updateAt',
    align: 'center',
    key: 'updateAt',
    render(text, record, index) {
      return dayjs(text).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    title: '操作',
    key: 'action',
    render() {
      return (
        <Space size="small">
          <Button type="link">编辑</Button>
          <Button type="link">删除</Button>
        </Space>
      )
    }
  }
]

export default columns
