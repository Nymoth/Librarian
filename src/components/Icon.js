import React from 'react';
import PropTypes from 'prop-types';
import feather from 'feather-icons';

const Icon = ({ icon }) => <img src={`data:image/svg+xml;utf8,${feather.toSvg(icon)}`} alt={icon} />;

Icon.propTypes = {
  icon: PropTypes.string.isRequired
};

export default Icon;
