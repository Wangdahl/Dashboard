import { ALPHA_VANTAGE_API_KEY } from '../env.js';

const apiKey = ALPHA_VANTAGE_API_KEY;
const baseUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=${apiKey}`;

//Tickers for stack markets
const spTicker = 'INDEXSP:.INX';

//Custom url for each ticker
const spUrl = `${baseUrl}&symbol=${encodeURIComponent(spSymbol)}`;

//Divs to display each tracker
cond spDiv = document.getElementById('marketSP');