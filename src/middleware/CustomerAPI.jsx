import { MyToken } from "./LoginAPI.jsx"
import { myAPI } from "./api.jsx"

const userToken = JSON.parse(localStorage.getItem('@koungStock'))

const loadDataCustomer = async () => {
    try {
        const response = await myAPI.get('customer', {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        });

        if (response.status === 200) {
            if (response.data.resultCode === 200) {
                return {
                    data: response?.data,
                }
            }
        }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

export { loadDataCustomer };