import axios from 'axios'

const infoURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const weatherBaseURL = 'https://api.openweathermap.org/data/2.5/weather'

const getInfo = async () => {
  try {
    const response = await axios.get(infoURL)
    return response.data
  } catch (error) {
    console.error('Fehler beim Abrufen der Länderinformationen:', error)
    return null
  }
}

const getWeather = async (lat, lon) => {
  const apiKey = import.meta.env.VITE_SOME_KEY

  if (!apiKey) {
    console.error('Fehlender API-Schlüssel für OpenWeather')
    return null
  }

  const url = `${weatherBaseURL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('Fehler beim Abrufen der Wetterdaten:', error)
    return null
  }
}

export default {
  getInfo,
  getWeather,
}
