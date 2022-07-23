namespace ReqRes {
  /**
   * 定义接口返回的固定格式
   * { code => 状态码, msg => '响应信息', data => 数据 }
   */
  export interface ResponseResult<T = any> {
    code: number
    msg: string
    data: T
  }
}
