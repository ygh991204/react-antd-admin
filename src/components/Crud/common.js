import { notification } from 'antd'

export const STATUS = {
  /** 查看 */
  RETRIEVE: 1,
  /** 创建中 */
  CREATE: 2,
  /** 更新中 */
  UPDATE: 3,
  /** 删除中 */
  DELETE: 4,
  /** 创建 - 提交 */
  CREATE_SUBMIT: 5,
  /** 修改 - 提交 */
  UPDATE_SUBMIT: 6,
  /** 删除 - 提交 */
  DELETE_SUBMIT: 7
}

export const TITLE = {
  [STATUS.RETRIEVE]: '',
  [STATUS.CREATE]: '添加',
  [STATUS.CREATE_SUBMIT]: '添加',
  [STATUS.UPDATE]: '编辑',
  [STATUS.UPDATE_SUBMIT]: '编辑',
  [STATUS.DELETE]: '删除',
  [STATUS.CREATE_SUBMIT]: '删除'
}

export const NOTIFICATION = {
  [STATUS.RETRIEVE]() {},
  [STATUS.CREATE_SUBMIT]() {
    notification.success({
      message: '添加成功'
    })
  },
  [STATUS.UPDATE_SUBMIT]() {
    notification.success({
      message: '编辑成功'
    })
  },
  [STATUS.DELETE_SUBMIT]() {
    notification.success({
      message: '删除成功'
    })
  }
}

export const HOOKS = {
  beforeInitQuery: 'beforeInitQuery',
  /** 刷新 - 之前 */
  beforeRefresh: 'beforeRefresh',
  /** 重置 - 之前 */
  beforeReset: 'beforeReset',
  /** "新建/编辑" - 之前 */
  beforeToCU: 'beforeToCU',
  /** 新建 - 之前 */
  beforeToCreate: 'beforeToCreate',
  /** 编辑 - 之前 */
  beforeToUpdate: 'beforeToUpdate',
  /** 提交 - 之前 */
  beforeSubmitCU: 'beforeSubmitCU'

  //   /** 编辑 - 之后 */
  //   afterToUpdate: 'afterToUpdate',
  //   /** 刷新 - 之后 */
  //   afterRefresh: 'afterRefresh',
  //   /** 新建 - 之后 */
  //   afterToCreate: 'afterToCreate',
  //   /** 开始 "新建/编辑" - 之后 */
  //   afterToCU: 'afterToCU',
  //   /** 提交 - 之后 */
  //   afterSubmitCU: 'afterSubmitCU'
  //   /** 重置 - 之后 */
  //   afterReset: 'afterReset',
  //   /** 删除 - 之前 */
  //   beforeDelete: 'beforeDelete',
  //   /** 删除 - 之后 */
  //   afterDelete: 'afterDelete',
  //   /** 删除取消 - 之前 */
  //   beforeDeleteCancel: 'beforeDeleteCancel',
  //   /** 删除取消 - 之后 */
  //   afterDeleteCancel: 'afterDeleteCancel',
  //   /** 添加取消 - 之前 */
  //   beforeCreateCancel: 'beforeCreateCancel',
  //   /** 添加取消 - 之后 */
  //   afterCreateCancel: 'afterCreateCancel',
  //   /** 编辑取消 - 之前 */
  //   beforeUpdateCancel: 'beforeUpdateCancel',
  //   /** 编辑取消 - 之后 */
  //   afterUpdateCancel: 'afterUpdateCancel'
}

export const DEFAULT_OPTIONS = {
  time: 500,
  idField: 'id',
  title: '',
  url: '',
  query: {},
  params: {},
  defaultForm: {},
  crudMethod: {
    create: (form) => {},
    del: (id) => {},
    update: (form) => {}
  },
  operationShow: {
    add: true,
    del: true,
    reset: true
  },
  props: {},
  queryOnPresenterCreated: true,
  childrenName: 'children',
  pageSize: 10
}
