import upload from '@/utils/upload'
import request from '@/utils/request'
import { encrypt } from '@/utils/jsencrypt'

// 用户密码重置
export function updateUserPwd(email, oldPassword, newPassword, code) {
  oldPassword = encrypt(oldPassword)
  newPassword = encrypt(newPassword)
  const data = {
    email,
    oldPassword,
    newPassword,
    code
  }
  return request({
    url: '/h5/userInfo/auth/updatePwd',
    method: 'put',
    data: {'questions': data}
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/h5/userInfo/auth/getUserInfo',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/h5/userInfo/auth/update',
    method: 'put',
    data: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return upload({
    url: '/h5/userInfo/auth/avatar',
    name: data.name,
    filePath: data.filePath
  })
}

// 获取修改密码验证码
export function getUpdatePwdCode(data) {
  return request({
    url: '/h5/getUpdatePwdCode/' + data,
    method: 'get'
  })
}
