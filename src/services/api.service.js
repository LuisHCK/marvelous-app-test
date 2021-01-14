import axios from 'axios'

const API_KEY = process.env.GATSBY_APIKEY
const SERVER_URL = process.env.GATSBY_SERVER_URL

// Use Axios interceptor to inject apikey param
const httpClient = axios.create({
    baseURL: SERVER_URL,
})

httpClient.interceptors.request.use((config) => {
    config.params = { ...config.params, apikey: API_KEY }
    return config
})

export default httpClient

/**
 * Build endpoint path
 * @param {String} base Base path
 * @param  {...String} path Sub routes
 * @returns {String} path
 */
export const buildPath = (...path) => path.join('/')
