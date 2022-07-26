import { Menu, Dropdown } from 'antd'
import { changeAppLange } from '@/store/modules/language'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/store'

const Language: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const { lang, langs } = useAppSelector((state) => state.language)
  const dispatch = useAppDispatch()
  return (
    <Dropdown
      overlay={
        <Menu
          onClick={({ key }) => {
            dispatch(changeAppLange(key as AppLange))
          }}
          items={langs.map((v) => ({
            ...v,
            disabled: lang === v.key
          }))}
        />
      }>
      {children}
    </Dropdown>
  )
}

export default Language
