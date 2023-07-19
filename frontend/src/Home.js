import React, {useState} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Home() {

    const [nicNumber, setNicNumber] = useState('');

    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');

    const [error, setError] = useState(''); //error


    //creating API for calculate process

    const handleFindClick = () => {

    axios.post('http://localhost:5001/calculate', { nic: nicNumber })
      .then(response => {
        const { day, month,year, gender } = response.data;
        setBirthday(`${year} ${month} ${day}`);
        setGender(gender);
        setError('');//error
      }).catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError('An error occurred'); // Generic error message if no specific error message is available
        }
      //.catch(error => {
        //console.error(error);
        // Handle error response
      });
    };




  return (
    <div className='header'>
        
        {/* Header Bar Section */}

         <div className='header top'>            
            <Link to="/" className='log-out' style={{ textDecoration: 'none' }}> Log out</Link>
         </div>

        {/* Main Content */}

        <div className='main'>
            <div className='main-first'>
                <h2>Welcome</h2>
                <div className='first-contain'>
                    <label>Enter Your Nic Number :</label>
                    <input type='text' onChange={(e) => {
                       setNicNumber(e.target.value); 
                    }} placeholder='Your nic number..'/>
                   
                   

                    <button id='find' className='find-btn' onClick={handleFindClick}>Find</button>
                    {error && <div className='error-alert'>{error}</div>} {/* Show the error in an alert box */}

                </div>
            </div>

             <div className='main-second'>

                {/*Display Birthday */}

                    <label>Your Birth Day :</label>
                    <h2 id='birthday'>{birthday}</h2> 


                {/* Display Gender */}

                    <label className='gen'>Your Gender :</label>
                    <h2 id='gender'>{gender}</h2>


             </div>
             
        </div>

    </div>
  )
}

export default Home