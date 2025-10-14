
export interface UploadRequest extends Request {
    files?: {
        frontImage?: Express.Multer.File[];
        backImage?: Express.Multer.File[];
    };
}



export interface IAadhaarData {
    name: string;
    dob: string;
    gender: string;
    aadhaarNumber: string;
    address: string;
}
