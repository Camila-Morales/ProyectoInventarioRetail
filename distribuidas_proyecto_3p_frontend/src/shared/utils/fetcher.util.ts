import { AxiosInstance } from 'axios'

export function setApiAuthToken(axiosInstance: AxiosInstance, token: string | null) {
  if (token) {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`
  } else {
    delete axiosInstance.defaults.headers['Authorization']
  }
}
