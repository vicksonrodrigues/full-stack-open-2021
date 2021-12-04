import React from 'react'

const Notification = ({ message,messageType }) => {

  if (message === null) {
    return null
  }
  else if(messageType === 'SUCCESS' ){
    return (
      <div className="success" >
        {message}
      </div>
    )
  }
  else if (messageType === 'ERROR'){
    return (
      <div className="error" >
        {message}
      </div>
    )
  }
}

export default Notification