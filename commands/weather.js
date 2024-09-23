import { SlashCommandBuilder } from 'discord.js'
import 'dotenv/config'

const IPGEO_API_KEY = process.env.IPGEO_API_KEY
const WEATHER_API_KEY = process.env.WTHR_API_KEY


function getCurrentCity() {
    const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${IPGEO_API_KEY}`
    return fetch(url)
        .then(response => response.json())
        .then(locData => locData.city)
        .catch(error => console.log(error))
}

function getWeatherInfo(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${WEATHER_API_KEY}`
    return fetch(url)
        .then(response => response.json())
        .then(weather => {
            if (weather.cod === '404') return weather.cod
            return {
                main: weather.main,
                description: weather.weather[0].description,
                city: weather.name,
                country: weather.sys.country
            }
        })
        .catch(error => console.log(error))
}

export const data = new SlashCommandBuilder()
    .setName('weather')
    .setDescription(
        'Gives weather blurb for a location. Returns current location\'s weather if no argument is provided')
    .addStringOption(option =>
        option.setName('city')
            .setDescription('The city to get weather info'))

export async function execute(interaction) {
    let city = interaction.options.getString('city')

    if (city === null) city = await getCurrentCity()
    const weatherData = await getWeatherInfo(city)
    if (weatherData === '404') {
        await interaction.reply('City not found. Try again!')
    } else {
        const weatherInfo =
            `In ${city}, ${weatherData.country}, it's currently ${weatherData.main.temp}°F with ${weatherData.description}. It feels like ${weatherData.main.feels_like}°F. Humidity is at ${weatherData.main.humidity}%.`

        await interaction.reply(weatherInfo)
    }
}
