import React from 'react'
import { connect } from 'react-redux'

const Alert = ({alerts}) => {
  return(
    alerts && alerts.length? alerts.map(alert => 
      <div key={alert.id} className={`alert alert-${alert.type} mx-auto text-center`} role="alert">
        {alert.msg}
      </div>
    ) : null
  )
}

const mapStateToProps = state => ({ alerts: state.alerts })

export default connect(mapStateToProps)(Alert)