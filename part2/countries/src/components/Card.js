import React from 'react'
import Weather from './Weather'

const Card = ({ country }) => {
    return (
      <div>
        <h2><b>{country.name.common}</b></h2>
        <p>official: {country.name.official}</p>
        <p>capital: {country.capital[0]}</p>
        <p>name in Persian: {country.translations?.per?.common}</p>
        <h4>Languages</h4>
        <ul>
          {Object.values(country.languages).map((item) => {
            return (<li key={item}>{item}</li>)
          })}
        </ul>
        <div>
          <img alt="" src={country.flags.png} />
        </div>
        <Weather city={country.capital[0]} />

      </div>
    )
  }

export default Card