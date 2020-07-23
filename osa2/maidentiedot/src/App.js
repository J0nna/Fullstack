import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';


const App = () => {

  const [countries, setCountries] = useState([]) 
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  
  
  return (
    <div>
      <form>
        <div>
            Find countries: <input value={newFilter}
            onChange={handleNewFilter} />
        </div>
      </form>
    <div>
      <Filter countries={countries} newFilter={newFilter}/>
    </div>
    </div>
  )

}

export default App;
