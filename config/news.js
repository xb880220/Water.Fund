const http = uni.$u.http

export const getDetailsApi = (id) => http.get('/api/fund/news/getarticlemodel/'+id)

export const getarticlepagedlistApi = (data) => http.post('/api/fund/news/getarticlepagedlist',data)
