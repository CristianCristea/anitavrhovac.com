import React from 'react';
import Jumbotron from './../../common/Jumbotron';
import './About.scss';
import { Typography } from '@material-ui/core';

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
        <Typography variant="body1">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum,
          amet nostrum odio ipsa earum cupiditate maiores qui sequi accusantium
          molestias quasi ea dolores enim sint voluptatem. Ut, fugiat harum
          dolore quia quod tempora iste. Laboriosam iure sit consequuntur
          numquam non, eaque facere autem impedit eum accusamus eligendi vel
          nihil ad doloremque quod odit suscipit soluta vitae recusandae?
          Nostrum, quae.
        </Typography>
      </div>
    </section>
  );
};

export default About;
