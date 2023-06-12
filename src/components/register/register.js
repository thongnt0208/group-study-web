import React, { useRef } from "react";
import '../../styles/register.scss';
import { Image } from 'primereact/image';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';

const Register = () => {
  const toast = useRef(null);

const show = () => {
  toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.item.toString() });
};

const formik = useFormik({
  initialValues: {
    username: "",
    password: "",
    passwordAgain: ""
  },
  validate: (data) => {
    let errors = {};

    if (data.username) {
      errors.username = 'Username is required.';
    }
    if (data.password) {
      errors.password = 'Password is required.';
    }
    if (data.passwordAgain) {
      errors.passwordAgain = 'Confirm password is required.';
    }

    return errors;
  },
  onSubmit: (data) => {
    data.username && data.password && show();
    console.log("hello");
    formik.resetForm();
  }
});

const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

const getFormErrorMessage = (name) => {
  return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
};

return (
  <div className='registerComponentContainer'>
    <Toast ref={toast} />
    <h2 className="registerComponentTitle">Welcome to HTA Group Study website</h2>
    <Image src="logo_notext.png" alt="Image" width="250" />
    <form onSubmit={formik.handleSubmit} className="registerComponentForm">
      <InputText id="username" type="text" className="p-inputtext-lg" placeholder="Email or Username" required="true" />
      <InputText id="password" type="password" className="p-inputtext-lg" placeholder="Password" required="true" />
      <InputText id="passwordAgain" type="password" className="p-inputtext-lg" placeholder="Confirm Password" required="true" />
      <Button label="Register" type="submit" />

      <a href="#">Have account? Log in</a>
    </form>
  </div>
)

 
};


Register.defaultProps = {};

export default Register;
