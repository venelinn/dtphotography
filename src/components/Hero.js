import React from 'react'
import Img from "gatsby-image"
import Section from "./Section"
import './Hero.scss';

const Hero = ({title, image}) => {
  return (
    <div className="hero">
      <Img
        fluid={{...image.fluid, aspectRatio: 16/9}}
        alt={title}
      />
        <div className="hero__content">
          <Section className="fixed">
            <h1 className="title title--h2">{title}</h1>
          </Section>
        </div>
    </div>

  )
}


export default Hero;