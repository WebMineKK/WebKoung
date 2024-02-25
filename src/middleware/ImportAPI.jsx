import { MyToken } from "./LoginAPI.jsx";
import { myAPI } from "./api.jsx";

// const userToken = MyToken()
const userToken = JSON.parse(localStorage.getItem('@koungStock'))

const queryDataImport = async (page, pageSize) => {
    try {
        const response = await myAPI.post('get_import', {
            page: page,
            limit: pageSize
        }, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        });

        if (response.status === 200) {
            return {
                data: response?.data,
                total: response?.data?.total,
            };
        }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

const postCreateImport = async ({ senddata }) => {
    try {
        const response = await myAPI.post('create_import', senddata, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        })
        if (response.status === 200) return { data: response };
        else return { data: response };
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
};

const postQueryImportById = async (id) => {
    try {
        const response = await myAPI.post('select_one_import', { im_id: id }, {
            headers: {
                'Authorization': `Bearer ${userToken?.token}`
            },
        })
        // console.log(response?.data);
        if (response.status === 200) return { data: response?.data };
        else return { data: response?.data };
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
};



export { queryDataImport, postCreateImport, postQueryImportById };