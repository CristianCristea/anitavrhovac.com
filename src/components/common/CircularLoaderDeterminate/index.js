import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class CircularLoaderDeterminate extends React.Component {
  state = {
    completed: this.props.uploadProgress
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({
      completed: completed >= 100 ? 0 : this.props.uploadProgress
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CircularProgress
          className={classes.progress}
          color="primary"
          variant="determinate"
          size={50}
          value={this.state.completed}
        />
      </div>
    );
  }
}

CircularLoaderDeterminate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CircularLoaderDeterminate);
