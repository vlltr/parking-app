import { useAuth } from '@/stores/auth'
import axios from 'axios'

window.axios = axios

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
// window.axios.defaults.withCredentials = true
window.axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
window.axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { destroyTokenAndRedirectTo } = useAuth()
      destroyTokenAndRedirectTo()
    }

    return Promise.reject(error)
  }
)

if (localStorage.getItem('access_token')) {
  window.axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
    'access_token'
  )}`
}
