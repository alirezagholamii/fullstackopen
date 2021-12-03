import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification === null) {
    return null
  }

  return (
    <div className={notification.messageType}>
      {notification.message}
    </div>
  )
}

export default Notification