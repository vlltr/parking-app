import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from '../stores/auth'

export const useRegister = defineStore('register', () => {
  const { login } = useAuth()

  const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const errors = reactive({})

  const loading = ref(false)

  const resetForm = () => {
    form.name = ''
    form.email = ''
    form.password = ''
    form.password_confirmation = ''
    errors.value = {}
  }

  const handleSubmit = async () => {
    if (loading.value) return

    loading.value = true
    errors.value = {}

    return window.axios
      .post('auth/register', form)
      .then((response) => {
        console.log(response.data.access_token)
        login(response.data.access_token)
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors
        }
      })
      .finally(() => {
        form.password = ''
        form.password_confirmation = ''
        loading.value = false
      })
  }

  return { form, errors, loading, resetForm, handleSubmit }
})
