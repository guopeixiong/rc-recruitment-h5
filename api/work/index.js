import request from '@/utils/request'

// 获取报名表单
export function getSignUpForm() {
    return request({
      url: '/h5/signUp/getForm',
      method: 'get'
    })
}
// 用户提交表单
export function submitForm(data) {
    return request({
        url: '/h5/signUp/auth/submit',
        method: 'post',
        data: data
    })
}