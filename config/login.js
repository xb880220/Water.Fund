const http = uni.$u.http


export const registerApi = (params, config = {}) => http.post('/api/fund/home/register', params, config)


export const getMenu = (data) => http.get('/ebapi/public_api/index', data)


export const userLoginApi = (params, config = {}) => http.post('/api/fund/home/login', params, config)