import React from 'react'

const Filter = ({ handeChangeFilter }) => {
  const handleChangeFilterValue = (event) => {
    handeChangeFilter(event.target.value)
  }

  return (
    <div>
      <div>
        filter shown with: <input onChange={handleChangeFilterValue} />
      </div>
    </div>
  )
}

export default Filter