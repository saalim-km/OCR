import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, CreditCard, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { uploadAadhaarImages } from "./services/services"
import { useAppToast } from "./hooks/use-toast"
import { AxiosError } from "axios"
import { CopyButton } from "./components/CopyButton"

interface AadhaarData {
  name: string
  aadhaarNumber: string
  dob: string
  gender: string
  address: string
  fatherName?: string
  phoneNumber?: string
}

export default function AadhaarOCR() {
  const [frontImage, setFrontImage] = useState<File | null>(null)
  const [backImage, setBackImage] = useState<File | null>(null)
  const [frontPreview, setFrontPreview] = useState<string | null>(null)
  const [backPreview, setBackPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [extractedData, setExtractedData] = useState<AadhaarData | null>(null);
  const { error, info } = useAppToast()

  const validateFile = (selectedFile: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSizeMB = 2;

    if (!allowedTypes.includes(selectedFile.type)) {
      error("Only JPG, JPEG, or PNG files are allowed.");
      return false;
    }
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      error(`File size must be less than ${maxSizeMB}MB.`);
      return false;
    }
    return true;
  };

  const handleImageUpload = (file: File, side: "front" | "back") => {
    if (!validateFile(file)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (side === "front") {
        setFrontImage(file);
        setFrontPreview(result);
      } else {
        setBackImage(file);
        setBackPreview(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!frontImage || !backImage) {
      info("Please upload both front and back images of Aadhaar card")
      return
    }

    setIsLoading(true)
    setExtractedData(null);

    try {
      const data = await uploadAadhaarImages(frontImage, backImage);
      console.log(data);
      setExtractedData(data.data);
    } catch (err) {
      console.log(err);
      error((err instanceof AxiosError) ? err?.response?.data.message : "Failed to extract Aadhaar data");
    } finally {
      setIsLoading(false);
    }
  }

  const resetForm = () => {
    setFrontImage(null)
    setBackImage(null)
    setFrontPreview(null)
    setBackPreview(null)
    setExtractedData(null)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CreditCard className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Aadhaar OCR</h1>
          </div>
          <p className="text-lg text-gray-600">Upload your Aadhaar card images to extract digital information</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Upload Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Aadhaar Images
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Front Side */}
                <div>
                  <Label htmlFor="front-upload" className="text-sm font-medium">
                    Front Side
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">
                    Only JPG, JPEG, PNG files up to 2MB are allowed.
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <Input
                      id="front-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleImageUpload(file, "front")
                      }}
                      className="hidden"
                    />
                    <Label
                      htmlFor="front-upload"
                      className={cn(
                        "flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                        frontPreview ? "border-green-300 bg-green-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                      )}
                    >
                      {frontPreview ? (
                        <img src={frontPreview} alt="Front preview" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <>
                          <Upload className="h-6 w-6 text-gray-500" />
                          <span className="text-xs text-gray-500 text-center">Click to upload</span>
                        </>
                      )}
                    </Label>
                  </div>
                </div>

                {/* Back Side */}
                <div>
                  <Label htmlFor="back-upload" className="text-sm font-medium">
                    Back Side
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">
                    Only JPG, JPEG, PNG files up to 2MB are allowed.
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <Input
                      id="back-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleImageUpload(file, "back")
                      }}
                      className="hidden"
                    />
                    <Label
                      htmlFor="back-upload"
                      className={cn(
                        "flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                        backPreview ? "border-green-300 bg-green-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                      )}
                    >
                      {backPreview ? (
                        <img src={backPreview} alt="Back preview" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <>
                          <Upload className="h-6 w-6 text-gray-500" />
                          <span className="text-xs text-gray-500 text-center">Click to upload</span>
                        </>
                      )}
                    </Label>
                  </div>
                </div>
              </CardContent>
              <div className="sticky bottom-0 bg-white border-t p-4 flex gap-4">
                <Button onClick={handleSubmit} disabled={!frontImage || !backImage || isLoading} className="flex-1">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Extract Data"
                  )}
                </Button>
                <Button variant="outline" onClick={resetForm} disabled={isLoading}>
                  Reset
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Side - Results Section */}
          <div>
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Extracted Information</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
                    <p className="text-lg font-medium text-gray-700">Processing Aadhaar...</p>
                    <p className="text-sm text-gray-500 mt-2">Extracting information from your images</p>
                  </div>
                ) : extractedData ? (
                  <div className="space-y-4">
                    <div className="grid gap-4">
                      <div className="grid grid-cols-3 gap-4 py-2 border-b items-center">
                        <span className="font-medium text-gray-600">Name:</span>
                        <div className="col-span-2 flex items-center justify-between">
                          <span className="font-semibold">{extractedData.name}</span>
                          <CopyButton text={extractedData.name} />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 py-2 border-b items-center">
                        <span className="font-medium text-gray-600">Aadhaar Number:</span>
                        <div className="col-span-2 flex items-center justify-between">
                          <span className="font-semibold">{extractedData.aadhaarNumber}</span>
                          <CopyButton text={extractedData.aadhaarNumber} />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 py-2 border-b">
                        <span className="font-medium text-gray-600">Date of Birth:</span>
                        <div className="col-span-2 flex items-center justify-between">
                          <span className="font-semibold">{extractedData.dob}</span>
                          <CopyButton text={extractedData.dob} />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 py-2 border-b">
                        <span className="font-medium text-gray-600">Gender:</span>
                        <div className="col-span-2 flex items-center justify-between">
                          <span className="font-semibold">{extractedData.gender}</span>
                          <CopyButton text={extractedData.gender} />
                        </div>
                      </div>
                      {extractedData.fatherName && (
                        <div className="grid grid-cols-3 gap-4 py-2 border-b">
                          <span className="font-medium text-gray-600">Father's Name:</span>
                          <div className="col-span-2 flex items-center justify-between">
                            <span className="font-semibold">{extractedData.fatherName}</span>
                            <CopyButton text={extractedData.fatherName} />
                          </div>
                        </div>
                      )}
                      {extractedData.phoneNumber && (
                        <div className="grid grid-cols-3 gap-4 py-2 border-b">
                          <span className="font-medium text-gray-600">Phone Number:</span>
                          <div className="col-span-2 flex items-center justify-between">
                            <span className="font-semibold">{extractedData.phoneNumber}</span>
                            <CopyButton text={extractedData.phoneNumber} />
                          </div>
                        </div>
                      )}
                      <div className="grid grid-cols-3 gap-4 py-2">
                        <span className="font-medium text-gray-600">Address:</span>
                        <div className="col-span-2 flex items-center justify-between">
                          <span className="font-semibold">{extractedData.address}</span>
                          <CopyButton text={extractedData.address} />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          const formattedData = `
                            Name: ${extractedData.name}
                            Aadhaar Number: ${extractedData.aadhaarNumber}
                            Date of Birth: ${extractedData.dob}
                            Gender: ${extractedData.gender}
                            ${extractedData.fatherName ? `Father's Name: ${extractedData.fatherName}` : ""}
                            ${extractedData.phoneNumber ? `Phone Number: ${extractedData.phoneNumber}` : ""}
                            Address: ${extractedData.address}
                                  `.trim()

                          navigator.clipboard.writeText(formattedData)
                          info("All data copied to clipboard!")
                        }}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy All
                      </Button>
                    </div>


                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-800">✅ Data extraction completed successfully!</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-lg text-gray-500">
                      Upload both sides of your Aadhaar card to see extracted data here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
