import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../NavBar/NavBar';
import "./PromptsList.css";

import logoCrate from "../../../img/create-user-icon.png";
import logoEdit from "../../../img/editar.png";
import logoDelete from "../../../img/borrar.png";

const PromptsList = () => {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    // Hacer la solicitud HTTP para obtener los usuarios cuando el componente se monta
    axios.get('http://localhost:3001/obtenerPrompts')
      .then((response) => {
        setPrompts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      
      <h2 className='titulo'>Lista de Prompts</h2>

      <ul className='contenedor'>
        <div className='user'>
          {prompts.map((prompt) => (
            
            <li className='id-user' key={prompt._id}>
              <p className='name'>Nombre: {prompt.name}</p>
              <p className='tipo'>Tipo: {prompt.tipo}</p>
              <p className='IdUsuario'>ID Usuario: {prompt.idUser}</p>
              <p className='etiquetas'>Etiquetas: {prompt.etiquetas}</p>
              <Link to ="/createPrompts" className='btn-create'> <img src={logoCrate} /></Link>
              <Link to={`/EditPrompts/${prompt._id}`} className='btn-edit'> <img src={logoEdit} /></Link>
              <Link to ={`/DeletePrompts/${prompt._id}`} className='btn-delete'> <img src={logoDelete} /></Link>
            </li> 
            
          ))}
        </div>
      </ul>
      
    </div>
  );
};

export default PromptsList;
