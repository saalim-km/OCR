import { Router, type Request, type Response, type NextFunction } from "express";
import { upload } from "../config/multer";
import { processAdhaarImages } from "../controllers/ocrController";
import { AadhaarOCRService } from "../services/ocr/AadhaarOCRService";
import vision from '@google-cloud/vision';
import dotenv from 'dotenv';

const router = Router();
dotenv.config();

const client = new vision.ImageAnnotatorClient({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL || "",
        private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    },
    projectId: process.env.GOOGLE_PROJECT_ID || "",
});

const aadhaarService = new AadhaarOCRService(client)

router.post(
    "/upload-aadhar",
    upload.fields([
        { name: "frontImage", maxCount: 1 },
        { name: "backImage", maxCount: 1 }
    ]),
    processAdhaarImages(aadhaarService),
);

export default router;