import request from '@/utils/request'

// 查询常见问题
export function getCommonQa(pageNum, pageSize) {
    return request({
        url: '/h5/getCommonQaInfo',
        method: 'get'
    })
}