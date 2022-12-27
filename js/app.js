const body = document.querySelector('body')
const weatherTitle = document.querySelector('[data-js="weather-title"]')
const weatherLabel = document.querySelector('[data-js="weather-label"]')
const cityForm = document.querySelector('[data-js="change-location"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer = document.querySelector('[data-js="city-temperature"]')
const cityCard = document.querySelector('[data-js="city-card"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')
let timeImage = document.querySelector('[data-js="time"]')

const getWeatherData = async cityName => {
  const [{ Key, LocalizedName }] = await getCityData(cityName)
  const [weatherData] = await getCityWeather(Key)

  return { ...weatherData, LocalizedName }
}

const showCityWeatherInfo = async cityName => {
  const { LocalizedName, WeatherText, Temperature, WeatherIcon, IsDayTime } = await getWeatherData(cityName)

  cityNameContainer.textContent = LocalizedName
  cityWeatherContainer.textContent = WeatherText
  cityTemperatureContainer.textContent = Temperature.Metric.Value
  timeImage.src = IsDayTime ? './src/day.svg' : './src/night.svg'
  timeIconContainer.innerHTML = `<img src="./src/icons/${WeatherIcon}.svg" />`  
  
  changeBackgroundColors({ bodyColor: IsDayTime ? '#BFE2F0' : '#414551', textColor: IsDayTime ? '#3A687A' : "#FFFFFF" })
}

const showCityCard = () => {
  const hasDisplayNoneClass = cityCard.classList.contains('d-none')
  if (hasDisplayNoneClass) {
    cityCard.classList.remove('d-none')
  }
}

const changeBackgroundColors = ({ bodyColor, textColor })  => {
  body.style.background = bodyColor
  weatherTitle.style.color = textColor
  weatherLabel.style.color = textColor
}

const showLocalStorageCity = async () => {
  const city = localStorage.getItem('city')

  if (city) {
    showCityWeatherInfo(city)
    showCityCard()
  }
}

const handleCityForm = event => {
  event.preventDefault()

  const cityName = event.target.city.value

  localStorage.setItem('city', cityName)

  showCityWeatherInfo(cityName)
  showCityCard()
  cityForm.reset()
}

cityForm.addEventListener('submit', handleCityForm)
showLocalStorageCity()
