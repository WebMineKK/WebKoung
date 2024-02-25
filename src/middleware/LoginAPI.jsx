import { myAPI } from "./api.jsx";

const postLogin = async ({ senddata }) => {
    try {
        const response = await myAPI.post('login', senddata);
        // console.log(response);
        if (response.status === 200) {
            if (response.data.resultCode === 200) {
                return {
                    data: response,
                }
            }
        }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

const MyToken = () => {
    const userToken = JSON.parse(localStorage.getItem('@koungStock'))
    if (userToken) return userToken
}

export { postLogin, MyToken };