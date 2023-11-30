import request from '@/utils/request'

// 用户查询报名记录
export function getSignUpRecord(pageNum, pageSize) {
    return request({
        url: '/h5/signUpRecord/auth/getSignUpRecordList/' + pageNum + '/' + pageSize,
        method: 'get'
    })
}

// 用户查询报名记录明细
export function getSignUpRecordDetail(id) {
    return request({
        url: '/h5/signUpRecord/auth/getSignUpDetail/' + id,
        method: 'get'
    })
}

// 查询问题剩余修改次数
export function getQuestionUpdateTimes(id) {
    return request({
        url: '/h5/signUpRecord/auth/getTheRestOfQuestionUpdateTimes/' + id,
        method: 'get'
    })
}

// 修改问题
export function updateQuestion(data) {
    return request({
        url: '/h5/signUpRecord/auth/update',
        method: 'put',
        data: data
    })
}

// 查询选择题选项
export function getOptions(id) {
    return request({
        url: '/h5/signUpRecord/auth/getChoiceQuestion/' + id,
        method: 'get'
    })
}