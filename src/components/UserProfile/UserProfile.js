import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
import ReactSwitch from "react-switch"; 
import './UserProfile.css';

import resetContra from "../../img/resetContra.png";
import logoEdit from "../../img/editar.png";
import logoDelete from "../../img/borrar.png";

import sweet from 'sweetalert';

const DosPaActive = () => {

  sweet({
    title: "Activada",
    text: "Validación de 2 pasos fue activada",
    icon: "success",
    buttons: "Aceptar"
  });

}
const DosPaDesactive = () => {

  sweet({
    title: "Desactivada",
    text: "Validación de 2 pasos fue desactivada",
    icon: "success",
    buttons: "Aceptar"
  });

}
const monstrarError = () => {

  sweet({
    title: "Hubo un error al realizar la acción",
    text: "Por favor intentelo de nuevo",
    icon: "warning",
    buttons: "Aceptar"
  });

}
const UserProfile = () => {
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState(null);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false); // Nuevo estado
  const { id } = useParams();
  const { token } = useParams();
  const [isEstado, setEstado] = useState(sessionStorage.getItem("valiSwitch"));
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/obtenerXId/${id}`);
        sessionStorage.setItem("valiSwitch", response.data.validacion);
        
        
        setUser(response.data);
        
        validarEstado();
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);

  const handleTwoFactorActive= async () => {
     
    try {
      
      await axios.get(`http://localhost:3001/activaValidacion`, { validacion: !twoFactorEnabled });
      
      
      DosPaActive();
      
    } catch (error) {
      console.error(error);
    }
  };
  const handleTwoFactorDesactive= async () => {
    try {
      
      await axios.get(`http://localhost:3001/desactivaValidacion`, { validacion: !twoFactorEnabled });
      
      
      DosPaDesactive();
      
    } catch (error) {
      console.error(error);
    }
  };
  const handleToggle = () => {
    
    setIsActive(!isActive);
    
    if (!isActive) {
      handleTwoFactorActive();
    } else {
      handleTwoFactorDesactive();
    }
  };
  const validarEstado = () => { 
    
    if ( sessionStorage.getItem("valiSwitch")== "Activa") {
      
      setIsActive(true);
      
    } else if (sessionStorage.getItem("valiSwitch") == "Inactiva") {
      
      setIsActive(false);
      
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Perfil de Usuario</h1>

      {user ? (
        <div className='all'>
          <p className='datos'>Nombre: {user.name}</p>
          <p className='datos'>Correo electrónico: {user.email}</p>
          <p className='datos'>Número de teléfono: {user.phone}</p>
          <p className='datos'>Rol: {user.role}</p>
          <p className='datos'>Estado: {user.estado}</p>
          <p className='datos'>Validación: {user.validacion}</p>
          <div className="switch-container">
            <label htmlFor="twoFactorSwitch">Validación de 2 pasos:</label>
            <div className="App">
              
              <div className="switch">
                
                <ReactSwitch checked={isActive} onChange={handleToggle} />
              </div>
            </div>
          </div>
          <div className="btn">
            <Link to="/CreateUser" className='btn-create'> <img src={resetContra} title='Cambiar Contraseña' /></Link>
            <Link to={`/EditProfile/${id}`} className='btn-edit'> <img src={logoEdit} title='Editar Información de Usuario' /></Link>
            <Link to={`/DeleteUser/${id}`} className='btn-delete'> <img src={logoDelete} title='Eliminar Usuario' /></Link>
          </div>


        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default UserProfile;
