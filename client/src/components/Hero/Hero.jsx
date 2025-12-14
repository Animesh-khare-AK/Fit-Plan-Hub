import React from 'react'
import './Hero.css'
import { motion } from 'framer-motion'

const Hero = ({ onGetStarted, onLearnMore }) => {
  const stats = [
    { number: '140+', label: 'Expert Coaches' },
    { number: '978', label: 'Members Joined' },
    { number: '50', label: 'Fitness Programs' }
  ]

  return (
    <section className='hero' id='home'>
      <div className='hero-container'>
        <div className='hero-content'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            THE BEST <span className='highlight'>FITNESS CLUB</span> IN THE TOWN
          </motion.h1>

          <motion.p
            className='hero-subtitle'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            SHAPE YOUR <span className='highlight-text'>IDEAL BODY</span>
          </motion.p>

          <motion.p
            className='hero-description'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            In here we will help you to shape and build your ideal body and live up your life to fullest
          </motion.p>

          {/* Stats */}
          <motion.div
            className='hero-stats'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {stats.map((stat, idx) => (
              <div key={idx} className='stat-box'>
                <div className='stat-number'>{stat.number}</div>
                <div className='stat-label'>{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className='hero-cta'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button className='btn-primary' onClick={onGetStarted}>
              Get Started
            </button>
            <button className='btn-secondary' onClick={onLearnMore}>
              Learn More
            </button>
          </motion.div>
        </div>

        {/* Heart Rate & Calories Stats */}
        <motion.div
          className='hero-vitals'
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className='vital-card'>
            <div className='vital-icon'>❤️</div>
            <div className='vital-content'>
              <div className='vital-value'>116 bpm</div>
              <div className='vital-label'>Heart Rate</div>
            </div>
          </div>
          <div className='vital-card'>
            <div className='vital-icon'>🔥</div>
            <div className='vital-content'>
              <div className='vital-value'>220 kcal</div>
              <div className='vital-label'>Calories Burned</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background gradient blobs */}
      <div className='hero-blob hero-blob-1'></div>
      <div className='hero-blob hero-blob-2'></div>
    </section>
  )
}

export default Hero
