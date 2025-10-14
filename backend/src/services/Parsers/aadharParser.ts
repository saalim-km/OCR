import { IAadhaarData } from "../../utils/Interface";

export const parseAadhaarDetails = (text: string): IAadhaarData => {
    const cleanText = text.replace(/\s+/g, " ").trim();

    const nameMatch = cleanText.match(/([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)(?=.*DOB)/);
    const dobMatch = cleanText.match(/DOB\s*[:\-]?\s*(\d{2}\/\d{2}\/\d{4})/i);
    const genderMatch = cleanText.match(/\b(Male|Female)\b/i);
    const aadhaarMatch = cleanText.match(/\d{4}\s\d{4}\s\d{4}/);
    const addressMatch = text.match(/Address\s*:\s*([\s\S]*?\b\d{6}\b)/i);

    return {
        name: nameMatch?.[1]?.trim() || "",
        dob: dobMatch?.[1] || "",
        gender: genderMatch?.[0] || "",
        aadhaarNumber: aadhaarMatch?.[0] || "",
        address: addressMatch?.[1]?.trim() || "",
    };
};

export const isFrontSide = (text: string) => {
    return /\bDOB\b/i.test(text) || /\bMale\b|\bFemale\b/i.test(text);
};

export const isBackSide = (text: string) => {
    return /\bAddress\b/i.test(text) || /\b\d{6}\b/.test(text);
};
export const extractFrontAadhaarNumber = (text: string): string | null => {
    if (!text) return null;

    const match = text.match(/\b\d{4}\s?\d{4}\s?\d{4}\b/);
    if (!match) return null;

    return match[0].replace(/\s/g, "");
};

export const extractBackAadhaarNumber = (text: string): string | null => {
    if (!text) return null;

    const match = text.match(/(\d{4}\s?\d{4}\s?\d{4})\s*(?=VID\b)/i);

    if (match) {
        return match[1]!.replace(/\s/g, "");
    }

    const fallback = text.match(/\b\d{4}\s?\d{4}\s?\d{4}\b/);
    return fallback ? fallback[0].replace(/\s/g, "") : null;
};

export const isSameAadhaar = (frontText: string, backText: string): boolean => {
    const frontNum = extractFrontAadhaarNumber(frontText);
    const backNum = extractBackAadhaarNumber(backText);

    if (!frontNum || !backNum) return false;

    console.log("Front Aadhaar:", frontNum);
    console.log("Back Aadhaar:", backNum);

    return frontNum === backNum;
};