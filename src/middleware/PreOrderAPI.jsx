import { MyToken } from "./LoginAPI.jsx";
import { myAPI } from "./api.jsx";

const userToken = JSON.parse(localStorage.getItem('@koungStock'))

const loadDataPreOrder = async ({ filter, page, limit }) => {
    try {
        const response = await myAPI.post('order', {
            status: filter,
            page: page,
            limit: limit
        }, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        })

        if (response.status === 200) {
            if (response?.data?.resultCode === 200) {
                return {
                    data: response?.data?.data,
                    total: response?.data?.total,
                }
            }
        } else {
            if (response?.data?.resultCode === 210) {
                return {
                    data: [],
                    total: 10,
                }
            }
        }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

const loadDataPreOrderByID = async ({ id }) => {
    try {
        const response = await myAPI.post('select_one_order', {
            o_id: id
        }, {
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
        throw new Error('Failed to post API request:', error);
    }
}

const postCreatePreOrder = async ({ senddata }) => {
    try {
        const response = await myAPI.post('create_order', senddata, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        })
        if (response.status === 200) return { data: response?.data }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

const postCheckOrderSuccess = async ({ senddata }) => {
    try {
        const response = await myAPI.post('check_order', senddata, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        })
        if (response.status === 200) return { data: response?.data }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

const postPackingPreOrder = async ({ senddata }) => {
    try {
        const response = await myAPI.post('car_order', senddata, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        })
        console.log(response);
        if (response.status === 200) return { data: response }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

const postCloseOrder = async ({ senddata }) => {
    try {
        const response = await myAPI.post('success_order', senddata, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        })
        console.log(response);
        if (response.status === 200) return { data: response }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

const postCancelOrder = async ({ senddata }) => {
    try {
        const response = await myAPI.post('order_cancel', senddata, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        })
        console.log(response);
        if (response.status === 200) return { data: response }
        if (response.status === 299) return { data: response }

    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

const quertPreOrderByCar = async ({ filter, page, limit }) => {
    try {
        const response = await myAPI.post('order_car', {
            status: filter,
            page: page,
            limit: limit
        }, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        })

        if (response.status === 200) {
            if (response?.data?.resultCode === 200) {
                return {
                    data: response?.data?.data,
                    total: response?.data?.total,
                }
            }
        } else {
            if (response?.data?.resultCode === 210) {
                return {
                    data: [],
                    total: 10,
                }
            }
        }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

export {
    loadDataPreOrder, loadDataPreOrderByID, postCheckOrderSuccess,
    postCreatePreOrder, postPackingPreOrder, postCloseOrder, postCancelOrder,
    quertPreOrderByCar
}