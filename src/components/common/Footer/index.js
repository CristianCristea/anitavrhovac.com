import React from 'react';
import Typography from '@material-ui/core/Typography';
import './Footer.scss';

const Footer = () => (
  <section className="footer">
    <div className="copywrite">
      &copy;
      <Typography variant="caption">
        Anita Vrhovac - All rights reserved
      </Typography>
    </div>
    <Typography variant="caption">
      Made with{' '}
      <span
        style={{ color: '#e25555' }}
        dangerouslySetInnerHTML={{ __html: '&#9829;' }}
      />{' '}
      by
      <a href="https://cristiancristea.com"> Cristian Cristea</a>
    </Typography>
  </section>
);

export default Footer;
