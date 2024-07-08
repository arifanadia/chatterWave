import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Login = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",

    });
    useEffect(() => {
        if (localStorage.getItem('chatterWave user')) {
            navigate('/')
        }
    })

    const toastOption = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        theme: "dark"
    };

    const handleValidation = () => {
        const { username, password } = values;

        if (!password) { // checks if password is falsy (null, undefined, "", 0, false)
            toast.error("Password is required", toastOption);
            return false;
        } else if (!username) { // checks if username is falsy (null, undefined, "", 0, false)
            toast.error("Username is required", toastOption);
            return false;
        }
        return true;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (handleValidation()) {
            console.log("in validation");
            try {

                const { username, password } = values

                const { data } = await axiosPublic.post('/users/login', {
                    username,
                    password
                });

                console.log(data);
                if (data.status === false) {
                    toast.error(data.msg, toastOption);
                }

                if (data.status === true) {
                    localStorage.setItem("chatterWave user", JSON.stringify(data.user))
                    toast.success('Sign up successful');
                    navigate('/');
                }
            } catch (err) {
                toast.error('Login failed. Please try again.', toastOption);
                console.log(err);
            }
        }
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <div className="brand">
                    <img src={logo} alt="Logo" />
                    <h1>ChatterWave</h1>
                </div>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                    min="3"
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
                <span>Don't have an account? <Link to="/register">Register</Link></span>
            </form>
        </FormContainer>
    );
};

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #131324;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 5rem;
        }
        h1 {
            color: white;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }
        button {
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover {
                background-color: #4e0eff;
            }
        }
        span {
            color: white;
            text-align: center;
            a {
                color: #4e0eff;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`;

export default Login;
