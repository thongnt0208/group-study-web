import React, { useRef, useState } from "react";
import "../../styles/register.scss";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;
// console.log(apiUrl);

const Register = () => {
  const toast = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  const show = () => {
    const { username, password } = formik.values;
    toast.current.show({
      severity: "success",
      summary: "Form Submitted",
      detail: `Username: ${username} Password: ${password}`,
    });
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    try {
      const response = await fetch(`${apiUrl}/users/register`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        // Handle the result here (e.g., show success message)
        if (data.username && data.password && data.passwordAgain) {
          show();
          formik.resetForm();
        }
      } else {
        const errorData = await response.json();
        // Handle the error here (e.g., show error message)
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      // Handle any network or other errors here
      console.error("Error:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordAgain: "",
    },
    validate: (data) => {
      let errors = {};

      if (data.username) {
        errors.username = "Username is required.";
      }
      if (data.password) {
        errors.password = "Password is required.";
      }
      if (data.passwordAgain) {
        errors.passwordAgain = "Confirm password is required.";
      }

      return errors;
    },
    onSubmit: onSubmit,
    // (data) => {
    //   data.username && data.password && show();
    //   console.log("hello");
    //   formik.resetForm();
    // }
  });

  const isFormFieldInvalid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  // return (
  //   <div className='registerComponentContainer'>
  //     <Toast ref={toast} />
  //     <h2 className="registerComponentTitle">Welcome to HTA Group Study website</h2>
  //     <Image src="logo_notext.png" alt="Image" width="250" />
  //     <form onSubmit={formik.handleSubmit} className="registerComponentForm">
  //       <InputText id="username" type="text" className="p-inputtext-lg" placeholder="Email or Username" required="true" />
  //       <InputText id="password" type="password" className="p-inputtext-lg" placeholder="Password" required="true" />
  //       <InputText id="passwordAgain" type="password" className="p-inputtext-lg" placeholder="Confirm Password" required="true" />
  //       <Button label="Register" type="submit" />
  //       <Link to={'/'}>Have account? Log in</Link>
  //     </form>
  //   </div>
  // )

  return (
    <div className="registerComponentContainer">
      <Toast ref={toast} />
      <h2 className="registerComponentTitle">
        Welcome to HTA Group Study website
      </h2>
      <Image src="logo_notext.png" alt="Image" width="250" />
      <form onSubmit={formik.handleSubmit} className="registerComponentForm">
        <InputText
          name="username"
          id="username"
          type="text"
          className="p-inputtext-lg"
          placeholder="Email or Username"
          required="true"
        />
        <InputText
          name="password"
          id="password"
          type="password"
          className="p-inputtext-lg"
          placeholder="Password"
          required="true"
        />
        <InputText
          name="passwordAgain"
          id="passwordAgain"
          type="password"
          className="p-inputtext-lg"
          placeholder="Confirm Password"
          required="true"
        />
        <Button label="Register" type="submit" />
        <Link to={"/"}>Have an account? Log in</Link>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

Register.defaultProps = {};

export default Register;
