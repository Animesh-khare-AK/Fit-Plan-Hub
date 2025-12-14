import React from 'react'
import './Plans.css'
import { motion } from 'framer-motion'

const Plans = ({ data = [], user, onLogin }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  const isSubscribed = user?.subscription || false

  return (
    <div className='plans-section' id='plans'>
      <div className='plans-header'>
        <span>PREMIUM TRAINING</span>
        <div>
          <span className='stroke-test'>expert </span>
          <span>trainer plans</span>
        </div>
        <p>Transform your fitness journey with personalized plans from industry experts</p>
      </div>

      <motion.div
        className='plans-grid'
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {data.map((plan) => (
          <motion.div key={plan.uuid} className='plan-card' variants={itemVariants}>
            {/* Lock Icon for Non-Subscribers */}
            {!isSubscribed && (
              <div className='lock-overlay'>
                <div className='lock-content'>
                  <div className='lock-icon'>🔒</div>
                  <p>Subscribe to unlock</p>
                  <button onClick={onLogin} className='unlock-btn'>
                    View Full Details
                  </button>
                </div>
              </div>
            )}

            {/* Plan Header with Trainer Info */}
            <div className='plan-header-card'>
              <div className='trainer-avatar'>
                {plan.TrainerName?.charAt(0).toUpperCase() || '👨'}
              </div>
              <div className='trainer-info'>
                <h3 className='plan-title'>{plan.Title}</h3>
                <p className='trainer-name'>{plan.TrainerName || plan.TrainerEmail}</p>
              </div>
            </div>

            {/* Price Section - Always Visible */}
            <div className='price-section'>
              <span className='price-label'>Starting at</span>
              <span className='price'>₹{plan.Price}</span>
            </div>

            {/* Details - Only for Subscribers */}
            {isSubscribed && (
              <motion.div 
                className='plan-details'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className='detail-item'>
                  <span className='detail-label'>Duration</span>
                  <span className='detail-value'>{plan.Duration} days</span>
                </div>
                <div className='detail-item'>
                  <span className='detail-label'>Focus Area</span>
                  <span className='detail-value'>Full Body</span>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className='plan-actions'>
              {user ? (
                <>
                  <button className='btn-secondary'>
                    {plan.isFollowed ? '✓ Following' : '+ Follow'}
                  </button>
                  <button className='btn-primary'>
                    {isSubscribed ? 'Purchase' : 'Subscribe'}
                  </button>
                </>
              ) : (
                <button className='btn-primary btn-login' onClick={onLogin}>
                  Sign In to View
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {data.length === 0 && (
        <div className='empty-state'>
          <p>No trainer plans available at the moment</p>
        </div>
      )}
    </div>
  )
}

export default Plans
