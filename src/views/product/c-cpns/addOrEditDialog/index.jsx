import React, { memo, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { InputNumber, Modal, Form, Input, Select } from 'antd'
import { AddOrEditDialogWrapper } from './style'
import YmUpload from '../ym-upload'
import * as http from '@/services/modules/product'
import { getLabelList } from '@/services/modules/label'

const AddOrEditDialog = memo((props) => {
  const { title, type, editId, dialogClose, dialogConfrim } = props
  const [form] = Form.useForm()
  const [bannerPath, setBannerPath] = useState([])
  const [detailPath, setDetailPath] = useState([])
  const [bannerFileList, setBannerFileList] = useState([])
  const [detailFileList, setDetailFileList] = useState([])
  const [labelOptions, setLabelOptions] = useState([])

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
      const paths = await handleUploadImage(bannerPath)
      const detail_path = await handleUploadImage(detailPath)
      const data = {
        ...v,
        banner_path: paths.join(','),
        detail_path: detail_path.join(',')
      }
      dialogConfrim(data, 'add')
    } else {
      let banner_path = await getImgPath(bannerPath, bannerFileList)
      let detail_path = await getImgPath(detailPath, detailFileList)

      const data = {
        ...v,
        id: editId,
        banner_path: banner_path.join(','),
        detail_path: detail_path.join(',')
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
        setBannerFileList(mapUrlToObjUrl(data?.banner_path?.split(',')))
        setDetailFileList(mapUrlToObjUrl(data?.detail_path?.split(',')))
      }
    }
  }

  const fetchLabels = async () => {
    const { code, data } = await getLabelList()
    if (code === 0) {
      setLabelOptions([...data])
    }
  }

  useEffect(() => {
    fetchLabels()
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
            label="所属分类"
            name="label_id"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: '请选择'
              }
            ]}
          >
            <Select
              fieldNames={{
                label: 'name',
                value: 'id'
              }}
              placeholder="请选择"
              options={labelOptions}
            ></Select>
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
            <YmUpload
              setPath={setBannerPath}
              imgList={bannerFileList}
            ></YmUpload>
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
            <YmUpload
              setPath={setDetailPath}
              imgList={detailFileList}
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
