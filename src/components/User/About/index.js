import React from 'react';
import Jumbotron from './../../common/Jumbotron';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/MailOutlined';
import './About.scss';

const About = () => {
  const details = {
    name: 'Anita',
    location: 'Croatia',
    tags: ['#aboutme']
  };
  return (
    <section className="about container">
      <Jumbotron imageId="about_me" details={details} />
      <div className="about_details">
        <div className="about__contact">
          <Typography variant="h6" gutterBottom>
            Contact
          </Typography>
          <div className="about__contact__mail">
            <MailIcon />
            <Typography variant="body1" gutterBottom>
              persona@gmail.com
            </Typography>
          </div>
        </div>
        <div className="about__legal">
          <Typography variant="h6" gutterBottom>
            Impressum
          </Typography>
          <Typography variant="body2" gutterBottom>
            Alle auf diesem Internetangebot gezeigten Bilder unterliegen dem
            Urheberrecht (Copyright). Dies gilt ebenso für die Programmierung
            dieser Internetpräsenz. Eine Vervielfältigung oder Verwendung der
            Lichtbilder und Seiten (oder Teilen davon) in anderen elektronischen
            oder gedruckten Publikationen und deren Veröffentlichung (auch im
            Internet) ist nur nach vorheriger Einwilligung gestattet. Weiterhin
            können Bilder, Grafiken, Text- oder sonstige Dateien ganz oder
            teilweise dem Urheberrecht Dritter unterliegen. Logos und Eigennamen
            auf Lichtbildern sind urheberrechtlich geschützt und dienen
            lediglich im Sinne von Arbeitsbeispielen in diesem Onlineportfolio.
          </Typography>

          <Typography variant="body2" gutterBottom>
            All images shown on this website are subject to copyright. This also
            applies to the programming of this website. Reproduction or use of
            the photographs and pages (or parts thereof) in other electronic or
            printed publications and their publication (including on the
            Internet) is permitted only with prior consent. Furthermore, images,
            graphics, text or other files may be wholly or partly subject to the
            copyright of third parties. Logos and proper names on photographs
            are protected by copyright and serve only in the sense of working
            examples in this online portfolio.
          </Typography>
          <a
            style={{
              minWidth: '78px',
              color: 'inherit',
              fontSize: '13px',
              marginRight: '5px'
            }}
            href={`${
              process.env.PUBLIC_URL
            }/datenschutzerklaerung-privacy-policy`}
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
