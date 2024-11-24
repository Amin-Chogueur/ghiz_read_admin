import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import React from "react";

// Define the structure for the Cloudinary result
interface CloudinaryUploadInfo {
  secure_url: string;
}

type ImageUploadProps = {
  onImageUpload: (url: string) => void;
};

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  return (
    <CldUploadWidget
      uploadPreset="wj68q01d"
      onSuccess={(result: CloudinaryUploadWidgetResults) => {
        // Ensure the result has the correct structure
        const uploadInfo = result.info as CloudinaryUploadInfo;

        // Check if the secure_url exists and call onImageUpload
        if (uploadInfo?.secure_url) {
          onImageUpload(uploadInfo.secure_url); // Pass the URL to the parent component
        }
      }}
    >
      {({ open }) => {
        return (
          <button
            type="button"
            onClick={() => open()}
            className="bg-gray-700 text-white rounded hover:bg-gray-900 p-1"
          >
            Upload Image
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
