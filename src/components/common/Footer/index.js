import React from 'react';
import Typography from '@material-ui/core/Typography';
import './Footer.scss';

const Footer = () => (
  <section className="footer">
    <div className="copywrite">
      <Typography variant="caption">
        &copy; Anita Vrhovac - All rights reserved
      </Typography>
    </div>
    <div className="creator">
      <Typography variant="caption">
        Made with
        <span
          style={{ color: '#e25555', paddingLeft: '5px', paddingRight: '5px' }}
          dangerouslySetInnerHTML={{ __html: '&#9829;' }}
        />
        by
        <a href="https://cristiancristea.com"> Cristian Cristea</a>
      </Typography>
    </div>
  </section>
);

export default Footer;
