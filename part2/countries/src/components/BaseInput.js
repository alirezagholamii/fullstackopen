import React from 'react'

const BaseInput = ({ changeHandler, label }) => {
  const handleChangeInput = (event) => {
    changeHandler(event.target.value)
  }
  return (<>
    <div>
      <label>{label}</label>
      <input onChange={handleChangeInput} />
    </div>
  </>)
}

export default BaseInput