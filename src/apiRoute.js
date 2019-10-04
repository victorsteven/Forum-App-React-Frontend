 
let API_ROUTE

process.env.NODE_ENV === 'development'
  ? API_ROUTE = 'http://127.0.0.1:8888/api/v1'
  : API_ROUTE = 'https://chodapi.com/api/v1'


export default API_ROUTE