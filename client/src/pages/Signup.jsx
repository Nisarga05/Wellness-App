import React, { useState } from 'react';
import axios from 'axios'
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Signup:", data);
    // You can add your backend API call here
    const{name, email, password} = data
    try{
      const{data}=await axios.post('/signup',{
        name, email, password
    })
    if(data.error){
      toast.error(data.error)
    }else{
      setData({})
      toast.success('Registered successfully')
      navigate('/dashboard')
    }
    }catch(error){
      console.log(error)
    }
  };
  return (
   <div className="signup-wrapper">
  <div className="signup-card">
    <h2>Signup</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={data.name}
        onChange={handleChange}
        required
      />
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
      <button type="submit">Signup</button>
    </form>
  </div>
</div>

  );
};


