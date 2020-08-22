import React from 'react'
import { connect } from 'react-redux'

const Alert = ({alerts}) => {
  return(
    <div className="alert-position">
      {alerts && alerts.length? alerts.map(alert => 
      <div key={alert.id} className={`alert alert-${alert.type} alert-position`} role="alert">
        {alert.msg}
      </div>
    ) : null}
    </div>
  )
}

const mapStateToProps = state => ({ alerts: state.alerts })

export default connect(mapStateToProps)(Alert)