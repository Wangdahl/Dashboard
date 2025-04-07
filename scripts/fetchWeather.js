//Function to get weather data from OpenWeather API
const fetchWeather = async (lat, lon) => {
    //Creating URL for API call
    const apiKey = OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    //Fetching data from API
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const weatherItems = document.querySelectorAll('.weatherItem');
    //Check if geolocation is used
    if ('geolocation' in navigator) {
        //Getting location        
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            //Fetching weather data with coordinates
            fetchWeather(lat, lon).then((data) => {
                // Use the city's timezone offset (in seconds) to adjust dt to local time
                const tzOffset = data.city.timezone; // offset in seconds

                // Filter forecast entries by converting dt to local time using the offset,
                // then check if the local hour is near 12 (within ±1 hour)
                const middayForecasts = data.list.filter(item => {
                    const localDate = new Date((item.dt + tzOffset) * 1000);
                    const localHour = localDate.getUTCHours();
                    return Math.abs(localHour - 12) <= 1;
                }).slice(0, 5); // Get the first 5 entries around midday

                
                middayForecasts.forEach((dayData, index) => {
                    const dayItem = weatherItems[index];

                    // Convert dt to local time using the timezone offset
                    const localDate = new Date((dayData.dt + tzOffset) * 1000);
                    const dayName = localDate.toLocaleDateString(undefined, { weekday: 'long' });

                    //Creating icon url
                    const iconCode = dayData.weather[0].icon;
                    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

                    //Get temp and description
                    const temp = Math.round(dayData.main.temp);

                    const description = dayData.weather[0].description;

                    //Creating elements
                    const div1 = document.createElement('div');
                    const div2 = document.createElement('div');
                    const img = document.createElement('img');
                    const daySpan = document.createElement('span');
                    const tempSpan = document.createElement('span');
                    const descSpan = document.createElement('span');

                    //Giving elements data
                    img.src = iconUrl;
                    img.alt = description;
                    img.classList.add('weatherIcon');
                    daySpan.textContent = dayName;
                    daySpan.classList.add('dayName');
                    tempSpan.textContent = `${temp}°C`;
                    tempSpan.classList.add('temp');
                    descSpan.textContent = description.charAt(0).toUpperCase() + description.slice(1);
                    descSpan.classList.add('description');

                    div2.appendChild(tempSpan);
                    div2.appendChild(descSpan);
                    div2.classList.add('tempPlusDesc');
                    div1.appendChild(daySpan);
                    div1.appendChild(div2);
                    div1.classList.add('weatherInfo');

                    //Adding elements to the existing div
                    dayItem.appendChild(img);
                    dayItem.appendChild(div1);
                })
            })


        });
    } else {
        
    }




})