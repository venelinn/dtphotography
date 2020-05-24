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
    className={`section`}
    data-theme={theme}
    {...props}
  >
    <div className={`section__inner`}>
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
