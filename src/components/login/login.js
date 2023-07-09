import React, { useEffect, useRef, useState } from "react";
import '../../styles/login.scss';
import { Image } from 'primereact/image';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { isExpired, decodeToken } from "react-jwt";


const Login = ({ onLogin }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const toast = useRef(null);
    const navigate = useNavigate();
    const show = (severity, summary, detail) => {
        toast.current.show({ severity: severity, summary: summary, detail: detail });
    };
    const [currentUser, setCurrentUser] = useState(null);

    //Log out the current user object everywhen the user changes
    useEffect(() => {
        console.log('Current user ne: ', currentUser);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser]);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: data => {
            console.log("hello");
            console.log(data);

            axios
                .post(`${apiUrl}/users/login`, {
                    username: data.username,
                    password: data.password,
                })
                .then((response) => {
                    const { token } = response.data; // Assuming the response contains a token field

                    // Store the token in local storage
                    localStorage.setItem('token', token);

                    // Call the onLogin callback function to update the isLoggedIn state in the App component
                    onLogin();

                    // Decode JWT token
                    console.log(token.replace('Bearer ', ''));
                    const decodedToken = decodeToken(token.replace('Bearer ', ''));
                    setCurrentUser(decodedToken);

                    show('success', `Hello ${data.username}!`, 'You are directing to Home');
                    setTimeout(() => {
                        if (Object.keys(formik.errors).length === 0) {
                            console.log('Login successful');
                            navigate('/home');
                        }
                    }, 3000);
                    formik.resetForm();
                })
                .catch((error) => {
                    // Handle any login API error here
                    console.error('Login failed:', error);
                    // Optionally, you can show an error toast message
                    show('error', 'Login Failed', 'Please try again');
                });
        }
    });

    return (
        <div className='loginComponentContainer'>
            <Toast ref={toast} />
            <h2 className="loginComponentTitle">Welcome to HTA Group Study website</h2>
            <Image src="logo_notext.png" alt="Image" width="250" />
            <form onSubmit={formik.handleSubmit} className="loginComponentForm">
                <InputText
                    id="username"
                    type="text"
                    className="p-inputtext-lg"
                    placeholder="Email or Username"
                    required="true"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                <InputText
                    id="password"
                    type="password"
                    className="p-inputtext-lg"
                    placeholder="Password"
                    required="true"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <Button label="Login" type="submit" />

                <Link to={'/register'}>Register new account</Link>
            </form>
        </div>
    )
};


Login.defaultProps = {};

export default Login;
