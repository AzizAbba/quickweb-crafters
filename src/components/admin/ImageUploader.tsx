
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
  label?: string;
}

const ImageUploader = ({ onImageUpload, currentImage, label = "Upload Image" }: ImageUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      setIsUploading(true);
      
      // Create a file reader to generate a preview
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        onImageUpload(result); // Pass the base64 data URL to parent component
        setIsUploading(false);
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageUpload('');
  };
  
  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      
      {previewUrl ? (
        <div className="relative">
          <div className="border rounded-lg overflow-hidden">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-48 object-cover" 
            />
          </div>
          <Button 
            type="button"
            variant="destructive" 
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500">
          <ImageIcon className="h-10 w-10 mb-2" />
          <p className="mb-2 text-sm">Drag and drop an image, or click to browse</p>
          <Input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
          />
          <Label htmlFor="image-upload" className="cursor-pointer">
            <Button type="button" disabled={isUploading}>
              {isUploading ? "Uploading..." : (
                <>
                  <Upload className="h-4 w-4 mr-2" /> Select Image
                </>
              )}
            </Button>
          </Label>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
