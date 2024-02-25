import { myAPI } from "./api.jsx";

const postUploadImage = async (senddata) => {
    try {
        const response = await myAPI.post('upload-image', senddata)
        if (response.status === 200) {
            if (response.data.resultCode === 200) return { data: response?.data }
        }
    } catch (error) {
        throw new Error('Failed to post API request:', error);
    }
}

export { postUploadImage };