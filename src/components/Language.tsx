import type { PropsWithChildren } from 'react'
import { Menu, Dropdown } from 'antd'
import { changeAppLange } from '@/store/modules/appSlice'
import { useAppDispatch, useAppSelector } from '@/store'
import { languageList } from '@/language'

function Language({ children }: PropsWithChildren) {
  const language = useAppSelector((state) => state.app.language)
  const dispatch = useAppDispatch()
  return (
    <Dropdown
      overlay={
        <Menu
          onClick={({ key }) => {
            dispatch(changeAppLange(key as AppLanguage))
          }}
          items={languageList.map((v) => ({
            ...v,
            disabled: language === v.key
          }))}
        />
      }>
      {children}
    </Dropdown>
  )
}

export default Language
