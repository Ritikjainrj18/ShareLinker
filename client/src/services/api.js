import axios from "axios";
const API_URL='https://sharelinker.onrender.com';
// const API_URL = "http://localhost:8000";
export const uploadFile = async (data) => {
  try {
    let response = await axios.post(`${API_URL}/upload`, data);
    return response.data;
  } catch (error) {
    console.log(`Error while calling the api`, error.message);
  }
};

export const sendEmail = async (data) => {
  try {
    let response = await axios.post(`${API_URL}/download/sendmail`, data);
    return response.data;
  } catch (error) {
    console.log(`Error while calling the api`, error.message);
    return {error:error.message}
  }
};
