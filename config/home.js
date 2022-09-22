const http = uni.$u.http

export const getHomeDataApi = (data) => http.get('/api/fund/home/configs')

export const getcollectionlistApi = (data) => http.get('/api/fund/collection/getcollectionlist')

export const getDetailsApi = (id) => http.post('/api/fund/products/getproduct',{id:id})

export const joincollectionApi = (id) => http.post('/api/fund/collection/joincollection',{porductsId:id})