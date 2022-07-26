import { v1 as uuidv1 } from 'uuid'

export function createCommodity(id: string, name: string, price: number, count = 1) {
  return {
    barcode: uuidv1(),
    id,
    name,
    count,
    price: price,
    totalPrice: count * price
  }
}

export type Commodity = ReturnType<typeof createCommodity>

export default {
  id: uuidv1(),
  state: '已发货',
  store: '数码旗舰店',
  express: '顺丰快递 SF123456789101',
  freight: 0,
  user: {
    name: '张三',
    tel: '13188888888',
    express: '顺丰快递',
    address: '广东省深圳市南山区xxxxxx',
    remark: '无'
  },
  commoditys: [
    createCommodity('12345', '笔记本', 4600),
    createCommodity('12346', '鼠标', 100, 2),
    createCommodity('12347', '键盘', 200),
    createCommodity('12348', '电脑双肩包', 300),
    createCommodity('12349', '钢化膜', 10, 5)
  ]
}
