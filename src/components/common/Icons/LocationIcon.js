import React from 'react';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/icons/LocationOn';
import './LocationIcon.scss';

export default function LocationIcon({ text }) {
  return (
    <div className="icon__location">
      <Icon />
      <Typography variant="subheading" component="h3" color="textPrimary">
        {text}
      </Typography>
    </div>
  );
}
