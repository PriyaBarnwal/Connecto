import React, {Fragment} from 'react'
import Moment from 'react-moment'

const ProfileSection = ({data, id}) => {
  return (
    <section className={`${id}-section`}>
			<div className="row">
        {data.length> 0 ? (
        <Fragment>
          <div className="col-sm-4 d-flex align-items-center justify-content-center">
					  <div className="heading">
              {id=== 'experience'
                ? (
                  <h3>
                    <i className="fas fa-business-time"></i>
                    <b> Work Experience</b>
                  </h3>)
                : (
                  <h3>
                    <i className="fas fa-graduation-cap"></i>
                    <b> Education</b>
                  </h3>)
              }
						</div>
				  </div>
				  <div className="col-sm-8">
            {data.map(item => (
              <div className="card mb-3" key={item.id}>
                <div className="card-body">
                  <h5 className="card-title"><b>{item.title || item.school}</b></h5>
                  <h6 className="card-subtitle mb-2 text-muted"><b>{item.company || `${item.degree} in ${item.subject}`}</b></h6>
                  <h8 className="margin-t-10">
                    <Moment format="MMM YYYY">{item.from}</Moment> - {item.to ?<Moment format="MMM YYYY">{item.to}</Moment>: 'now'}
                  </h8>
                  <p className="card-text">{item.description}</p>
                </div>
              </div>	
              ))}
				  </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="col-12">
            <div className="heading">
						  {id === 'experience'?
                (<h3>
                  <i className="fas fa-business-time"></i>
                  <b> Work Experience</b>
                </h3>)
                : (
                <h3>
                  <i className="fas fa-graduation-cap"></i>
                  <b> Education</b>
                </h3>
                )}
					  </div>
            <h5 className="margin-t-10" style={{color: '#fff'}}>{`No ${id} added.`}</h5>
          </div>	
        </Fragment>
        )}
			</div>
	  </section>
  )
}

export default ProfileSection