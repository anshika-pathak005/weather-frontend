const weatherForm = document.querySelector(".weatherForms")
const cityInput = document.querySelector(".cityInput")
const card = document.querySelector(".card")

// Backend URL (Render)
const backendURL = "https://weather-backend-x40o.onrender.com/weather";

// functions
weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    // if city is valid then do something otherwise display error
    if(city){
        // try catch block incase we encounter any error
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error)
            displayError(error)
        }

    }
    else{
        displayError("Please Enter a City");
    }

});

async function getWeatherData(city){

    const apiurl = `${backendURL}?city=${city}`;

    const response = await fetch(apiurl);
    // console.log(response);

    if(!response.ok){
        throw new Error('Could not fetch weather data');
    }
    return await response.json()

};

function displayWeatherInfo(data){

    const   {name:city,
            main: {temp,humidity},
            weather:[{description,id}]} = data;

        
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const weatherEmoji = document.createElement('p');


    if(city == 'Innichen'){
        cityDisplay.textContent = 'India';
    }
    else{
        cityDisplay.textContent = city;
    }
        
    tempDisplay.textContent = `${temp}°C`;
    // tempDisplay.textContent = `${(temp-273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("city_display")
    tempDisplay.classList.add("temp_display")
    humidityDisplay.classList.add("humidity_display")
    descDisplay.classList.add("desc_display")
    weatherEmoji.classList.add("weather_emoji")

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

};

function getWeatherEmoji(weatherId){

    switch (true) {
    // Thunderstorm
    case (weatherId >= 200 && weatherId <= 210):
        return "⛈"; // thunder with rain
    case (weatherId >= 211 && weatherId <= 221):
        return "🌩"; // lightning
    case (weatherId >= 230 && weatherId <= 232):
        return "⚡"; // storm

    // Drizzle
    case (weatherId >= 300 && weatherId <= 310):
        return "🌦"; // light drizzle
    case (weatherId >= 311 && weatherId <= 321):
        return "🌧"; // heavy drizzle

    // Rain
    case (weatherId >= 500 && weatherId <= 504):
        return "🌧"; // normal rain
    case (weatherId === 511):
        return "🌨"; // freezing rain
    case (weatherId >= 520 && weatherId <= 531):
        return "🌧☔"; // shower rain

    // Snow
    case (weatherId >= 600 && weatherId <= 602):
        return "❄️"; // light snow
    case (weatherId >= 611 && weatherId <= 613):
        return "🌨"; // sleet
    case (weatherId >= 615 && weatherId <= 622):
        return "☃️"; // heavy snow

    // Atmosphere
    case (weatherId >= 701 && weatherId <= 711):
        return "🌫"; // mist / smoke
    case (weatherId >= 721 && weatherId <= 731):
        return "🌁"; // haze / dust
    case (weatherId >= 741 && weatherId <= 751):
        return "🌫"; // fog
    case (weatherId >= 761 && weatherId <= 781):
        return "🌪"; // tornado

    // Clear sky
    case (weatherId === 800):
        return "☀️"; // clear

    // Clouds
    case (weatherId === 801):
        return "🌤"; // few clouds
    case (weatherId === 802):
        return "⛅"; // scattered clouds
    case (weatherId === 803):
        return "🌥"; // broken clouds
    case (weatherId === 804):
        return "☁️"; // overcast

    default:
        return "❓"; // unknown
    }
};

function displayError(message){

    // create new element that is p to appent in the ui
    const errorDisplay = document.createElement('p');

    // giving it value
    errorDisplay.textContent = message;

    // now set its class that we have already defined 
    errorDisplay.classList.add("error_display")

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
    

}
