const API_KEY = 'a91bfd88e6b34bfe9bb63221230107';

let BASE_URL = 'https://api.weatherapi.com/v1/';
const GET_URL = endpoint => BASE_URL + endpoint;

export const SEARCH_COUNTRY = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}`;
export const GET_WEATHER = GET_URL(`forecast.json?key=${API_KEY}`);
