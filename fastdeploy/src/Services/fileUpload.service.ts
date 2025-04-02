import { apiCall } from "../api/axios";
import { URL } from "../api/serverUrl";

export const uploadFile = (file:any) => {
    const formData = new FormData();
    if (Array.isArray(file)) {
      file.forEach((file) => formData.append("file", file));
    } else {
      formData.append("file", file);
    }
  
    return apiCall.post(`${URL.uploadFile}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }