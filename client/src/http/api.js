import axios from 'axios'

const main_URL = process.env.API_URL

const $api = axios.create({
  baseURL: main_URL,
  withCredentials: true,
})

$api.interceptors.request.use((config) => {
    const token = `Bearer ${localStorage.getItem('token')}`
          console.log("Interceptor Token", token)
        config.headers.Authorization = token
          console.log("Interceptor Config", config)
        return config;
    }, 
    (error) => {
    return Promise.reject(error);
  }
)

$api.interceptors.response.use((config) => {
  return config;
}, 
async (error) => {
  const originalConfig = error.config;

  if ((originalConfig.url !== "/api/auth/login" || originalConfig.url !== "/api/auth/soclogin") && error.response) {
    // Access Token was expired
      if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalConfig._isRetry = true;
        try {
          const response = await axios.get(`${main_URL}/api/auth/refresh`, {
            withCredentials: true
          })
          localStorage.setItem('token', response.data.accessToken);
          return $api.request(originalConfig);
        } catch (error) {
          console.log('No authorization', error.message)
          return Promise.reject(error)
        }
      }
  }
  throw error;
})

export default $api;