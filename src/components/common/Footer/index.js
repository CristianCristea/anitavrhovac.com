import React from 'react';
import Typography from '@material-ui/core/Typography';
import './Footer.scss';

const Footer = () => (
  <section className="footer">
    <div className="copywrite">
      &copy;
      <Typography variant="caption">Anita Vrhovac</Typography>
    </div>
    <Typography variant="caption">
      created by <a href="https://cristiancristea.com">Cristian Cristea</a>
    </Typography>
  </section>
);

export default Footer;
