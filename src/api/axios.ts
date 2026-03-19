import axios, { type AxiosInstance } from "axios";
import { BASEURL } from "../config";

// The defaults can get overidden if you change it somewere else in the code

const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASEURL,
    timeout: 3000,
    headers: {
        Authorization: "Bearer token-one",
        "Content-Type": "application/json"
    },
})

// Another way of adding defaults

axiosInstance.defaults.headers.common["Authorization"] = "Bearer token-two" // this isn't overiding earlier default
// axiosInstance.defaults.baseURL = BASEURL

export default axiosInstance