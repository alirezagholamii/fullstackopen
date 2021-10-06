import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BaseInput from './components/BaseInput'
import Content from './components/Content'





const App = () => {
  const [countries, setCountries] = useState([])
  const fetchData = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((res) => {
        setCountries(res.data)
      })
  }
  useEffect(fetchData, [])


  const [findInputValue, setFindInputValue] = useState('')
  const handleChangeFindInput = (value) => {
    setFindInputValue(value)
  }


  return (
    <div>
      <BaseInput label="find countries " changeHandler={handleChangeFindInput} />
      <Content list={countries} query={findInputValue} />
    </div>
  )
}

export default App