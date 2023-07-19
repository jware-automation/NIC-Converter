import React, {useState} from 'react';
import './App.css';
import {Link, useNavigate} from 'react-router-dom';
import Validation from './Validation'; 
import Axios from 'axios';


function Login() {

    const [values, setValues] = useState({
        email: '',
        password : ''
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }

    Axios.defaults.withCredentials = true ;


    //Creating Login API
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.email === "" && errors.password === ""){
            Axios.post('http://localhost:5001/login', values)
            .then(res => {
                if(res.data === "Success"){
                    navigate('/Home');
                }else{
                    alert("No record Existed!")
                }
                
            })
            .catch(err => console.log(err));
        }
    }
    
 
  return (
    <div className='section'>
        <div className='Contain'>
             <h1 className='content-titile'>Login</h1>
                <form action='' className='reg-form form' onSubmit={handleSubmit}>
                    
                    <label htmlFor='email'>Email</label>
                    <input type='email' placeholder='Enter Email' name='email' onChange={handleInput}/>
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                    
                    <label htmlFor='password'>Password</label>
                    <input type='password' placeholder='Enter Password' name='password' onChange={handleInput}/>
                    {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                    
                    <button type='submit' className='btn btn-log'>Login</button>
                    
                    <p>Don't have an account?</p>
                    
                    <Link to='/Register' className='btn' style={{ textDecoration: 'none' }}>Register</Link>
                </form>
        </div>
    </div>
  )
}

export default Login