import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`
});

const { get, post, patch, delete: destroy } = axiosInstance
export { get, post, patch, destroy }
