import { ref, provide, inject } from 'vue'

export const useUser = () => {
  const userId = ref(null)

  const setUserId = (id) => {
    userId.value = id
  }

  provide('userId', userId)
  provide('setUserId', setUserId)
}

export const useUserId = () => {
  return inject('userId')
}

export const useSetUserId = () => {
  return inject('setUserId')
}