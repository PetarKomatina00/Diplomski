import React, { useState } from 'react'
import InputHelper from '../Helper/InputHelper'
import { useLoginUserMutation } from '../API/AuthApi';
import apiResponse from '../interfaces/apiResponse';
import { jwtDecode } from "jwt-decode"
import userModel from '../interfaces/userModel';
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../Storage/Redux/userAuthSlice';
import { useNavigate } from 'react-router-dom';
import MainLoader from '../Components/Layout/Page/Lekovi/Common/MainLoader';
import toastNotify from '../Helper/toastNotify';
function Login() {
    const [loginUser] = useLoginUserMutation();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        userName: "",
        password: ""
    })

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = InputHelper(e, userInput)
        setUserInput(tempData)
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e);
        setLoading(true);
        const response: apiResponse = await loginUser({
            userName: userInput.userName,
            password: userInput.password,
        })
        if (response.data) {
            const {token} = response.data.result;
            const {fullName, id, email, role} : userModel = jwtDecode(token)
            localStorage.setItem("token", token)
            dispatch(setLoggedInUser({fullName, id, email, role}))
            navigate("/");
        }
        else if (response.error) {
            toastNotify(response.error.data.errorMessages[0], "error");
        }
        setLoading(false);
    }
    const handleRegister = () => {
        navigate("/register")
    }
    return (
        <div className='container text-center'>
            {loading && <MainLoader/>}
            <form method='post' onSubmit={handleSubmit}>
                <h1 className='mt-5 '>Login</h1>
                <div className='mt-5'>
                    <div className='col-sm-6 offset-sm-3 col-xs-12 mt-4'>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Enter UserName'
                            required
                            name="userName"
                            value={userInput.userName}
                            onChange={handleUserInput}
                        />
                    </div>
                    <div className='col-sm-6 offset-sm-3 col-xs-12 mt-4'>
                        <input
                            type="password"
                            className='form-control'
                            placeholder='Enter Password'
                            required
                            name="password"
                            value={userInput.password}
                            onChange={handleUserInput}
                        />
                    </div>
                </div>
                <div className='mt-2'>
                    {error && <p className='text-danger'>{error}</p>}
                    <button type='submit'
                        className='btn btn-success'
                        style={{ width: "200px" }}>
                        Login
                    </button>
                </div>
                <div className='row mt-2'>
                    <span className="">OR</span>
                </div>
                <div className='mt-2'>
                    <button 
                    className='btn btn-success'
                    style={{ width: "200px" }}
                    onClick={handleRegister}>
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login