//Getting API key from env.js
import { UNSPLASH_API_KEY } from '../env.js';
const apiKey = UNSPLASH_API_KEY;

const fetchImage = async (query = 'nature') => {
    //Constructing url with search query and api key
    const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${apiKey}`;
    
    //Fetching image
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error('Faled to fetch background image');
        }
        const data = await response.json();
        return data.urls.full;
    } catch (error) {
        console.error('Error fetching background image: ', error);
        throw error;
    }
}
//Function to change background
const changeBackground = async () => {
    try {
        const imageUrl = await fetchImage();
        document.body.style.backgroundImage = `url(${imageUrl})`;
    } catch(error) {
        console.error('Failed to change background');
    }
}

const backgroundButton = document.getElementById('backgroundButton');
backgroundButton.addEventListener('click', () => {
    changeBackground();
})