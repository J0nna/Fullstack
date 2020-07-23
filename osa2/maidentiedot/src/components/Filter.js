import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
    const [thisCountry, setThisCountry ] = useState('')
    const [showOrNot, setShowOrNot ] = useState('show')

    const handleClick = () =>{
        if(showOrNot === 'show'){
          setShowOrNot('dont show')
          setThisCountry(<Countrydetails country={country} />)
        }else{
          setShowOrNot('show')
          setThisCountry('')
        }
    }

    return (
    <div><p>{country.name}
    <button onClick={handleClick} >{showOrNot}</button>
    </p>
    {thisCountry}
    </div>
    )
  }
  

  const Countrydetails = ({ country }) => {
    if (country.name === 'France') {
      return (
        <div><h2>{country.name}</h2>Capital {country.capital} <br/>Population {country.population}
        <br/><h4>Languages</h4>
        {country.languages.map((language)=><Language key={language.name} language={language}/>)}
        <Flag country={country} />
        <Weather country={country} />
        </div>
      )
    }
    else {
    return (
    <div><h2>{country.name}</h2>Capital {country.capital} <br/>Population {country.population}
    <br/><h4>Languages</h4>
    {country.languages.map((language)=><Language key={language.name} language={language}/>)}
    <Flag country={country} />
    </div>
    )}
  }

const Language = ({ language }) => {
    return (
    <li>{language.name}</li>
    )
  }

const Flag = ({ country }) => {
    return(
    <img src={country.flag} width="20%" height="20%" alt="flag"/>
    )
  }

const Weather = ({country}) => {
  const [weather, setWeather] = useState(null) 
  const api_key = process.env.REACT_APP_API_KEY
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
  axios
      .get(url)
      .then(response => {
        console.log(response)
        setWeather(response.data)
      })
  console.log(weather)
      return(
      <div>{weather.current.temperature}</div>
      )
  } //useEffect??


const Filter = (props) => {
    const filtered = props.countries.filter(country => country.name.toLowerCase().includes(props.newFilter.toLowerCase()))
    if (filtered.length===1){return(
        <div>
        {filtered.map((country) => 
          <Countrydetails key={country.name} country={country} />
        )} 
    </div>
    )}
    else if (filtered.length < 11) {return(
    <div>
        {filtered.map((country) => 
          <Country key={country.name} country={country} />
        )}
    </div>
    )}
    else {
        return(
            <div>too many countries, try another filter
        </div>
        )
    }

}

export default Filter;