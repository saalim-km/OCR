import { MESSAGES } from "../../utils/constants";
import { IAadhaarData } from "../../utils/Interface";
import { isBackSide, isFrontSide, isSameAadhaar, parseAadhaarDetails } from "../Parsers/aadharParser";
import { IOCRService } from "./IOCRService";
import { ImageAnnotatorClient } from '@google-cloud/vision';

export class AadhaarOCRService implements IOCRService<IAadhaarData> {
    private client: ImageAnnotatorClient;

    constructor(client: ImageAnnotatorClient) {
        this.client = client;
    }

    async extractData(frontImagePath: string, backImagePath: string): Promise<IAadhaarData> {
        const frontText = await this.getText(frontImagePath);
        const backText = await this.getText(backImagePath);

        if (!isFrontSide(frontText) || !isBackSide(backText)) {
            throw new Error(MESSAGES.IMAGES_SWAPPED);
        }

        if (!isSameAadhaar(frontText, backText)) {
            throw new Error(MESSAGES.NOT_SAME_AADHAAR);
        }

        return parseAadhaarDetails(`${frontText}\n${backText}`)
    }

    private async getText(imagePath: string): Promise<string> {
        const [result] = await this.client.textDetection(imagePath);
        return result.fullTextAnnotation?.text || "";
    }
} 