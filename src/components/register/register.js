import React, { useRef, useState } from "react";
import "../../styles/register.scss";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Link, useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

const Register = () => {
  const navigate = new useNavigate();
  const toast = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "Register Successfully",
      detail: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      username: username,
      password: password
    };

    console.log(payload);

    try {
      const response = await fetch(`${apiUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        // Handle the result here (e.g., show success message)
        if (username && password && passwordAgain) {
          show();
          setUsername("");
          setPassword("");
          setPasswordAgain("");
          setTimeout(() => {
            navigate('/')
          }, 1500);
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

  const isFormFieldInvalid = (value) => {
    return !value;
  };

  const getFormErrorMessage = (value) => {
    return isFormFieldInvalid(value) ? (
      <small className="p-error">Field is required.</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <div className="registerComponentContainer">
      <Toast ref={toast} />
      <h2 className="registerComponentTitle">
        Welcome to HTA Group Study website
      </h2>
      <Image src="logo_notext.png" alt="Image" width="250" />
      <form onSubmit={handleSubmit} className="registerComponentForm">
        <InputText
          name="username"
          id="username"
          type="text"
          className="p-inputtext-lg"
          placeholder="Email or Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {getFormErrorMessage(username)}
        <InputText
          name="password"
          id="password"
          type="password"
          className="p-inputtext-lg"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {getFormErrorMessage(password)}
        <InputText
          name="passwordAgain"
          id="passwordAgain"
          type="password"
          className="p-inputtext-lg"
          placeholder="Confirm Password"
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
          required
        />
        {getFormErrorMessage(passwordAgain)}
        <Button label="Register" type="submit" />
        <Link to={"/"}>Have an account? Log in</Link>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Register;
