import type { UploadChangeParam } from 'antd/lib/upload'
import type { UploadFile } from 'antd/lib/upload/interface'
import React, { useRef, useCallback } from 'react'
import { Upload, Button, notification } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { v1 as uuidv1 } from 'uuid'
import useStateSync from '@/hooks/useStateSync'
import { FileType, fileFormatValidateImage, fileSizeValidateImage } from '@/utils/file'
import ImageCropper, { ImageCropperDialogRef } from '../ImageCropper'
import { uploadImage, UploadImageReslut } from '@/api/static'

export interface ImageUploadProps {
  type?: 'button' | 'card' | 'avatar'
  multiple?: boolean
  value?: string[]
  showUploadList?: boolean
  maxCount?: number
  cropper?: boolean
  cropperAspectRatio?: number
  onChange?: (urls: string[]) => void
  disabled?: boolean
}

export function createFileItem(url = '', state: 'success' | 'upload' | 'fail' = 'success', uid = uuidv1()) {
  return {
    uid,
    url,
    state
  }
}

export type FileListItem = ReturnType<typeof createFileItem>

function noop() {
  //
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  type = 'button',
  multiple = false,
  value = [],
  showUploadList = false,
  maxCount,
  cropper = false,
  cropperAspectRatio = NaN,
  onChange,
  disabled = false
}) => {
  const myCropper = useRef<ImageCropperDialogRef>(null)

  const [fileList, setFileList, fileListRef] = useStateSync<FileListItem[]>(() => {
    return value.map((v) => createFileItem(v))
  })

  const cropperConfim = useCallback((file: File) => {
    handleUploadFile([file] as unknown as UploadFile<any>[])
  }, [])

  const handleUploadFile = useCallback(async(fileList: UploadFile<any>[]) => {
    const uploadFileList = fileList.map((file) => createFileItem('', 'upload', file.uid))
    setFileList((prev) => {
      return type === 'avatar' ?
        uploadFileList :
        type === 'button' ?
          [...uploadFileList, ...prev] :
          [...prev, ...uploadFileList]
    })
    // console.log(fileListRef.current, fileList.map((file) => uploadImage(file)))
    const response = await Promise.allSettled(fileList.map((file) => uploadImage(file)))
    console.log(response)
    const fulfilledResponse = response.filter(
      (item) => item.status === 'fulfilled'
    ) as unknown as PromiseFulfilledResult<UploadImageReslut<UploadFile>>[]
    const reslut = fulfilledResponse.map((v) => v.value)
    setFileList((prev) => {
      if (type === 'avatar') {
        return [
          reslut.length ?
            createFileItem(reslut[0].fileUrl, 'success', prev[0].uid) :
            createFileItem('', 'fail', prev[0].uid)
        ]
      } else {
        return prev.map((item) => {
          if (item.state === 'upload') {
            const _cur = reslut.filter((v) => v.file.uid === item.uid)[0]
            return createFileItem(_cur ? _cur.fileUrl : '', _cur ? 'success' : 'fail', item.uid)
          } else {
            return item
          }
        })
      }
    })
  }, [])

  const fileChange = useCallback((info: UploadChangeParam) => {
    if (maxCount && fileListRef.current.length === maxCount && type !== 'button') {
      notification.warning({
        message: '图片数量超出限制',
        description: '最多可上传' + maxCount + '张图片'
      })
      return
    }
    const _fileList = info.fileList
    if (
      _fileList.length &&
      fileFormatValidateImage(_fileList, true) &&
      fileSizeValidateImage(_fileList, true)
    ) {
      if (cropper && _fileList.length === 1) {
        const url = window.URL.createObjectURL(_fileList[0] as unknown as Blob)
        myCropper.current?.open(url)
      } else {
        handleUploadFile(_fileList)
      }
    }
  }, [])

  return (
    <>
      <Upload
        listType={type === 'button' ? 'text' : 'picture-card'}
        showUploadList={false}
        accept={FileType.image}
        action='#'
        disabled={disabled}
        onChange={fileChange}
        customRequest={noop}
        multiple={type === 'avatar' ? false : multiple}>
        {type === 'button' ? <Button icon={<UploadOutlined />}>Upload</Button> : type === 'avatar' ? <div /> : <div />}
      </Upload>
      {cropper ? <ImageCropper.Dialog ref={myCropper} onConfim={cropperConfim} aspectRatio={cropperAspectRatio} /> : null}
    </>
  )
}

export default ImageUpload
