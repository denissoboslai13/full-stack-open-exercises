import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import Capital from './components/Capital'
import Area from './components/Area'
import Languages from './components/Languages'
import Result from './components/Result'
import Weather from './components/Weather'

const App = () => {
  const api_key = import.meta.env.VITE_SOME_KEY
  const [value, setValue] = useState('')
  const [name, setName] = useState(null)
  const [capital, setCapital] = useState(null)
  const [area, setArea] = useState(null)
  const [query, setQuery] = useState(null)
  const [languages, setLanguages] = useState([])
  const [image, setImage] = useState(null)
  const [names, setNames] = useState([])
  const [result, setResult] = useState(null)
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const [weather, setWeather] = useState(0)
  const [wind, setWind] = useState(0)
  const [weatherIcon, setWeatherIcon] = useState(null)
  const [desc, setDesc] = useState(null)

  const btnOnClick = (result) => {
  setResult(null)
  axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${result}`)
    .then(response => {
      const country = response.data;

      setName(country.name.common);
      setCapital(country.capital);
      setArea(country.area);
      setLanguages(country.languages);
      setImage(country.flags.png);
      setLat(country.latlng[0]);
      setLon(country.latlng[1]);

      return axios.get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`
      )
    })
    .then(response => {
      setWeather(response.data.current.temp);
      setWind(response.data.current.wind_speed);
      setWeatherIcon(response.data.current.weather[0].icon);
      setDesc(response.data.current.weather[0].description);
    })
  }

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setNames(response.data.map(names => (names.name.common)))
      })
  }, [])

  useEffect(() => {
    console.log('effect run, query is now', query)
    const search = names.filter(country => (country.toLowerCase().includes(query)))
    if (query) {
      if (search.length > 10){
        setName(null)
        setCapital(null)
        setArea(null)
        setLanguages([])
        setImage(null)
        setResult("text")
        setWeather(0)
        setWind(0)
        setWeatherIcon(null)
      }
      else if (search.length > 1 && search.length < 10){
        setName(null)
        setCapital(null)
        setArea(null)
        setLanguages([])
        setImage(null)
        setResult(search)
        setWeather(0)
        setWind(0)
        setWeatherIcon(null)
      }
      else if (search.length === 1) {
        setResult(null)
        console.log('trying', query)
        axios
          .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${search[0]}`)
          .then(response => {
            const country = response.data;

            setName(country.name.common);
            setCapital(country.capital);
            setArea(country.area);
            setLanguages(country.languages);
            setImage(country.flags.png);
            setLat(country.latlng[0]);
            setLon(country.latlng[1]);

            return axios.get(
              `https://api.openweathermap.org/data/3.0/onecall?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`
            )
          })
          .then(response => {
            console.log("country data: ", response.data)
            setWeather(response.data.current.temp);
            setWind(response.data.current.wind_speed);
            setWeatherIcon(response.data.current.weather[0].icon);
            setDesc(response.data.current.weather[0].description);
          })
        }
      }
  }, [query])
  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setQuery(value)
    console.log(languages)
    console.log(names)
  }

  const languageList = Object.entries(languages)

  console.log('lang:', languageList)
  return (
    <div>
      <form onSubmit={onSearch}>
        country: <input value={value} onChange={handleChange} />
        <button type="submit">find country</button>
      </form>
      <Header name={name} />
      <Capital name={capital} />
      <Area value={area} />
      <Languages languages={languageList} />
      <Result results={result} btnOnClick={btnOnClick}/>
      <img src={image} />
      <Weather weather={weather} wind={wind} name={capital} icon={weatherIcon} desc={desc}/>
    </div>
  )
}

export default App