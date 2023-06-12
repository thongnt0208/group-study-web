import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/login.scss';
import { Image } from 'primereact/image';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
        


const Login = () => (
  <div className='loginComponentContainer'>
    <h2>Welcome to HTA Group Study website</h2>
    <Image src="logo_notext.png" alt="Image" width="250" />
    <InputText type="text" className="p-inputtext-lg" placeholder="Email or Username" />
    <InputText type="password" className="p-inputtext-lg" placeholder="Password" />
    <Button label="Login" />
  </div>
);

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
