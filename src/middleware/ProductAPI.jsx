import { MyToken } from "./LoginAPI.jsx";
import { myAPI } from "./api.jsx";

const userToken = JSON.parse(localStorage.getItem('@koungStock'))


const loadDataProduct = async ({ page, limit, token }) => {
    try {
        const response = await myAPI.post('product', {
            page: page,
            limit: limit
        }, {
            headers: {
                'Authorization': `Bearer ${token?.token}`
            },
        })
        if (response.status === 200) {
            if (response.data.resultCode === 200) {
                return {
                    data: response?.data?.data,
                    total: response?.data?.total,
                }
            }
        }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

const postCreateProduct = async ({ senddata }) => {
    try {
        const response = await myAPI.post('add_product', senddata, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        })
        if (response.status === 200) return { data: response?.data }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

const putUpdateProduct = async ({ senddata }) => {
    try {
        const response = await myAPI.put('product', senddata, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        })
        if (response.status === 200) return { data: response?.data }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

const postDeleteProduct = async ({ senddata }) => {
    try {
        const response = await myAPI.post('dl_product', senddata, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        })
        if (response.status === 200) return { data: response?.data }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

export { loadDataProduct, postCreateProduct, putUpdateProduct, postDeleteProduct };