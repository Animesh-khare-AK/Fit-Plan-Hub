import React from 'react'
import './Plans.css'
import whiteTick from '../../assets/whiteTick.png'

const Plans = ({ data = [], user, onLogin }) => {
  return (
    <div className='plans-section' id='plans'>
      <div className='plans-header'>
        <span style={{color: 'var(--accent-orange)', fontWeight: 'bold'}}>READY TO START</span>
        <div>
          <span className='stroke-text'>YOUR </span>
          <span>JOURNEY</span>
        </div>
        <span style={{color: 'white', fontSize: '1rem', textTransform: 'none', fontWeight: '200'}}>
            Choose the best plan for you
        </span>
      </div>

      {data.length === 0 ? (
        <div className="no-plans">
          <span>No Plans Available</span>
        </div>
      ) : (
        <div className='plans-grid'>
          {data.map((plan, i) => (
            <div className='plan-card' key={i}>
              {/* Icon */}
              <svg viewBox="0 0 24 24">
                  <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22 14.86 20.57 16.29 22 18.43 19.86 19.86 21.29 21.29 19.86l-1.43-1.43 1.43-1.43-1.43-1.43-1.43 1.43zM6 6l-3 3 3 3 3-3-3-3zm12 12l-3 3 3 3 3-3-3-3z" />
              </svg>
              
              <span className='plan-title'>{plan.Title}</span>
              <span className='price-section'>₹ {plan.Price}</span>

              <div className='plan-details'>
                  <div className='detail-item'>
                      <img src={whiteTick} alt="" />
                      <span>{plan.Duration} Days Duration</span>
                  </div>
                  <div className='detail-item'>
                      <img src={whiteTick} alt="" />
                      <span>{plan.Description ? plan.Description.substring(0, 30) + '...' : 'Full Body Focus'}</span>
                  </div>
                  <div className='detail-item'>
                      <img src={whiteTick} alt="" />
                      <span>Trainer: {plan.TrainerName || 'Expert'}</span>
                  </div>
              </div>

              <div className="plan-actions">
                  <span style={{fontSize: '0.8rem', cursor: 'pointer'}}>See more benefits -&gt; </span>
                  <button className='btn-join' onClick={onLogin}>Join now</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Plans
