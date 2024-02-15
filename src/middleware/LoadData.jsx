import { data } from "autoprefixer";
import { myAPI } from "./api";

const loadDataCustomer = async (userToken) => {
    try {
        const response = await myAPI.get('customer', {
            headers: {
                'Authorization': `Bearer ${userToken}`
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
        // Handle errors
        console.error(error);
        throw error;  // Re-throw the error for the calling component to handle
    }
}

const loadDataCategory = async (userToken) => {
    try {
        const response = await myAPI.get('category', {
            headers: {
                'Authorization': `Bearer ${userToken}`
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

const loadDataCar = async (userToken) => {
    try {
        const response = await myAPI.get('car', {
            headers: {
                'Authorization': `Bearer ${userToken}`
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

const loadDataPreOrder = async (userToken) => {
    try {
        const response = await myAPI.get('order', {
            headers: {
                'Authorization': `Bearer ${userToken}`
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

export { loadDataCustomer, loadDataCategory, loadDataCar, loadDataPreOrder, loadDataProduct };