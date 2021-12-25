import React from 'react'
import { useSelector } from 'react-redux'
import Alert from '@material-ui/lab/Alert';


const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification === null) {
    return null
  }

  return (
    <Alert severity={notification.messageType}>{notification.message}</Alert>
  )
}

export default Notification