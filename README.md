# Aadhaar OCR Project

A web application to extract digital information from **Aadhaar card images** (front and back) using **Google Vision API**.

## Features

- Upload front and back images of Aadhaar card
- Extract details such as:
  - Name
  - Aadhaar Number
  - Date of Birth
  - Gender
  - Address
- Validate that front and back belong to the same Aadhaar
- File upload validation (image type, max size 2MB)
- Real-time preview of uploaded images
- Error handling for invalid or unclear images

## Tech Stack

- **Frontend:** React, TypeScript, ShadCN UI, TailwindCSS
- **Backend:** Node.js, Express, TypeScript
- **OCR Service:** Google Cloud Vision API
- **Other:** Multer (file upload), Axios, dotenv

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <repo-folder>
2. **Install dependencies**
   ▫️Backend:
   
         cd backend
         npm install
   ▫️Frontend:
   
         cd frontend
         npm install
4. **Setup environment variables**
   
6. **Running the Project**
   - Start the backend:
     - npm run dev
   - Start the frontend:
     -  npm run dev
   - Open http://localhost:5173 in your browser to access the app.

## Usage

1. Upload the front and back images of your Aadhaar card.
2. Ensure that both images belong to the same Aadhaar card.
3. Wait for the OCR processing to extract the details.
4. View the extracted information in the results panel.
5. If data extraction fails, upload clearer images.

## Notes

1. Maximum upload size for images: 2MB.
2. Supported image types: JPG, JPEG, PNG.
