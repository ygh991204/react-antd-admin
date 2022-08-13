/** 存储数据类型 */

import type { LanguageType } from '@/language'

export interface StorageData {
  sideBarOpend: boolean
  language: LanguageType
  device: 'mobile' | 'desktop'
  settingLogo: boolean
  settingTabs: boolean
}

export type StorageType = keyof StorageData

function storageGet<K extends StorageType = StorageType, D extends StorageData[K] = StorageData[K]>(key: K): D | null {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data).value : null
}

function storageSet<K extends StorageType = StorageType, T extends StorageData[K] = StorageData[K]>(key: K, value: T) {
  localStorage.setItem(
    key,
    JSON.stringify({
      value
    })
  )
}

function storageRemove(key: StorageType) {
  localStorage.removeItem(key)
}

function storageClear() {
  localStorage.clear()
}

const Storage = {
  set: storageSet,
  remove: storageRemove,
  get: storageGet,
  clear: storageClear
}

export default Storage
