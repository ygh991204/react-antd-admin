
/**
 * 图片上传
 */

export type UploadImageReslut<F = File> = {
  fileUrl: string,
  file: F
}

export async function uploadImage<F extends File = File>(origin: F): Promise<UploadImageReslut<F>> {
  return new Promise((reslove) => {
    const reader = new FileReader()
    reader.readAsDataURL(origin)
    reader.onload = (event) => {
      reslove({
        fileUrl: event.target?.result as string,
        file: origin
      })
    }
  })
}
