import { apiCall } from "../api/axios";
import { URL } from "../api/serverUrl";
import useBucketStore from "../pages/Store/useBucketStore";
import useDomainStore from "../pages/Store/useDomainStore";

export const uploadFile = (file: File | File[]) => {
  const selectedBucket = useBucketStore.getState().selectedBucket;
  const selectedDomain = useDomainStore.getState().selectedDomain;

  const formData = new FormData();

  if (Array.isArray(file)) {
    file.forEach((f) => formData.append("file", f));
  } else {
    formData.append("file", file);
  }

  formData.append("bucket", selectedBucket || '');
  formData.append("domain", selectedDomain || '');

  return apiCall.post(`${URL.uploadFile}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
