import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../NavBar/NavBar';
import "./UserList.css";

import logoCrate from "../../../img/create-user-icon.png";
import logoEdit from "../../../img/editar.png";
import logoDelete from "../../../img/borrar.png";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Hacer la solicitud HTTP para obtener los usuarios cuando el componente se monta
    axios.get('http://localhost:3001/obtener')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Navbar/>
      <h2 className='titulo'>Lista de Usuarios</h2>

      <ul className='contenedor'>
        <div className='user'>
          {users.map((user) => (
            <li className='id-user' key={user._id}>
              <p className='name'>Nombre: {user.name}</p>
              <p className='email'>Email: {user.email}</p>
              <Link to ="/CreateUser" className='btn-create'> <img src={logoCrate} /></Link>
              <Link to={`/EditUser/${user._id}`} className='btn-edit'> <img src={logoEdit} /></Link>
              <Link to ={`/DeleteUser/${user._id}`} className='btn-delete'> <img src={logoDelete} /></Link>
            </li>
            
          ))}
        </div>
      </ul>
      <Link to ="/homePage" className='btn-volver'> Volver</Link>
    </div>
  );
};

export default UserList;
