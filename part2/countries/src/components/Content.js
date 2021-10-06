import React, { useEffect, useState } from 'react'
import Card from './Card'
const Content = ({ list, query }) => {
  const [filteredList,setFilteredList] = useState([]);

  useEffect(()=>{
    const arr = list.filter((item) => {
      return item.name.common.toLowerCase().includes(query.toLowerCase())
    })
    setFilteredList(arr)
  },[query,list])


  const showItem = (country) => {
    setFilteredList([country])
  }

  if (!query) {
    return (<div></div>)
  }
  if (filteredList.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  }
  if (filteredList.length <= 10 && filteredList.length > 1) {
    return (<div>
      {filteredList.map((country) => {
        return (<div key={country.name.common}>{country.name.common}
          <button onClick={()=>{showItem(country)}}>show</button>
        </div>)
      })}
    </div>)
  }
  if (filteredList.length === 0) {
    return (<div>not founded</div>)
  }

  return (<Card country={filteredList[0]} />)
}

export default Content