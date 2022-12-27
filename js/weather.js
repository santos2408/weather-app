const APIKey = 'xy65yfPXmSDJN9qAsxF09zAX2WJsSlxM'
const baseUrl = `https://dataservice.accuweather.com/`

const getCityUrl = cityName => `${baseUrl}locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`
const getWeatherUrl = cityKey => `${baseUrl}currentconditions/v1/${cityKey}?apikey=${APIKey}&language=pt-br`

const fetchData = async url => {
  try {
    const request = await fetch(url)

    if (!request.ok) {
      throw new Error ('Não foi possível obter os dados.')
    }

    return request.json()
  } catch ({ name, message }) {
    console.log(`${name}: ${message}`)
  }
}

const getCityData = cityName => fetchData(getCityUrl(cityName))
const getCityWeather = cityKey => fetchData(getWeatherUrl(cityKey))
