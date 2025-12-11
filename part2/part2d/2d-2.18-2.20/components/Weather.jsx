const Weather = ({ weather, wind, name, icon, desc }) => {
    if (weather === 0 || wind === 0) {
        return null
    }

    return (
        <div>
            <h1>Weather in {name}</h1>
            <p>Temperature {(weather - 273.15).toFixed(2)} celsius</p>
            <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt={desc}></img>
            <p>Wind {wind} m/s </p>
        </div>
    )
}

export default Weather