import { Alert } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return{
    notification:state.notification
  }
}

const Notification = (props) => {


  if(props.notification.message!== null)
    return (
      <div>
        <Alert variant='filled' severity={props.notification.notificationType } >
          {props.notification.message}
        </Alert>
      </div>
    )
  else
    return(
      <div></div>
    )
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification

/* <div style={style}>
        {props.notification.message}
      </div> */