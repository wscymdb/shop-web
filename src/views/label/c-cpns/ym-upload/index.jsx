import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload } from 'antd'
import * as http from '@/services/modules/product'
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
const YmUpload = (props) => {
  const { setPath, onChange, imgList, maxCount } = props

  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState([])
  const handleCancel = () => setPreviewOpen(false)

  // console.log(imgList, fileList)

  useEffect(() => {
    if (!imgList) return
    setFileList(imgList)
  }, [imgList])
  //
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    )
  }
  //
  const handleChange = ({ file, fileList }) => {
    console.log(fileList, 'change')
    setPath(fileList)
    onChange(fileList)
    setFileList(fileList)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8
        }}
      >
        Upload
      </div>
    </div>
  )
  // remove
  const handleRemove = async (file) => {
    // await http.deleteImgByName({
    //   url: file.url
    // })
    // console.log(file)
  }

  //
  const handleBeforeUpload = () => false
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        beforeUpload={handleBeforeUpload}
        maxCount={maxCount ? maxCount : null}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: '100%'
          }}
          src={previewImage}
        />
      </Modal>
    </>
  )
}
export default YmUpload
