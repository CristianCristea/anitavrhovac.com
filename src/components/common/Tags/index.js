import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import './Tags.scss';

export default function Tags({ tags }) {
  return (
    <div className="tags">
      {tags.map(tag => (
        <Typography variant="subtitle2" className="tag" key={tag}>
          {tag}
        </Typography>
      ))}
    </div>
  );
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired
};
