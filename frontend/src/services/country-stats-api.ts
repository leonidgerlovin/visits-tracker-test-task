import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const updateCountryStats = async (countryCode: string) => {
  const response = await axios.post(`${API_URL}/stats/update`, { countryCode });
  return response.data;
};

export const retrieveCountryStats = async () => {
  const response = await axios.get(`${API_URL}/stats/retrieve`);
  console.log(API_URL)
  return response.data;
};