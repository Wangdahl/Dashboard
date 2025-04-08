import { FMP_API_KEY } from '../env.js';
// API from https://site.financialmodelingprep.com/
const apiKey = FMP_API_KEY;

// Base URL for FMP's quote endpoint.
const baseUrl = `https://financialmodelingprep.com/api/v3/quote`;

// Ticker symbols for cryptocurrencies
const btcTicker = 'BTCUSD';
const solTicker = 'SOLUSD';
const bnbTicker = 'BNBUSD';
const xrpTicker = 'XRPUSD';
const ethTicker = 'ETHUSD';

// Build full URLs by appending the ticker and API key
const btcUrl = `${baseUrl}/${encodeURIComponent(btcTicker)}?apikey=${apiKey}`;
const solUrl = `${baseUrl}/${encodeURIComponent(solTicker)}?apikey=${apiKey}`;
const bnbUrl = `${baseUrl}/${encodeURIComponent(bnbTicker)}?apikey=${apiKey}`;
const xrpUrl = `${baseUrl}/${encodeURIComponent(xrpTicker)}?apikey=${apiKey}`;
const ethUrl = `${baseUrl}/${encodeURIComponent(ethTicker)}?apikey=${apiKey}`;

// Divs to display each tracker
const btcDiv = document.getElementById('marketBtc');
const solDiv = document.getElementById('marketSol');
const bnbDiv = document.getElementById('marketBnb');
const xrpDiv = document.getElementById('marketXrp');
const ethDiv = document.getElementById('marketEth');

// Mapping between our ticker symbols and icon URLs. Need icons from separate source.
const iconMapping = {
    'BTCUSD': 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
    'SOLUSD': 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
    'BNBUSD': 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    'XRPUSD': 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
    'ETHUSD': 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'
};

// Fetch quote data from FMP API
function fetchAndDisplay(url, baseDiv, cryptoTicker, cryptoName) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const quote = data[0];
                // Round values to 2 decimals
                const changePercent = Number(quote.changesPercentage).toFixed(2);
                const price = Number(quote.price).toFixed(2);
        
                // Create icon element if available
                const iconUrl = iconMapping[cryptoTicker];
                const img = document.createElement('img');
                if (iconUrl) {
                    img.src = iconUrl;
                    img.alt = cryptoName + " icon";
                    img.classList.add('cryptoIcon');
                }
        
                // Create container div for text elements
                const textContainer = document.createElement('div');
                textContainer.classList.add('cryptoContainer');
        
                // Create span for ticker (trim last 3 characters (USD))
                const tickerSpan = document.createElement('span');
                tickerSpan.textContent = cryptoTicker.slice(0, -3);
                tickerSpan.classList.add('ticker');
        
                // Create div for price and change spans
                const priceContainer = document.createElement('div');
                priceContainer.classList.add('priceContainer');
        
                // Create span for current price
                const priceSpan = document.createElement('span');
                priceSpan.textContent = `$${price}`;
                priceSpan.classList.add('price');
        
                // Create span for 24h change; add '+' if positive and color accordingly
                const changeSpan = document.createElement('span');
                const formattedChange = (changePercent >= 0 ? '+' : '') + changePercent + '%';
                changeSpan.textContent = ` ${formattedChange}`;
                changeSpan.classList.add('change');
                changeSpan.style.color = changePercent >= 0 ? 'green' : 'red';
        
                // Assemble price container
                priceContainer.appendChild(priceSpan);
                priceContainer.appendChild(changeSpan);
                // Assemble text container
                textContainer.appendChild(tickerSpan);
                textContainer.appendChild(priceContainer);
                // Clear baseDiv and append icon (if any) and text container
                baseDiv.innerHTML = '';
                if (iconUrl) {
                    baseDiv.appendChild(img);
                }
                baseDiv.appendChild(textContainer);
            } else {
            console.error(`Error fetching ${cryptoName} data`, data);
            }
        })
    .catch(error => console.error(`Fetch Error for ${cryptoName}:`, error));
}



// Fetch and display each crypto's data:
fetchAndDisplay(btcUrl, btcDiv, 'BTCUSD', 'Bitcoin');
fetchAndDisplay(solUrl, solDiv, 'SOLUSD', 'Solana');
fetchAndDisplay(bnbUrl, bnbDiv, 'BNBUSD', 'BNB');
fetchAndDisplay(xrpUrl, xrpDiv, 'XRPUSD', 'XRP');
fetchAndDisplay(ethUrl, ethDiv, 'ETHUSD', 'Ethereum');
