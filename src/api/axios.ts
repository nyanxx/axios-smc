import axios, { type AxiosInstance } from "axios";
import { BASEURL } from "../config";

// The defaults can get overidden if you change it somewhere else in the code

const token = "example.jwt.token";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASEURL,
    timeout: 3000,
    // headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json"
    // },
})

// Request interceptors modify requests before they are sent.
axiosInstance.interceptors.request.use((config) => {
    console.log("Executed from request interceptors")
    console.log("Config:", config)
    console.log(`Request sent at ${Date.now()} for URL: "${config.baseURL}${config.url}"`,)
    config.headers.Authorization = `Bearer ${token}`
    const additionData = { message: "This object was added through request interceptors" }
    return { ...config, additionData }
})

// Response interceptors modify response as soon as they are recieved.
axiosInstance.interceptors.response.use((config) => {
    console.log("Executed from response interceptors")
    console.log("Config:", config)
    const additionData = { message: "This object was added through response interceptors" }
    return { ...config, additionData }
})

// Another way of adding defaults

axiosInstance.defaults.headers.common["Authorization"] = "Bearer token-two" // this isn't overiding earlier default // used for globals
// axiosInstance.defaults.baseURL = BASEURL

export default axiosInstance
