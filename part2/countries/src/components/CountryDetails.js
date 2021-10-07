import React, {useState,useEffect} from "react"
import axios from "axios"


const CountryDetails =({country})=>
{
    const [currentWeather,setCurrentWeather]=useState([])
    

    useEffect(()=>{
        const params=
        {
            access_key:process.env.REACT_APP_API_KEY,
            query : country.capital.toString()

        }
        axios
        .get('http://api.weatherstack.com/current',{params})
        .then(response=>{
          console.log('promise fulfilled at CountryDetails')
            setCurrentWeather(response.data)
        })
    
     },[])
    const size = Object.keys(currentWeather).length
    if (size > 0) {
        const weather = currentWeather.current
    return(
        <div>
            <h3>{country.name.common}</h3>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <b>Languages</b>
            <ul>
                {Object.values(country.languages).map(language=><li key={language}>{language}</li>)}
             </ul>
            <b>Flag:</b>
            <div>
                <br/>
                <img width="200" height="100" src={country.flags.png} alt='Flag'/>
            </div>
            <h3>Weather in {country.capital}</h3>
            <img width="100" height="100" src={ weather.weather_icons} alt='Weather Type'/>
            <div>
            <b>Temperature: </b>{weather.temperature}℃
            </div>
            <div>
            <b>Wind: </b>{weather.wind_speed} mph direction {weather.wind_dir}
            </div>
            

            
        </div>
    )
    }
    return(
    <div>
            <h3>{country.name.common}</h3>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <b>Languages</b>
            <ul>
                {Object.values(country.languages).map(language=><li key ={language}>{language}</li>)}
             </ul>
            <b>Flag:</b>
            <div>
                <br/>
                <img width="200" height="100" src={country.flags.png} alt='Flag'/>
            </div>
            </div>
    )

}
export default CountryDetails