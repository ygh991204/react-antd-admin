
/**
 * 文件相关
 */

import { toArray } from './index'
import { notification } from 'antd'
import { v1 as uuidv1 } from 'uuid'

export function getFileExt(origin: File) {
  let ext = ''
  if(origin.name) {
    ext = origin.name.substring(origin.name.lastIndexOf('.'))
  }
  if(!ext) {
    if(origin.type) {
      ext = '.' + origin.type.substring(origin.type.lastIndexOf('/') + 1)
    }
  }
  return ext
}

/** 文件类型 */
export enum FileType {
  image = '.bmp,.jpg,.png,.tif,.gif,.svg,.psd,.webp,.jpeg',
  video = '.avi,.mp4,.3gp,.mkv,.mpg,.mpeg,.rmvb,.wmv,.flv,.mov'
}

interface FileValidateOptions<T = keyof typeof FileType> {
  file: File | File[],
  notificationError?: boolean,
  type?: T
}

/** 校验文件格式 */
export function fileFormatValidate({ file, type = 'image', notificationError = false }: FileValidateOptions) {
  const _format = FileType[type].split(',')
  const files = toArray(file)
  const flag = files.filter(item => _format.indexOf(getFileExt(item)) === -1).length === 0
  if(notificationError && !flag) {
    notification.warning({
      message: type + '文件格式有误',
      description: '正确格式：' + FileType[type]
    })
  }
  return flag
}

/** 校验图片格式 */
export function fileFormatValidateImage(file: FileValidateOptions['file'], notificationError = false) {
  return fileFormatValidate({
    file,
    type: 'image',
    notificationError
  })
}

/** 校验视频格式 */
export function fileFormatValidateVideo(file: FileValidateOptions['file'], notificationError = false) {
  return fileFormatValidate({
    file,
    type: 'video',
    notificationError
  })
}

/** 文件大小 */
export enum FileSize {
  image = 2
}

export function fileSizeValidate({ file, notificationError = false, type = 'image' }: FileValidateOptions<keyof typeof FileSize>) {
  const files = toArray(file)
  const _size = FileSize[type]
  const flag = files.filter(item => (item.size / 1024 / 1024) > _size).length === 0
  if(notificationError && !flag) {
    notification.warning({
      message: type + '文件大小超出限制',
      description: '大小不应超过 ' + FileSize[type] + ' 兆'
    })
  }
  return flag
}

export function fileSizeValidateImage(file: FileValidateOptions['file'], notificationError = false) {
  return fileSizeValidate({
    file,
    type: 'image',
    notificationError
  })
}

export function dataURLtoFile(dataurl: string, name = '') {
  const fileName = (name || uuidv1()) + '.png'
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], fileName, { type: mime ? mime[1] : '' })
}

