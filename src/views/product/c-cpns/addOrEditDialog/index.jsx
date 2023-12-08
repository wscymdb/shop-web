import React, { memo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { InputNumber, Modal, Form, Input } from 'antd'
import { AddOrEditDialogWrapper } from './style'
import YmUpload from '../ym-upload'
import * as http from '@/services/modules/product'

const AddOrEditDialog = memo((props) => {
  const { title, dialogClose, dialogConfrim } = props
  const [form] = Form.useForm()
  const [bannerPath, setBannerPath] = useState([])
  const [detailPath, setDetailPath] = useState([])

  const handleUploadImage = async (files) => {
    const formData = new FormData()
    files.forEach((itme) => {
      formData.append('img', itme.originFileObj)
    })
    const { data } = await http.uploadProductBanner(formData)
    return data
  }

  const handleFinish = async (v) => {
    const paths = await handleUploadImage(bannerPath)
    const detail_path = await handleUploadImage(detailPath)
    const data = {
      ...v,
      banner_path: paths.join(','),
      detail_path: detail_path.join(',')
    }
    dialogConfrim(data)
  }

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
            label="标题"
            name="title"
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
            label="副标题"
            name="subtitle"
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
            label="运费"
            name="freight"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: '请输入必填项'
              }
            ]}
          >
            <InputNumber min={0} style={{ width: '100%' }} prefix="￥" />
          </Form.Item>
          <Form.Item
            label="当前价格"
            name="current_price"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: '请输入必填项'
              }
            ]}
          >
            <InputNumber min={0} style={{ width: '100%' }} prefix="￥" />
          </Form.Item>
          <Form.Item
            label="之前价格"
            name="previous_price"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: '请输入必填项'
              }
            ]}
          >
            <InputNumber min={0} style={{ width: '100%' }} prefix="￥" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: '必填项'
              }
            ]}
            label="商品banner图"
            name="banner_path"
          >
            <YmUpload setPath={setBannerPath}></YmUpload>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: '必填项'
              }
            ]}
            label="商品详情图"
            name="detail_path"
          >
            <YmUpload setPath={setDetailPath}></YmUpload>
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
