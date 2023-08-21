import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import Register from '../Register/Register';
import { Link, useNavigate } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import sweet from 'sweetalert';

const monstrarAlertaSucess = () => {

  sweet({
    title: "El código fue enviado con éxito",
    text: "",
    icon: "success",
    buttons: "Aceptar"
  });

}
const monstrarError = () => {

  sweet({
    title: "Sus credenciales son inválidas",
    text: "",
    icon: "warning",
    buttons: "Aceptar"
  });

}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const phoneNumber = sessionStorage.getItem("phone");

  const navigate = useNavigate();


  const sendCode = async () => {
    
    try {
      const response = await axios.post('http://localhost:3001/sendVerificationCode', { phoneNumber });
      monstrarAlertaSucess();
    } catch (error) {
      console.error(error);

    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();



    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      sessionStorage.setItem("validacion", response.data.validacion);
      sessionStorage.setItem("phone", response.data.phone);
      sessionStorage.setItem("userId", response.data.userId);
      

      

      sessionStorage.setItem("name", response.data.name);
      if (sessionStorage.getItem("validacion") == "Activa") {
        

        sendCode(e);

        sessionStorage.setItem("token", response.data.token);

        sessionStorage.setItem("name", response.data.name);
        navigate("/validarSMS");
      } else if (sessionStorage.getItem("validacion") != "Desactiva") {
        sessionStorage.setItem("token", response.data.token);

        sessionStorage.setItem("name", response.data.name);
        navigate("/homePage");
      }




    } catch (error) {
      monstrarError();
      console.error(error.response.data);
    }
  };


  return (
    <div className='all'>
      <h2 className='title'>Login</h2>
      <form className='form' onSubmit={handleLogin}>
        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className='btn-start'>Iniciar sesión</button>
        <Link to="/register" className='btn-register'> Sing Up</Link>

      </form>
    </div>
  );
};

export default Login;


