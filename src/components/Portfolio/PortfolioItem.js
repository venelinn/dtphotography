import React from 'react'
import { Link} from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { animated } from "react-spring"
import "./PortfolioItem.scss"

const PortfolioItem = ({data, style}) => {
  const image = getImage(data.cover);
  return (
    <animated.div
      style={style}
      className="folio"
    >
      <GatsbyImage image={image} alt={data.title} />
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
