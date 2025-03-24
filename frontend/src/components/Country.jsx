const Country = ({ country, weather }) => {

    return (
        <div>
            <h3>{country.name.common}</h3>
            <div>Capital {country.capital[0]}</div>
            <div>Area {country.area}</div>
            <div>
                <h4>Languages</h4>
                <ul>
                    {Object.values(country.languages).map((language) => (
                        <li key={language}>{language}</li>
                    ))}
                </ul>
            </div>
            <div>
                <img src={country.flags.png} alt={country.name.common} width="100" />
            </div>
            <h3>Weather in {country.name.common}</h3>
            {weather && weather.main ? (
            <div>
                <h3>Weather in {country.name.common}</h3>
                <div><strong>Temperature:</strong> {weather.main.temp} Celsius</div>
                <div><img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} /></div>
                <div><strong>Wind:</strong> {weather.wind.speed} m/s</div>
            </div>
            ) : (
            <p>No weather data available</p>
            )}
        </div>
    );
}

export default Country;