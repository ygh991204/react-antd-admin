
import { useAuth } from '@/utils/auth'

export default ({ permissions = [], render, children }) => {
  const auth = useAuth(permissions)
  return <>{ auth ? (render || children || null) : null }</>
}
