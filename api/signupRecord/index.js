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
