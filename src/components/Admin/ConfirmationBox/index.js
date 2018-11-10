import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import './ConfirmationBox.scss';

// show on add album, photo, should be closable
export default function ConfirmationBox({ data, handleClose }) {
  return (
    <section className="confirmation-box">
      <Paper className="confirmation-box__content">
        <DoneIcon color="primary" className="confirmation-box__checkBtn" />
        <Typography variant="button">{data}</Typography>
        <IconButton
          onClick={handleClose}
          className="confirmation-box__closeBtn"
        >
          <CancelIcon />
        </IconButton>
      </Paper>
    </section>
  );
}
