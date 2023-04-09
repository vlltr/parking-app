import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useParking = defineStore('parking', () => {
  const router = useRouter()
  const errors = reactive({})
  const loading = ref(false)
  const parkings = ref([])
  const stoppedParkings = ref([])
  const parkingDetails = ref({})

  const form = reactive({
    vehicle_id: null,
    zone_id: null
  })

  const resetForm = () => {
    form.vehicle_id = null
    form.zone_id = null

    errors.value = {}
  }

  const startParking = () => {
    if (loading.value) return

    loading.value = true
    errors.value = {}

    return window.axios
      .post('/parkings/start', form)
      .then(() => {
        router.push({ name: 'parkings.active' })
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors
        }
      })
      .finally(() => (loading.value = false))
  }

  const getActiveParkings = () => {
    return window.axios.get('parkings').then((response) => {
      parkings.value = response.data.data
    })
  }

  const stopParking = (parking) => {
    return window.axios.put(`parkings/${parking.id}`).then(getActiveParkings)
  }

  const getStoppedParkings = () => {
    return window.axios.get('parkings/history').then((response) => {
      stoppedParkings.value = response.data.data
    })
  }

  const resetParkingDetails = () => {
    parkingDetails.value = {}
  }

  const getParking = (parking) => {
    return window.axios
      .get(`parkings/${parking.id}`)
      .then((response) => {
        parkingDetails.value = response.data.data
      })
      .catch((error) => {
        if (error.response.status === 404) {
          router.push({ name: 'not-found' })
        }
      })
  }

  return {
    form,
    errors,
    loading,
    resetForm,
    startParking,
    parkings,
    getActiveParkings,
    stopParking,
    getStoppedParkings,
    stoppedParkings,
    parking: parkingDetails,
    getParking,
    resetParkingDetails
  }
})
