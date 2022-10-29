const HOST = process.env.HOST || 'http://192.168.3.10:9200/kun-blog'
const KUN_BASE_URL = process.env.KUN_BASE_URL || 'http://192.168.3.10:9200/kun-blog'
const api = {
  // 设置的请求host地址
  HOST,
  // 后端接口基础路径
  KUN_BASE_URL,
  // 获取验证码接口路径
  GET_CODE_URL: `${KUN_BASE_URL}/api/auth/getCode`,
  // rsa公钥
  RSA_PUBILC_KEY: `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrM+z/DwD4zf0Czl8/fg7B+mfZ89+LIzNoFBkLVYzSF+NMtIovovlZd33Lgjpi73EqQM7a5SQhTbzfVF/VQyvVwjoEv3zVfW1s5KqV8NI+1fQtZ8Ef/vFDOKEz5CYxzJggvXIQFvpbJPvupWWxV84O5oeneTQzI3aqlOIknoHDzQIDAQAB`,
  // 校验验证码接口路径
  VALIDATED_CODE_URL: `${KUN_BASE_URL}/api/auth/validatedCode`,
  // 注册接口路径
  REGISTER_URL: `${KUN_BASE_URL}/api/auth/register`,
  // 登录接口路径
  LOGIN_URL: `${KUN_BASE_URL}/api/auth/login`,
  // 获取配置接口路径
  GET_CONFIG_URL: `${KUN_BASE_URL}/api/config/get`,

}
export default api
