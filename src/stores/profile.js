import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useProfile = defineStore('profile', () => {
  const errors = reactive({})
  const status = ref('')
  const loading = ref(false)
  const form = reactive({
    name: '',
    email: ''
  })

  const resetForm = () => {
    form.name = ''
    form.email = ''

    errors.value = {}
    status.value = ''
  }

  const fetchProfile = async () => {
    return window.axios.get('profile').then((response) => {
      form.name = response.data.name
      form.email = response.data.email
    })
  }

  const updateProfile = async () => {
    if (loading.value) return

    errors.value = {}
    status.value = ''

    return window.axios
      .put('profile', form)
      .then((response) => {
        form.name = response.data.name
        form.email = response.data.email
        status.value = 'Profile has been updated.'
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors
        }
      })
      .finally(() => {
        loading.value = false
      })
  }

  return { form, loading, errors, resetForm, status, fetchProfile, updateProfile }
})
