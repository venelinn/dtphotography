import React from 'react'
import Img from 'gatsby-image'
// import { GatsbyImage } from "gatsby-plugin-image"
import { animated } from "react-spring"
import Link from 'gatsby-link'

import "./PortfolioItem.scss"

const PortfolioItem = ({data, style}) => {
  return (
    <animated.div
      style={style}
      className="folio"
    >
      <Img fluid={data.cover.fluid}  />
      <span className='folio__item'>
        <span className='folio__item__cell'>
          <h3 className='folio__item__title'>{data.title}</h3>
        </span>
      </span>
      <Link
        className='folio__link'
        to={`/${data.slug}`}
      ><span className="sr-only">{data.title}</span></Link>
    </animated.div>
  )
}

export default PortfolioItem
