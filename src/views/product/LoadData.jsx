import { myAPI } from "../../middleware/api";

const loadDataProduct = async (userToken) => {
    try {
        const response = await myAPI.get('product', {
            headers: {
                'Authorization': `Bearer ${userToken}`
            },
        });

        if (response.status === 200) {
            if (response.data.resultCode === 200) {
                return {
                    data: response?.data?.data,
                    // total: response?.data?.total,
                }
            }
        }
    } catch (error) {
        // Handle errors
        console.error(error);
        throw error;  // Re-throw the error for the calling component to handle
    }
};

export { loadDataProduct };