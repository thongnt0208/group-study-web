import React, { useRef } from "react";
import '../../styles/login.scss';
import { Image } from 'primereact/image';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import { Link, useNavigate } from "react-router-dom";




const Login = () => {

    const toast = useRef(null);

    const navigate = useNavigate();

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.item.toString() });
    };

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validate: (data) => {
            let errors = {};

            if (data.username) {
                errors.username = 'Username is required.';
            }
            if (data.password) {
                errors.password = 'Password is required.';
            }

            return errors;
        },
        onSubmit: (data) => {
            if (!formik.validate){
                console.log('Login sucessful');
                navigate('/home')
            }
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
        <div className='loginComponentContainer'>
            <Toast ref={toast} />
            <h2 className="loginComponentTitle">Welcome to HTA Group Study website</h2>
            <Image src="logo_notext.png" alt="Image" width="250" />
            <form onSubmit={formik.handleSubmit} className="loginComponentForm">
                <InputText id="username" type="text" className="p-inputtext-lg" placeholder="Email or Username" required="true" />
                <InputText id="password" type="password" className="p-inputtext-lg" placeholder="Password" required="true" />
                <Button label="Login" type="submit" />

                <Link to={'/register'}>Register new account</Link>
            </form>


        </div>
    )

};


Login.defaultProps = {};

export default Login;
