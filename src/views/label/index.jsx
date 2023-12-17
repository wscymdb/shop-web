import React, { memo, useCallback, useEffect, useState } from 'react'
import { LabelWrapper } from './style'
import { Table, Button } from 'antd'
import getColumns from './schema/table'
import AddOrEditDialog from './c-cpns/addOrEditDialog'
import * as http from '@/services/modules/label'
import { getTableScroll } from '@/utils/getTableScroll'

const Label = memo(() => {
  const [tableData, setTableData] = useState([])
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [addOrEdit, setAddOrEdit] = useState('add')
  const [editId, setEditId] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  // init data
  const fetchList = async () => {
    try {
      setLoading(true)
      const { data } = await http.getLabelList()
      setLoading(false)
      const tableData = data.map((item) => {
        item.key = item.id
        return item
      })
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
    const url = type === 'add' ? 'addLabel' : 'editProduct'

    const { code } = await http[url](payload)
    if (code === 0) {
      window.$msg.success('添加成功～')
      fetchList()
      setVisible(false)
    }
  }, [])

  // 删除
  const handleDelete = async ({ id }) => {
    const { code } = await http.deleteLabelById(id)
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
    <LabelWrapper>
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
          pagination={false}
          loading={loading}
          scroll={{
            y: scrollY
          }}
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
    </LabelWrapper>
  )
})

export default Label
