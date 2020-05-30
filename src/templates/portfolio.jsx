import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from "gatsby-image"
import LightBox from "react-image-lightbox"
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Section from '../components/Section';

import "react-image-lightbox/style.css"

import './portfolio.scss';

const prevIndex = state => (state.index - 1) % state.images.length
const nextIndex = state =>
  (state.index + state.images.length + 1) % state.images.length

// const ImgWithOrient = ({ aspectRatio, imageKey, ...props }) => {
//   let orientation;
//   if (aspectRatio >= 1.2) orientation = "landscape";
//   if (aspectRatio <= 0.8) orientation = "portrait";
//   if (aspectRatio > 0.8 && aspectRatio < 1.2) orientation = "square";
//   //console.log('key:', imageKey);
//   return (
//     <div
//       className={`gallery__item gallery__item--${orientation}`}
//       >
//       <Img {...props} />
//     </div>
//   );
// };

// const PortfolioTemplate1 = ({ data}) => {
//   const {
//     title,
//     images,
//     desc
//   } = data.contentfulPortfolio
//   const [descExpand, setDescExpand] = useState(false);
//   const expandText = () => {
//     setDescExpand(!descExpand)
//   };

//   return (
//     <Layout bodyClass="portfolio">
//       <SEO
//         title={'Dimitar Tsvetkov'}
//         keywords={[
//           `photography`
//         ]}
//       />
//       <Section className="work">
//         <div className="work__header">
//           <h1 className="title title--h1 work__title">{title}</h1>
//           {desc && (
//           <div
//             className={`work__desc work__desc--${descExpand ? 'on' : 'off'}`}
//             role="button"
//             tabIndex={0}
//             onClick={() => expandText()}
//             onKeyDown={() => expandText()}
//             >{desc.description}</div>
//           )}
//         </div>
//         <div className="gallery">
//           {images.map((item, index) => (
//             <ImgWithOrient
//               key={index}
//               aspectRatio={item.fluid.aspectRatio}
//               alt={item.title}
//               fluid={item.fluid}
//             />
//           ))}
//         </div>
//       </Section>
//     </Layout>
//   );
// };

class PortfolioTemplate extends Component {
  constructor(props) {
  const items = props.data.contentfulPortfolio
  const fullSize = items.images.map(item => item.fluid.src)
  super(props)
    this.state = {
      index: 0,
      isOpen: false,
      images: fullSize,
      box: items,
      descExpand: false
    }

    this.renderLightBox = this.renderLightBox.bind(this)
    this.openLightBox = this.openLightBox.bind(this)
    this.closeLightBox = this.closeLightBox.bind(this)
    this.movePrev = this.movePrev.bind(this)
    this.moveNext = this.moveNext.bind(this)
  }


  openLightBox(index) {
    this.setState({
      index: index,
      isOpen: true,
    })
  }


  renderLightBox() {
    const { images } = this.state
    return (
      <LightBox
        mainSrc={images[this.state.index]}
        nextSrc={images[nextIndex(this.state)]}
        prevSrc={images[prevIndex(this.state)]}
        onCloseRequest={this.closeLightBox}
        onMovePrevRequest={this.movePrev}
        onMoveNextRequest={this.moveNext}
        imageLoadErrorMessage="Impossible de charger cette image"
        nextLabel="Next Image"
        prevLabel="Previous Image"
        zoomInLabel="Zoom in"
        zoomOutLabel="Zoom out"
        closeLabel="Close"
      />
    )
  }

  expandText = () => {
     this.setState(prevState => ({
      descExpand: !prevState.descExpand
    }));
  };

  closeLightBox() {
    this.setState({ isOpen: false })
  }

  movePrev() {
    this.setState(prevState => ({
      index: prevIndex(prevState),
    }))
  }

  moveNext() {
    this.setState(prevState => ({
      index: nextIndex(prevState),
    }))
  }

  render() {
    const {
      title,
      images,
      desc
    } = this.props.data.contentfulPortfolio;
    return (
      <Layout bodyClass="portfolio">
        <SEO
          title={'Dimitar Tsvetkov'}
          keywords={[
            `photography`
          ]}
        />
         <Section className="work">
          <div className="work__header">
            <h1 className="title title--h1 work__title">{title}</h1>
            {desc && (
            <div
              className={`work__desc work__desc--${this.state.descExpand ? 'on' : 'off'}`}
              role="button"
              tabIndex={0}
              onClick={() => this.expandText()}
              onKeyDown={() => this.expandText()}
              >{desc.description}</div>
            )}
          </div>
          <div className="gallery">
            {images.map((item, index) => (
              <div
                className="gallery__item"
                type="button"
                role="button"
                key={index}
                tabIndex={index}
                onClick={() => this.openLightBox(index)}
                onKeyDown={() => this.openLightBox(index)}
              >
              <Img
                sizes={{...item.sizes}}
              />
              </div>
            ))}
          </div>
        </Section>
        {this.state.isOpen && this.renderLightBox()}
      </Layout>
    )
  }
}

export default PortfolioTemplate


PortfolioTemplate.propTypes = {
  data: PropTypes.shape({
    contentfulPortfolio: PropTypes.object.isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query Portfolio($id: String!) {
    contentfulPortfolio(id: { eq: $id }) {
      id
      title
      desc: childContentfulPortfolioDescriptionTextNode {
        description
      }
      images {
        fluid(maxWidth: 2000, quality: 80) {
          aspectRatio
          ...GatsbyContentfulFluid_withWebp
        }
        fixed(width: 500, height: 500, quality: 80) {
          width
          height
          ...GatsbyContentfulFixed_withWebp_noBase64
        }
        sizes(maxWidth: 600) {
          ...GatsbyContentfulSizes_withWebp
        }
      }
    }
  }
`;