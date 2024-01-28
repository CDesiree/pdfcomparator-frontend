import axios from 'axios';

const baseURL = 'http://localhost:8080/api/pdf';

export const comparePdf = (file1, file2) => {
  const formData = new FormData();
  formData.append('file1', file1);
  formData.append('file2', file2);

  return axios.post(`${baseURL}/compare`, formData);
};

export const downloadPdf = () => {
  return window.open(`${baseURL}/download`);
};
