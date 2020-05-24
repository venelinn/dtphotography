import React from 'react'
import Img from "gatsby-image"

import './Hero.scss';

const Hero = props => {
  return (
    <div className="hero">
      <div className="hero__media">
        <Img
          fluid={{...props.data.fluid, aspectRatio: 16/9}}
          alt={props.data.title}
        />
      </div>
      <div className="hero__content">
        <h1 className="title title--h2">{props.data.title}</h1>
        <h2 className="title title--h4">{props.data.description}</h2>

      </div>
    </div>

  )
}


export default Hero;