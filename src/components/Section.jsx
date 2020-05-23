import PropTypes from 'prop-types';
import React from 'react';

import './Section.scss';

const Section = ({
  children,
  className,
  theme,
  ...props
}) => (
  <section
    id={`${className}`}
    className={`section section--${className}`}
    data-theme={theme}
    {...props}
  >
    <div className={`section__inner ${className}`}>
      {children}
    </div>
  </section>
);

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

Section.defaultProps = {
  className: ''
};

export default Section;
