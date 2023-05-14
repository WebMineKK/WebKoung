import axios from 'axios'
export const NewAxios = axios.create({
    baseURL: "http://172.28.26.146:12345/",
})