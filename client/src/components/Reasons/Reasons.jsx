import React from 'react'
import './Reasons.css'
import { motion } from 'framer-motion'

const Reasons = () => {
  const reasons = [
    {
      id: 1,
      icon: '🏋️',
      title: 'Over 140+ Expert Coach',
      description: 'Train smarter and faster than before'
    },
    {
      id: 2,
      icon: '🎯',
      title: '1 Free Program For New Member',
      description: 'Start your journey with a complimentary program'
    },
    {
      id: 3,
      icon: '🤝',
      title: 'Reliable Partners',
      description: 'Partnered with top fitness brands worldwide'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section className='reasons' id='why-us'>
      <div className='reasons-container'>
        <motion.div
          className='reasons-header'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className='section-label'>SOME REASONS</span>
          <h2>WHY CHOOSE <span className='highlight'>US?</span></h2>
        </motion.div>

        <motion.div
          className='reasons-grid'
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.id}
              className='reason-card'
              variants={itemVariants}
            >
              <div className='reason-icon'>{reason.icon}</div>
              <h3 className='reason-title'>{reason.title}</h3>
              <p className='reason-description'>{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className='reasons-blob reasons-blob-1'></div>
      <div className='reasons-blob reasons-blob-2'></div>
    </section>
  )
}

export default Reasons
