const body = document.querySelector('body')
const weatherTitle = document.querySelector('[data-js="weather-title"]')
const weatherLabel = document.querySelector('[data-js="weather-label"]')

const cityForm = document.querySelector('[data-js="change-location"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer = document.querySelector('[data-js="city-temperature"]')
const cityCard = document.querySelector(['[data-js="city-card"]'])
const timeIconContainer = document.querySelector('[data-js="time-icon"]')
let timeImage = document.querySelector('[data-js="time"]')

const getWeatherData = async inputValue => {
  const [{ Key, LocalizedName }] = await getCityData(inputValue)

  const [{ WeatherText, Temperature, WeatherIcon, IsDayTime }] = await getCityWeather(Key)
  return { LocalizedName, WeatherText, Temperature, WeatherIcon, IsDayTime }
}

const showCityCard = () => {
  const hasDisplayNoneClass = cityCard.classList.contains('d-none')
  if (hasDisplayNoneClass) cityCard.classList.remove('d-none')
}

const insertWeatherInfoIntoDOM = (LocalizedName, WeatherText, Temperature) => {
  cityNameContainer.textContent = LocalizedName
  cityWeatherContainer.textContent = WeatherText
  cityTemperatureContainer.textContent = Temperature.Metric.Value
}

const insertBackgroundColors = (bodyColor, textColor)  => {
  body.style.background = bodyColor
  weatherTitle.style.color = textColor
  weatherLabel.style.color = textColor
}

const insertImagesIntoDOM = (IsDayTime, timeIcon) => {
  if (IsDayTime) {
    timeImage.src = './src/day.svg'
    timeIconContainer.innerHTML = timeIcon
    insertBackgroundColors('#BFE2F0', '#3a687a')
    return
  }
  insertBackgroundColors('#414551', "#fff")
  timeImage.src = './src/night.svg'
  timeIconContainer.innerHTML = timeIcon
}

const getWeatherInfo = async event => {
  event.preventDefault()

  const inputValue = event.target.city.value
  const { 
    LocalizedName,
    WeatherText,
    Temperature,
    WeatherIcon, 
    IsDayTime 
  } = await getWeatherData(inputValue)
  const timeIcon = `<img src="./src/icons/${WeatherIcon}.svg" />`

  showCityCard()
  insertWeatherInfoIntoDOM(LocalizedName, WeatherText, Temperature)
  insertImagesIntoDOM(IsDayTime, timeIcon)

  cityForm.reset()
}

cityForm.addEventListener('submit', getWeatherInfo)