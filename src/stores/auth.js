import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export const useAuth = defineStore('auth', () => {
  const router = useRouter()
  const accessToken = useStorage('access_token', '')
  const check = computed(() => !!accessToken.value)

  const setAccessToken = (value) => {
    accessToken.value = value
    window.axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken.value}`
  }

  const login = (accessToken) => {
    setAccessToken(accessToken)

    router.push({ name: 'vehicles.index' })
  }

  const destroyTokenAndRedirectTo = (routeName = 'login') => {
    setAccessToken(null)
    router.push({ name: routeName })
  }

  const logout = async () => {
    return window.axios.post('auth/logout').finally(() => {
      destroyTokenAndRedirectTo()
    })
  }

  return { login, logout, check, destroyTokenAndRedirectTo }
})
