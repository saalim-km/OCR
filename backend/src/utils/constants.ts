export const STATUSCODES = {
    OK : 200,
    CREATED : 201,
    NOT_FOUND : 404,
    UNAUTHORIZED : 401,
    UNPROCESSABLE_ENTITY : 422,
    BAD_REQUEST : 400,
    INTERNAL_SERVER_ERROR : 500,
}

export const MESSAGES = {
    FROT_REQUIRED : "Both front and back images are required",
    UPLOAD_CLEAR_IMAGE : "Could not extract all Aadhaar details. Please upload clearer images.",
    INTERNAL_ERROR : "Internal server error",
    IMAGES_SWAPPED : "Aadhaar front/back images might be swapped or invalid",
    NOT_SAME_AADHAAR : "Front and back sides do not belong to the same Aadhaar card."
}
