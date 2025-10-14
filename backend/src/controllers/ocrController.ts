import { Response, Request } from "express";
import { IAadhaarData, UploadRequest } from "../utils/Interface";
import { IOCRService } from "../services/ocr/IOCRService";
import { MESSAGES, STATUSCODES } from "../utils/constants";


export const processAdhaarImages = (ocrService: IOCRService<IAadhaarData>) =>
    async (req: Request, res: Response) => {
        try {
            const uploadReq = req as unknown as UploadRequest
            const frontImage = uploadReq.files?.frontImage?.[0];
            const backImage = uploadReq.files?.backImage?.[0];

            if (!frontImage || !backImage) {
                res.status(STATUSCODES.BAD_REQUEST).json({ success: false, message: MESSAGES.FROT_REQUIRED });
                return;
            }

            const details = await ocrService.extractData(frontImage.path, backImage.path);

            if (!details.name || !details.dob || !details.gender || !details.aadhaarNumber) {
                res.status(STATUSCODES.UNPROCESSABLE_ENTITY).json({
                    success: false,
                    message: MESSAGES.UPLOAD_CLEAR_IMAGE,
                    data: details,
                });
                return;
            }

            res.status(STATUSCODES.OK).json({ success: true, data: details });
        } catch (error) {
            res.status(STATUSCODES.INTERNAL_SERVER_ERROR).json({ message: error instanceof Error ? error.message :  MESSAGES.INTERNAL_ERROR});
        }
    };