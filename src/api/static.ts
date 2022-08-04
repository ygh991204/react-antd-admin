
/**
 * 图片上传
 */

import type { OriginFile } from '@/utils/file'

export type UploadImageReslut<F extends OriginFile = OriginFile> = {
  fileUrl: string,
  file: F
}

export async function uploadImage<F extends OriginFile = OriginFile>(origin: F): Promise<UploadImageReslut<F>> {
  return new Promise((reslove, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(origin as Blob)
    reader.onload = (event) => {
      console.log('onload', event)
      reslove({
        fileUrl: event.target?.result as string,
        file: origin
      })
    }
    reader.onerror = (event) => {
      console.log('onerror', event)
      reject(null)
    }
    reader.onabort = (event) => {
      console.log('onabort', event)
    }
    reader.onloadend = (event) => {
      console.log('onloadend', event)
    }
    reader.onprogress = (event) => {
      console.log('onprogress', event)
    }
    reader.onloadstart = (event) => {
      console.log('onloadstart', event)
    }
  })
}
