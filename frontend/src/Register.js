import React,{useState} from 'react';
import './App.css';
import {Link, useNavigate} from 'react-router-dom';
import Validation from './RegValidation';
import Axios from 'axios';



function Register() {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password : ''
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    } 

    //Creating Api for Registration

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.name === "" && errors.email === "" && errors.password === ""){
            Axios.post('http://localhost:5001/nicuser', values)
            .then(res => {
                navigate('/');
            })
            .catch(err => console.log(err));
        }
    }


  return (
    <div className='section'>
        <div className='Contain'>
             <h1 className='content-titile'>Registration</h1>
                <form action='' className='reg-form form' onSubmit={handleSubmit}>
                    
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' onChange={handleInput} placeholder='Enter Name' />
                    {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                    
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' onChange={handleInput} placeholder='Enter Email' />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' onChange={handleInput} placeholder='Enter Password' />
                    {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}

                    <button type='submit' className='btn btn-reg'>Register</button>
                    <p>Already have an account?</p>
                    <Link to='/' className='btn' style={{ textDecoration: 'none' }}>Login</Link> 
                </form>
        </div>
    </div>
  )
}

export default Register