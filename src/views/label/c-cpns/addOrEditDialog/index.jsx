import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { InputNumber, Modal, Form, Input } from 'antd'
import { AddOrEditDialogWrapper } from './style'
import YmUpload from '../ym-upload'
import * as http from '@/services/modules/label'

const AddOrEditDialog = memo((props) => {
  const { title, type, editId, dialogClose, dialogConfrim } = props
  const [form] = Form.useForm()
  const [iconPath, setIconPath] = useState([])
  const [iconFileList, setIconFileList] = useState([])

  const handleUploadImage = async (files) => {
    const formData = new FormData()
    files.forEach((itme) => {
      formData.append('img', itme.originFileObj)
    })
    const { data } = await http.uploadProductBanner(formData)
    return data
  }

  const getImgPath = async (changePath, originPath) => {
    let path = []
    if (changePath.length) {
      // 筛选新增的图片
      let changeList = changePath.filter((item) => !item.url)
      // 筛选原有的图片
      let originList = changePath.filter((item) => item.url)
      // 这层判断的含义是 如果原本就有两个图片删除了一个那么changePath中也是有内容的只不过changeList是无内容的
      if (changeList.length) {
        let list = await handleUploadImage(changeList)
        path = list.map((item) => ({ url: item }))
      }
      // 将新增图片获取的地址和老图片的地址合并
      path = [...path, ...originList]
    } else {
      path = originPath
    }

    return path.map((item) => item.url)
  }

  const handleFinish = async (v) => {
    if (type === 'add') {
      console.log(v)
      const paths = await handleUploadImage(iconPath)
      const data = {
        ...v,
        icon: paths.join(',')
      }
      dialogConfrim(data, 'add')
    } else {
      let icon = await getImgPath(iconPath, iconFileList)

      const data = {
        ...v,
        id: editId,
        icon: icon.join(',')
      }

      dialogConfrim(data, 'edit')
    }
  }

  const mapUrlToObjUrl = (list) => {
    if (!list) return []
    return list.map((item) => ({
      url: item
    }))
  }

  const fetchData = async () => {
    if (type === 'edit' && editId) {
      const { code, data } = await http.getProductById(editId)
      if (code === 0) {
        form.setFieldsValue({ ...data })
        setIconFileList(mapUrlToObjUrl(data?.icon?.split(',')))
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <AddOrEditDialogWrapper>
      <Modal
        title={title}
        open={true}
        onCancel={dialogClose}
        onOk={() => form.submit()}
      >
        <Form
          autoComplete="off"
          form={form}
          labelCol={{ span: 6 }}
          onFinish={handleFinish}
        >
          <Form.Item
            label="标签名称"
            name="name"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: '请输入必填项'
              }
            ]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: '必填项'
              }
            ]}
            label="标签icon"
            name="icon"
          >
            <YmUpload
              setPath={setIconPath}
              imgList={iconFileList}
              maxCount={1}
            ></YmUpload>
          </Form.Item>
        </Form>
      </Modal>
    </AddOrEditDialogWrapper>
  )
})

AddOrEditDialog.propTypes = {
  title: PropTypes.string
}

AddOrEditDialog.defaultProps = {
  title: '新增'
}
export default AddOrEditDialog
