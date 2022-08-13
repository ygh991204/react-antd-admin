/**
 * 图片上传
 */

export type UploadImageReslut<F extends File = File> = {
  fileUrl: string
  file: F
}

export async function uploadImage<F extends File = File>(origin: F): Promise<UploadImageReslut<F>> {
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
