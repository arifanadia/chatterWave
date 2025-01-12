import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
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
        const { username, email, password, confirmPassword } = values;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

        if (password !== confirmPassword) {
            toast.error("Password and confirm password should be the same", toastOption);
            return false;
        } else if (username.length < 3) {
            toast.error("Username should be greater than 3 characters", toastOption);
            return false;
        } else if (!passwordRegex.test(password)) {
            toast.error("Password should be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one digit", toastOption);
            return false;
        } else if (email === "") {
            toast.error("Please enter your email", toastOption);
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!values.username || !values.email || !values.password || !values.confirmPassword) {
            toast.error("Please fill in all fields", toastOption);
            return;
        }

        if (handleValidation()) {
            console.log("in validation");
            try {

                const { username, email, password } = values

                const { data } = await axiosPublic.post('/users/register', {
                    username,
                    email,
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
                toast.error('Registration failed. Please try again.', toastOption);
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
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    onChange={handleChange}
                />
                <button type="submit">Create User</button>
                <span>Already have an account? <Link to="/login">Login</Link></span>
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

export default Register;
