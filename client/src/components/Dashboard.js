import React from 'react'
import { connect } from 'react-redux'

const Dashboard = () => {
  return(
    <div>DASHBOARD</div>
  )
}

//const mapStateToProps = state => ({ alerts: state.alerts })

export default connect()(Dashboard)