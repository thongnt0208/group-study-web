import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/home.scss';
import { Button } from 'primereact/button'; 


const Home = () => (
  <div>
    <Button label="Check" icon="pi pi-check" />
  </div>
);

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
