import React from 'react'
import './Hero.css'
import { motion } from 'framer-motion'
import HeroImage from '../../assets/hero_image.png'
import HeroImageBack from '../../assets/hero_image_back.png'
import Heart from '../../assets/heart.png'
import Calories from '../../assets/calories.png'

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
          <div className="the-best-ad">
            <motion.div
              initial={{ left: '238px' }}
              whileInView={{ left: '8px' }}
              transition={{ duration: 3, type: 'tween' }}
            ></motion.div>
            <span>THE BEST Place For Fitness</span>
          </div>

          <div className="hero-text">
            <div>
              <span className='stroke-text'>SHAPE </span>
              <span>YOUR</span>
            </div>
            <div>
              <span>IDEAL BODY</span>
            </div>
            <div>
              <span>
                In here we will help you to shape and build your ideal body and live up your life to fullest
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="figures">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <span>{stat.number}</span>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hero-buttons">
            <button className='btn' onClick={onGetStarted}>Get Started</button>
            <button className='btn' onClick={onLearnMore}>Learn More</button>
          </div>
        </div>

        {/* Right Side */}
        <div className="right-h">
          
          <motion.div
            initial={{ right: '-1rem' }}
            whileInView={{ right: '4rem' }}
            transition={{ duration: 3, type: 'tween' }}
            className="heart-rate"
          >
            <img src={Heart} alt="" />
            <span>Heart Rate</span>
            <span>116 bpm</span>
          </motion.div>

          <img src={HeroImage} alt="" className='hero-image' />
          <motion.img
            initial={{ right: '11rem' }}
            whileInView={{ right: '20rem' }}
            transition={{ duration: 3, type: 'tween' }}
            src={HeroImageBack} alt="" className='hero-image-back'
          />

          <motion.div
            initial={{ right: '37rem' }}
            whileInView={{ right: '28rem' }}
            transition={{ duration: 3, type: 'tween' }}
            className="calories"
          >
            <img src={Calories} alt="" />
            <div>
              <span>Calories Burned</span>
              <span>220 kcal</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
