import React from 'react'
import Img from 'gatsby-image'
import { animated } from "react-spring"
import Link from 'gatsby-link'

import "./PortfolioItem.scss"

const PortfolioItem = ({data, style}) => {
  return (
    <animated.div
      style={style}
      className="folio"
    >
      <Img sizes={{...data.cover.sizes, aspectRatio: 16/9}}  />
      <span className='folio__item'>
        <span className='folio__item__cell'>
          <h3 className='folio__item__title'>{data.title}</h3>
          <span className='folio__item__types'>{data.types}</span>
        </span>
      </span>
      <Link
        className='folio__link'
        to={`/${data.slug}`}
      ></Link>


    </animated.div>
  )
}

export default PortfolioItem
