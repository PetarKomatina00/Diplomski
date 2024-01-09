import React, { useState } from 'react'
import InputHelper from '../Helper/InputHelper'
import { useRegisterUserMutation } from '../API/AuthApi';
import apiResponse from '../interfaces/apiResponse';
import toastNotify from '../Helper/toastNotify';
import { useNavigate } from 'react-router-dom';
import MainLoader from '../Components/Layout/Page/Lekovi/Common/MainLoader';
function Register() {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const [loading, setLoading] = useState(false)
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
    role: "",
    name: "",
    lastName: ""
  })

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const tempData = InputHelper(e, userInput)
    setUserInput(tempData)
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response: apiResponse = await registerUser({
      userName: userInput.userName,
      password: userInput.password,
      name: userInput.name,
      prezime: userInput.lastName,
      role: userInput.role
    })
    if (response.data) {
      toastNotify("Registration is successful. Please login to continue.")
      navigate("/login")
    }
    else if (response.error) {
      toastNotify(response.error.errorMessages[0], "error")
    }
  }
  return (
    <div className='container text-center'>
      {loading && <MainLoader />}
      <form method='post' onSubmit={handleSubmit}>
        <h1 className='mt-5'>Register</h1>
        <div className='mt-5'>
          <div className='col-sm-6 offset-sm-3 col-xs-12 mt-4'>
            <input
              type="text"
              className='form-control'
              placeholder='Enter UserName'
              name="userName"
              value={userInput.userName}
              onChange={handleUserInput}
              required
            />
          </div>
          <div className='col-sm-6 offset-sm-3 col-xs-12 mt-4'>
            <input
              type="text"
              className='form-control'
              placeholder='Enter Name'
              name="name"
              value={userInput.name}
              onChange={handleUserInput}
              required
            />
          </div>
          <div className='col-sm-6 offset-sm-3 col-xs-12 mt-4'>
            <input
              type="text"
              className='form-control'
              placeholder='Enter Last Name'
              name="lastName"
              value={userInput.lastName}
              onChange={handleUserInput}
              required
            />
          </div>
          <div className='col-sm-6 offset-sm-3 col-xs-12 mt-4'>
            <input
              type="password"
              className='form-control'
              placeholder='Enter Password'
              name="password"
              value={userInput.password}
              onChange={handleUserInput}
              required
            />
          </div>
          <div className='col-sm-6 offset-sm-3 col-xs-12 mt-4'>
            <select className='form-control form-select'
              required value={userInput.role}
              name="role"
              onChange={handleUserInput}>
              <option value="">--Select Role--</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              <option></option>
            </select>
          </div>
        </div>
        <div className='mt-5'>
          <button type='submit' className='btn btn-success' disabled={loading}>
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register