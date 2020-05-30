import React from 'react'
import Img from "gatsby-image"

import './Hero.scss';

const Hero = ({title, image}) => {
  return (
    <div className="hero">
      <Img
        fluid={{...image.fluid, aspectRatio: 16/9}}
        alt={title}
      />
      <div className="hero__content">
        <h1 className="title title--h2">{title}</h1>
        {image.description && (
          <h2 className="title title--h4">{image.description}</h2>
        )}

      </div>
    </div>

  )
}


export default Hero;