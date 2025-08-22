
import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   
    // backend API call
    const {email, password} = data

    try{
      const{data}= await axios.post('/login',{
        email,
        password
      })
      if(data.error){
        toast.error(data.error)
      }else{
        setData({ email: "", password: "" });
        navigate('/dashboard')
      }
    }catch(error){
      console.log(error)
    }
  };

  return (
<div className="login-wrapper">
  <div className="login-card">
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  </div>
</div>

  );
}
    