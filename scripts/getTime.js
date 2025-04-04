document.addEventListener('DOMContentLoaded', () => {

    const updateTimeDate = () => {
        //Getting elements
        const timeElement = document.getElementById('time');
        const dateElement = document.getElementById('date');
        
        //Getting current date and time + extracting values
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const day = now.getDate();
        const month = now.toLocaleString('default', { month: 'long' });
        const year = now.getFullYear();
    
        //Formatting time and date
        const paddedMinutes = minutes.toString().padStart(2, '0');
        const paddedHours = hours.toString().padStart(2, '0');
        const timeString = `${paddedHours}:${paddedMinutes}`;
        const dateString = `${day} ${month} ${year}`;
    
        timeElement.textContent = timeString;
        dateElement.textContent = dateString;
    }

    updateTimeDate(); // Initial call to set time and date immediately
    setInterval(updateTimeDate, 1000); // Update every second
})