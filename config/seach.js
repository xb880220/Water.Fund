const http = uni.$u.http

export const searchproductlistApi = (data) => http.post('/api/fund/products/searchproductlist',data)


export const searchallwebsitelistApi = (data) => http.post('/api/fund/products/searchallwebsitelist',data)
