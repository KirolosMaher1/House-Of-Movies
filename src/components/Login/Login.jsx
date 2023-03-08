import React, { useState }  from 'react';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate, Link } from 'react-router-dom';

export default function Login({decodeToken}) {
  let navigate = useNavigate();
  const [failedMessage, setFailedMessage] = useState('')
  const [errList , setErrList] = useState([]);

  const [user , setUser] = useState({
    email: '',
    password: '',
   })

   function getUser(e){
    setErrList([])
    let inputValue = e.target.value;
    let newUser = {...user};
    newUser[`${e.target.id}`] = inputValue;
    setUser( newUser );
   }
   function getCurrentError (key){
    for (const err of errList){
      if(err.context.key === key){
        return err.message;
      }
    }
        return '';
   }

   async function submitForm(e){
    e.preventDefault();

    let validation = Joi.object ({
     email: Joi.string().email({minDomainSegments: 2, tlds: { allow: ['com', 'net']}}).required(),
     password: Joi.string().pattern(/^[a-z0-9]{4,8}$/i).required(),

    });
    let JoiResponse = validation.validate(user , {abortEarly: false});
    
    if(JoiResponse.error){
      setErrList (JoiResponse.error.details);
    }
    else{

    let {data} = await axios.post('https://route-movies-api.vercel.app/signin', user)
    console.log(data);

    if(data.status == 401){
      setFailedMessage(data.message)
    }
    else{
      localStorage.setItem("tkn", data.token);
      decodeToken()
      navigate('/home');
    }

    }
   }


  return <>
  <div className='w-75 m-auto'>
  <form onSubmit={submitForm}>
    {failedMessage.length == 0? '' : <div className="alert alert-danger">
      {failedMessage}
    </div>}

    
    <label htmlFor="email">Email :</label>
    <input onChange={getUser} type="email" className='form-control my-3' placeholder='Email' id='email' />
    {getCurrentError('email').length == 0? '' :<div className='alert alert-danger'>
      {getCurrentError('email')}
      </div>}
    
    <label htmlFor="password">Password :</label>
    <input onChange={getUser} type="password" className='form-control my-3' placeholder='Password' id='password' />
    {getCurrentError('password').length == 0? '' :<div className='alert alert-danger'>
      {getCurrentError('password')}
      </div>}
    
    <button onClick={submitForm} className='btn btn-outline-info'>Login</button>
    <div className='d-flex justify-content-center align-items-center my-5'>
      <p>You Don't Have An Account ? <Link to="/register">SignUp</Link></p>
    </div>
  </form>
  </div>
  
  
  </>
}