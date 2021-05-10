import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { func, object, string } from 'prop-types';
import Img from 'gatsby-image';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

const RichText = ({ data, className, renderComponents }) => {
  const options = {
    renderNode: {
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className={listClassName}>{children}</ul>
      ),
      [INLINES.EMBEDDED_ENTRY]: node => {
      	const contentType = node?.data?.target?.sys?.contentType?.sys?.contentful_id;
      	const fields = node?.data?.target?.fields;
      	return renderComponents ? renderComponents(contentType, fields) : "";
      },

      [INLINES.HYPERLINK]: node => {
        if (node.data.uri.indexOf('youtube.com/embed') !== -1) {
          return (
            <iframe
              width='560'
              height='315'
              src={node.data.uri}
              frameborder='0'
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowfullscreen
            ></iframe>
          );
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: node =>  <Img {...node.data.target} />,
    },
    renderText: text =>
      text.split('\n').flatMap((_text, i) => [i > 0 && <br />, _text]),
  };
  return <div className={className}>{renderRichText(data, options)}</div>;
};

RichText.propTypes = {
  className: string,
  data: object.isRequired,
  renderComponents: func,
};

RichText.defaultProps = {
  className: null,
  renderComponents: null,
};
export default RichText;
