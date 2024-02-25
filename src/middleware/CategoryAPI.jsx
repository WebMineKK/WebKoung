
import { myAPI } from "./api.jsx";
import { MyToken } from "./LoginAPI.jsx";

const userToken = JSON.parse(localStorage.getItem('@koungStock'))


const loadDataCategory = async () => {

    try {
        const response = await myAPI.get('category', {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        });

        if (response.status === 200) {
            if (response.data.resultCode === 200) {
                return {
                    data: response?.data,
                };
            }
        }
    } catch (error) {
        // Handle errors
        console.error(error);
        throw error;  // Re-throw the error for the calling component to handle
    }
}

export { loadDataCategory };