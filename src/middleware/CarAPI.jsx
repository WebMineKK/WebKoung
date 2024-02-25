import { MyToken } from "./LoginAPI.jsx";
import { myAPI } from "./api.jsx";

const userToken = JSON.parse(localStorage.getItem('@koungStock'))


const queryDataCar = async () => {
    try {
        const response = await myAPI.get('car', {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        });

        if (response.status === 200) {
            // if (response.data.resultCode === 200) {
            // }
            return {
                data: response?.data,
            }
        }
    } catch (error) {
        // Handle errors
        console.error(error);
        throw error;  // Re-throw the error for the calling component to handle
    }
}

export { queryDataCar };