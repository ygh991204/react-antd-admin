
import { Menu, Dropdown } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { changeAppLange } from '@/store/modules/language'

const Language = ({ children }) => {
  const { lang, langs } = useSelector(state => state.language)
  const dispatch = useDispatch()
  return (
    <Dropdown overlay={<Menu onClick={({ key }) => {
      dispatch(changeAppLange(key))
    }} items={langs.map(v => ({
      ...v,
      disabled: lang === v.key
    }))}/>}>
      { children }
    </Dropdown>
  )
}

export default Language
