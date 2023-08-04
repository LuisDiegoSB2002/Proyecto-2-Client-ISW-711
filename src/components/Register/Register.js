import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Register.css";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
     

    try {
        
      const response = await axios.post('http://localhost:3001/register', { name, email, password });
      
      
      navigate("/Login");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className='all'>
      <h2 className='title'>Registro</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className='btn-register'>Registrarse</button>
        <Link to ="/login" className='btn-volver'> Volver</Link>
      </form>
    </div>
  );
};

export default Register;

