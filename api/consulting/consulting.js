import request from '@/utils/request'

// 用户咨询记录
export function getConsultingRecord(pageNum, pageSize) {
    return request({
        url: '/h5/consulting/auth/list/' + pageNum + '/' + pageSize,
        method: 'get'
    })
}

// 用户提交咨询问题
export function submitConsulting(data) {
    return request({
        url: '/h5/consulting/auth/add',
        method: 'post',
        data: data
    })
}

// 用户查看咨询详情
export function consultDetail(id) {
    return request({
        url: '/h5/consulting/auth/detail/' + id,
        method: 'get'
    })
}