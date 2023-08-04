import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const DeletePrompts = () => { 
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeletePrompts = async () => {
    try {
      // Realizar la solicitud DELETE al servidor
      const response = await fetch(`http://localhost:3001/deletePrompts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      });

      // Verificar si la solicitud fue exitosa
      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Mensaje de éxito desde el servidor
        navigate("/HomePage"); // Redirigir a la lista de usuarios después de eliminar
      } else {
        const error = await response.json();
        console.error(error.error); // Mensaje de error desde el servidor
      }
    } catch (error) {
      console.error('Error al eliminar el Prompts:', error);
    }
  };

  return (
    <div className='all'>
      <h1>¿Está seguro de eliminar este Prompts?</h1>
      
      <button onClick={handleDeletePrompts}>Eliminar Prompts</button>
      <Link to="/HomePage" className='btn-volver'> No</Link>
    </div>
  );
};

export default DeletePrompts;
