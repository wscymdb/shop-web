import React, { memo, useEffect, useState } from 'react'
import { ProductWrapper } from './style'

import { Table } from 'antd'
import { getProductList } from '@/services/modules/product'
import columns from './schema/table'

const Product = memo(() => {
  const [tableData, setTableData] = useState([])
  useEffect(() => {
    async function fn() {
      const data = await getProductList()

      const tableData = data.map((item) => {
        item.key = item.id
        return item
      })
      setTableData(tableData)
    }
    fn()
  }, [])
  return (
    <ProductWrapper>
      <Table bordered columns={columns} dataSource={tableData} />
    </ProductWrapper>
  )
})

export default Product
