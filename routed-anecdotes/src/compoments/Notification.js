import { Alert } from '@mui/material'

const Notification = ({notification})=>{
    return(
      <div>
        {(notification &&
    <Alert severity="success">
      {notification}
    </Alert>
  )}
      </div>
    )
  }

export default Notification