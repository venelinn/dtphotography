import React from 'react'
// import Img from "gatsby-image"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Section from "./Section"
import './Hero.scss';

const Hero = ({title, image}) => {
  const heroImage = getImage(image);
  return (
    <div className="hero">
      {/* <Img
        fluid={{ ...image.fluid, aspectRatio: 16/9}}
        alt={title}
      /> */}
      <GatsbyImage image={heroImage} alt={title} />
        <div className="hero__content">
          <Section className="fixed">
            <h1 className="title title--h2">{title}</h1>
          </Section>
        </div>
    </div>

  )
}


export default Hero;