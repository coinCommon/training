import axios from "axios";

const $host = axios.create({
    baseURL: 'http://localhost:5000/'
})

const $autoHost = axios.create({
    baseURL: 'http://localhost:5000/'
})

// const authInterceptor = config => {
//     config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
//     return config
// }
// $autoHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $autoHost
}