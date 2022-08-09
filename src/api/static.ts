
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
      reslove({
        fileUrl: event.target?.result as string,
        file: origin
      })
    }
    reader.onerror = () => {
      reject(null)
    }
  })
}
