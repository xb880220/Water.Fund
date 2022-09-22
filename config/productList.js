const http = uni.$u.http

export const getClassListApi = (data) => http.post('/api/fund/products/getproductlist',data)

export const getproductsalllistApi = (data) => http.post('/api/fund/products/getproductsalllist')
