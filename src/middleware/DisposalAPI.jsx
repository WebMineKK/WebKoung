import { myAPI } from "./api.jsx";

const userToken = JSON.parse(localStorage.getItem('@koungStock'))


const qureyDataDisposal = async ({ page, limit }) => {
    try {
        const response = await myAPI.post('get_disposal', {
            page: page,
            limit: limit
        }, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        })
        if (response.status === 200) {
            return {
                data: response?.data?.data,
                total: response?.data?.total,
            }
            // if (response.data.resultCode === 200) {
            // }
        }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

const postCreateDisposal = async ({ senddata }) => {
    try {
        const response = await myAPI.post('create_disposal', senddata, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        })
        if (response.status === 200) {
            return { data: response }
            // if (response.data.resultCode === 200) {
            // }
        }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

export { qureyDataDisposal, postCreateDisposal }