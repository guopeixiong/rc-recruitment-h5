import request from '@/utils/request'
import { encrypt } from '@/utils/jsencrypt'

// 登录方法
export function login(stuNum, password) {
  password = encrypt(password);
  const data = {
    stuNum,
    password
  }
  return request({
    'url': '/h5/login',
    headers: {
      isToken: false
    },
    'method': 'post',
    'data': data
  })
}

// 验证码登录方法
export function loginByCode(email, code) {
  const data = {
    email,
    code
  }
  return request({
    'url': '/h5/loginByCode',
    headers: {
      isToken: false
    },
    'method': 'post',
    'data': data
  })
}

// 注册方法
export function register(data) {
  data.password = encrypt(data.password)
  return request({
    url: '/h5/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    'url': '/h5/userInfo/auth/getUserInfo',
    'method': 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/h5/logout',
    method: 'get'
  })
}

// 获取登录验证码
export function getLoginCode(data) {
  return request({
    'url': '/h5/getLoginCode/' + data,
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}

// 获取注册验证码
export function getRegisterCode(data) {
  return request({
    'url': '/h5/getRegisterCode/' + data,
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}

// 获取重置密码验证码
export function getRestPwdCode(data) {
  return request({
    url: '/h5/getForgetPwdCode/' + data,
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}

// 重置密码
export function resetPwd(email, password, code) {
  password = encrypt(password)
  const data = {
    email,
    password,
    code
  }
  return request({
    'url': '/h5/resetPwd',
    headers: {
      isToken: false
    },
    'method': 'post',
    'data': data
  })
}