import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertBox extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Tooltip title={this.props.tooltip} enterDelay={500}>
          <Button
            variant="fab"
            color="default"
            mini
            className={this.props.classNames}
            onClick={() => {
              this.handleClickOpen();
            }}
          >
            {this.props.icon}
          </Button>
        </Tooltip>

        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {this.props.title}
          </DialogTitle>
          <DialogContent>
            {this.props.text && (
              <DialogContentText id="alert-dialog-slide-description">
                {this.props.text}
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Nein
            </Button>
            <Button
              onClick={() => {
                this.handleClose();
                this.props.dispatch(
                  this.props.actionOnConfirm(...this.props.args)
                );
              }}
              color="primary"
            >
              Ja
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AlertBox.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  tooltip: PropTypes.string,
  classNames: PropTypes.string,
  args: PropTypes.array,
  icon: PropTypes.element.isRequired,
  actionOnConfirm: PropTypes.func,
  dispatch: PropTypes.func
};

export default AlertBox;
