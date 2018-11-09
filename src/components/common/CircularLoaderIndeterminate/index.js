import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: '0 auto'
  }
});

function CircularLoaderIndeterminate(props) {
  const { classes } = props;
  return (
    <div>
      <CircularProgress
        className={classes.progress}
        color="primary"
        size={50}
      />
    </div>
  );
}

CircularLoaderIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CircularLoaderIndeterminate);
