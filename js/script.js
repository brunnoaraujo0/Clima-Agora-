const apiKey = "967417c5336149f99f823e96888d2155";
const apiCoutryURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?"

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weaatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");

const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
};
const showErrorMessage = () => {
    errorMessageContainer.classList.remove("hide")
  }

  const hideInformation = () => {
    errorMessageContainer.classList.add("hide")
    weatherContainer.classList.add("hide")
  }
  
const showWeatherData = async (city) => {
    hideInformation();
   const data = await getWeatherData(city);

   if (data.cod === "404") {
    showErrorMessage()
    return;
}

   cityElement.innerText = data.name;
   tempElement.innerText = parseInt(data.main.temp);
   descElement.innerText = data.weather[0].description;
    weaatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCoutryURL + data.sys.country);
    umidityElement.innerHTML = `${data.main.humidity}%`
    windElement.innerHTML = `${data.wind.speed}km/h`;
    document.querySelector(".imagem-fundo").style.backgroundImage = `url("${apiUnsplash + city}")`;
   weatherContainer.classList.remove("hide");
    
};

searchBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) =>{
    if(e.code === "Enter"){
        const city = e.target.value;
        showWeatherData(city);
    }
})