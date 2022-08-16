
import { formatAppEnv } from '../build/util'

export const EnvConfig = formatAppEnv(import.meta.env as unknown as AppEnv)
