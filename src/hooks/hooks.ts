import axiosInstance from "@/axiosInstance";
import { useState } from "react";

export const useUpload = () => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const uploadForm = async (formData: FormData) => {
        setIsLoading(true);
        const responce = await axiosInstance.post("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total !== undefined) {
                    const progress = (progressEvent.loaded / progressEvent.total) * 50;
                    setProgress(progress);
                }
            },
            onDownloadProgress: (progressEvent) => {
                if (progressEvent.total !== undefined) {
                    const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50;
                    setProgress(progress);
                }
            },
        });
        setIsLoading(false);
        return responce;
    };

    return { uploadForm, isLoading, progress };
};