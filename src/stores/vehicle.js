import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

export const useVehicle = defineStore('vehicle', () => {
  const router = useRouter()

  const errors = reactive({})
  const loading = ref(false)
  const form = reactive({
    plate_number: '',
    description: ''
  })

  const vehicles = ref([])

  const resetForm = () => {
    form.plate_number = ''
    form.description = ''

    errors.value = {}
  }

  const storeVehicle = () => {
    if (loading.value) return

    loading.value = true
    errors.value = {}

    return window.axios
      .post('vehicles', form)
      .then(() => {
        router.push({ name: 'vehicles.index' })
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors
        }
      })
      .finally(() => (loading.value = false))
  }

  const getVehicles = () => {
    return window.axios.get('vehicles').then((response) => (vehicles.value = response.data.data))
  }

  const updateVehicle = (vehicle) => {
    if (loading.value) return
    loading.value = true
    errors.value = {}

    return window.axios.put(`vehicles/${vehicle.id}`, form).then(() => {
      router
        .push({ name: 'vehicles.index' })
        .catch((error) => {
          if (error.response.status === 422) {
            errors.value = error.response.data.errors
          }
        })
        .finally(() => (loading.value = false))
    })
  }

  const getVehicle = (vehicle) => {
    return window.axios
      .get(`vehicles/${vehicle.id}`)
      .then((response) => {
        form.plate_number = response.data.data.plate_number
        form.description = response.data.data.description
      })
      .catch((error) => {
        if (error.response.status === 404) {
          router.push({ name: 'not-found' })
        }
      })
  }

  const deleteVehicle = (vehicle) => {
    return window.axios.delete(`vehicles/${vehicle.id}`).then(getVehicles)
  }

  return {
    form,
    errors,
    loading,
    resetForm,
    storeVehicle,
    vehicles,
    getVehicles,
    updateVehicle,
    getVehicle,
    deleteVehicle
  }
})
