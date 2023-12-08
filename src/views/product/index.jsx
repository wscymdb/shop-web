import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { ProductWrapper } from './style'

import { Table, Button, Form, Input, DatePicker } from 'antd'
import { getProductList } from '@/services/modules/product'
import columns from './schema/table'
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

  // 对话框相关
  const showDialog = () => {
    setVisible(true)
  }
  const dialogClose = (e) => {
    setVisible(false)
  }

  const dialogConfrim = useCallback(async (payload) => {
    console.log(payload)
    const { code } = await http.addProduct(payload)
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
          columns={columns}
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
        ></AddOrEditDialog>
      )}
    </ProductWrapper>
  )
})

export default Product
