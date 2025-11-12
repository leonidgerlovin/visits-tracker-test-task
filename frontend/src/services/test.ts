// load-test.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/stats/update'; // replace with your API
const REQUESTS_PER_SECOND = 1000;
const countryCodes = [
  'us', 'gb', 'fr', 'de', 'it', 'es', 'ru', 'il', 'cn', 'jp', 'ca', 'au',
  'br', 'in', 'mx', 'za', 'kr', 'se', 'no', 'fi'
]; // add as many as you want

function getRandomCountryCode() {
  const index = Math.floor(Math.random() * countryCodes.length);
  return countryCodes[index];
}

async function sendRequest() {
  const countryCode = getRandomCountryCode();
  try {
    await axios.post(API_URL, { countryCode });
  } catch (err: any) {
    console.error(`Error sending ${countryCode}:`, err.message || err);
  }
}

export function startLoadTest() {
  for (let i = 0; i < REQUESTS_PER_SECOND; i++) {
    sendRequest();
    console.log(i)
  }
}