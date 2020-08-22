import React from 'react'
import NotFound from '../img/notfound.png'

const NotFoundPage = () => {
  return (
    <section style={{textAlign: 'center'}}>
      <img src={NotFound} alt=""/>
      <h1 className="color-prime">
        <i className='fas fa-exclamation-triangle' /> Page Not Found
      </h1>
      <p className='large'>Sorry, this page does not exist</p>
    </section>
  )
}

export default NotFoundPage
