import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { ProductWrapper } from './style'

import { Table, Button, Form, Input, DatePicker } from 'antd'
import { getProductList } from '@/services/modules/product'
import getColumns from './schema/table'
import AddOrEditDialog from './c-cpns/addOrEditDialog'
import * as http from '@/services/modules/product'
import { getTableScroll } from '@/utils/getTableScroll'
const { RangePicker } = DatePicker

const Product = memo(() => {
  const [tableData, setTableData] = useState([])
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const pager = useRef({ page: 1, row: 10 })
  const [addOrEdit, setAddOrEdit] = useState('add')
  const [editId, setEditId] = useState(0)

  // init data
  const fetchList = async () => {
    try {
      setLoading(true)
      const { data, total } = await getProductList({ ...pager.current })
      setLoading(false)
      const tableData = data.map((item) => {
        item.key = item.id
        return item
      })
      setTotal(total)
      setTableData(tableData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchList()
    const height = getTableScroll()
    setScrollY(height)
  }, [])

  const handleSearch = () => {
    console.log(form.getFieldValue())
  }

  // 新增
  const showDialog = () => {
    setAddOrEdit('add')
    setVisible(true)
  }
  const dialogClose = (e) => {
    setVisible(false)
  }

  const dialogConfrim = useCallback(async (payload, type) => {
    console.log(payload)
    const url = type === 'add' ? 'addProduct' : 'editProduct'

    const { code } = await http[url](payload)
    if (code === 0) {
      window.$msg.success('添加成功～')
      fetchList()
      setVisible(false)
    }
  }, [])

  // 分页相关
  const handlePageNationChange = (page, pageSize) => {
    pager.current = { page, row: pageSize }
    fetchList()
  }
  const paginationProps = {
    total,
    showTotal: (total) => `共 ${total} 页`,
    onChange: handlePageNationChange
  }

  // 删除
  const handleDelete = async ({ id }) => {
    const { code } = await http.deleteProductById(id)
    if (code === 0) {
      window.$msg.success('操作成功～')
      fetchList()
    }
  }

  // 编辑
  const handleEdit = ({ id }) => {
    setEditId(id)
    setAddOrEdit('edit')

    setVisible(true)
  }

  return (
    <ProductWrapper>
      <div className="query basic">
        <Form autoComplete="off" form={form} layout="inline">
          <Form.Item label="标题" name="name">
            <Input placeholder="请输入商品标题" />
          </Form.Item>
          <Form.Item label="时间" name="range">
            <RangePicker format="YYYY-MM-DD" value="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              style={{ marginRight: '10px' }}
              onClick={handleSearch}
            >
              查询
            </Button>
            <Button>重置</Button>
          </Form.Item>
        </Form>
      </div>
      <div className="table basic">
        <div className="actions">
          <Button type="primary" onClick={showDialog}>
            新增
          </Button>
        </div>
        <Table
          bordered
          columns={getColumns({ handleDelete, handleEdit })}
          dataSource={tableData}
          pagination={paginationProps}
          scroll={{
            y: scrollY,
            x: 1600
          }}
          loading={loading}
        />
      </div>
      {/* dialog */}
      {visible && (
        <AddOrEditDialog
          dialogClose={dialogClose}
          dialogConfrim={dialogConfrim}
          type={addOrEdit}
          editId={editId}
        ></AddOrEditDialog>
      )}
    </ProductWrapper>
  )
})

export default Product
