import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function uploadAadhaarImages(frontImage: File, backImage: File) {
    const formData = new FormData();
    formData.append("frontImage", frontImage);
    formData.append("backImage", backImage);

    console.log(API_BASE_URL)

    const response = await axios.post(
        `${API_BASE_URL}/api/upload-aadhar`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
}
