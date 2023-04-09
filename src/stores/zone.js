import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useZone = defineStore('zone', () => {
  const zones = ref([])

  const getZones = () => {
    return window.axios.get('zones').then((response) => (zones.value = response.data.data))
  }

  return {
    zones,
    getZones
  }
})
