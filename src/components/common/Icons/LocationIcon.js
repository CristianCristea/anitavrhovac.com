import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/icons/LocationOn';
import './LocationIcon.scss';

export default function LocationIcon({ text }) {
  return (
    <div className="icon__location">
      <Icon />
      <Typography variant="subtitle2" className="icon__location__title">
        {text}
      </Typography>
    </div>
  );
}

LocationIcon.propTypes = {
  text: PropTypes.string.isRequired
};
