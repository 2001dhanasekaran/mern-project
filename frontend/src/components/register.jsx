import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register=()=>{
    const [userName,setUserName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [message,setMessage]=useState({text:'',color:''});
    const navigate= useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const data={
            userName,
            email,
            password
        };

        try{
            const response= await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/register`,{
                method:'POST',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify(data)
            });

            if(response.ok){
                setMessage({text:"Registration successful!", color:'success'});
                setUserName('');
                setEmail('');
                setPassword('');
                navigate('/');
            }else{
                const errorData= await response.json();
                setMessage({text:`Error:${errorData.message}`,color:'danger'})
            }
        }catch(error){
            setMessage({text:'There was a error with registration, try again!',color:'danger'});
            console.log(error);
        }
    };
    return(
        <div className="register-container">
            <div className="login-box">
                <h2>Registration Page</h2>
                {message.text && <div className={`alert alert-${message.color}`}>{message.text}</div>}

                <form onSubmit={handleSubmit} className='text-start'>
                    <div className='mb-3'>
                        <label className='form-label'>User name</label>
                        <input type='text' className='form-control' id='userName' value={userName} onChange={(e)=>setUserName(e.target.value)} />
                        
                        <label className='form-label'>Email</label>
                        <input type='email' className='form-control' id='email' value={email} onChange={(e)=>setEmail(e.target.value)} />

                        <label className='form-label'>Password</label>
                        <input type='password' className='form-control' id='password' value={password} onChange={(e)=>setPassword(e.target.value)} />

                        <button type='submit' className='btn btn-primary w-100 mt-4'>Register</button>
                    </div>
                </form>
                <Link to={'/'} className='text-dark' title='Click to Login'>Already Registered</Link>
            </div>
        </div>
    );
}
export default Register;