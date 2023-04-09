import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from './auth'

export const useLogin = defineStore('login', () => {
  const { login } = useAuth()
  const errors = reactive({})
  const loading = ref(false)
  const form = reactive({
    email: '',
    password: '',
    remember: false
  })

  const resetForm = () => {
    form.email = ''
    form.password = ''
    form.remember = false

    errors.value = {}
  }

  const handleSubmit = async () => {
    if (loading.value) return

    loading.value = true
    errors.value = {}

    return window.axios
      .post('auth/login', form)
      .then((response) => {
        login(response.data.access_token)
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors
        }
      })
      .finally(() => {
        form.password = ''
        loading.value = false
      })
  }

  return { form, errors, loading, resetForm, handleSubmit }
})
