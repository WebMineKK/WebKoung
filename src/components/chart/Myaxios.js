import axios from 'axios'
const Myaxios = axios.create({
    baseURL: "http://localhost:5190/api/",
})

export default Myaxios