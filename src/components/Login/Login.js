import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import Register from '../Register/Register';
import { Link,useNavigate } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+50670982247');
  const navigate = useNavigate();
  const sendVerificationCode = async () => {
    try {
      const response = await axios.post('/sendVerificationCode', { phoneNumber });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Error en el servidor.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    

    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      sessionStorage.setItem("token",response.data.token);
      
      sessionStorage.setItem("name",response.data.name);
      sessionStorage.setItem("phone",response.data.phoneNumber);
      
      navigate("/homePage");
    } catch (error) {
      console.error(error.response.data);
    }
  };


  return (
    <div className='all'>
      <h2 className='title'>Login</h2>
      <form className='form' onSubmit={handleLogin}>
        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button  type="submit" className='btn-start'>Iniciar sesión</button>
        <Link to ="/register" className='btn-register'> Sing Up</Link>
         
      </form>    
    </div>
  );
};

export default Login;


