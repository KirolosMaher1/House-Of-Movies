import axios from 'axios';
import Joi from 'joi';
import React, { useState }  from 'react';
import {useNavigate} from 'react-router-dom';




export default function Register() {
  let navigate = useNavigate();
  const [failedMessage, setFailedMessage] = useState('')
  const [errList , setErrList] = useState([]);

  const [user , setUser] = useState({
    first_name: '',
    last_name: '',
    age:0,
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
     first_name: Joi.string().alphanum().min(3).max(10).required(),
     last_name: Joi.string().min(3).max(10).required(),
     age: Joi.number().min(18).max(60).required(),
     email: Joi.string().email({minDomainSegments: 2, tlds: { allow: ['com', 'net']}}).required(),
     password: Joi.string().pattern(/^[a-z0-9]{4,8}$/i).required(),

    });
    let JoiResponse = validation.validate(user , {abortEarly: false});
    
    if(JoiResponse.error){
      setErrList (JoiResponse.error.details);
    }
    else{

    let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signup', user)
    console.log(data);

    if(data.errors){
      setFailedMessage(data.message)
    }
    else{
      navigate('/login');
    }

    }
   }


  return <>
  
  <div className='w-75 m-auto'>
  <form onSubmit={submitForm}>
    {failedMessage.length == 0? '' : <div className="alert alert-danger">
      {failedMessage}
    </div>}



    <label htmlFor="first_name">First Name :</label>
    <input onChange={getUser} type="text" className='form-control my-3' placeholder='First Name' id='first_name' />
     {getCurrentError('first_name').length == 0? '' :<div className='alert alert-danger'>
      {getCurrentError('first_name')}
      </div>}

    <label htmlFor="last_name">Last Name :</label>
    <input onChange={getUser} type="text" className='form-control my-3' placeholder='Last Name' id='last_name' />
    {getCurrentError('last_name').length == 0? '' :<div className='alert alert-danger'>
      {getCurrentError('last_name')}
      </div>}

    <label htmlFor="age">Age :</label>
    <input onChange={getUser} type="number" className='form-control my-3' placeholder='Age' id='age' />
    {getCurrentError('age').length == 0? '' :<div className='alert alert-danger'>
      {getCurrentError('age')}
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

    <button onClick={submitForm} className='btn btn-outline-info'>Register</button>
  </form>
  </div>
  
  
  </>
}
