import { myAPI } from "../../middleware/api";

const loadDataImport = async (page, pageSize, userToken) => {
    try {
        const response = await myAPI.post('get_import', {
            page: page,
            limit: pageSize
        }, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            },
        });

        if (response.status === 200) {
            return {
                data: response?.data,
                total: response?.data?.total,
            };
        }
    } catch (error) {
        // Handle errors
        console.error(error);
        throw error;  // Re-throw the error for the calling component to handle
    }
};

export { loadDataImport };