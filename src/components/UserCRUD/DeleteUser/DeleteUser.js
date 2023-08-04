import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const DeleteUser = () => { 
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteUser = async () => {
    try {
      // Realizar la solicitud DELETE al servidor
      const response = await fetch(`http://localhost:3001/deleteUser/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      });

      // Verificar si la solicitud fue exitosa
      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Mensaje de éxito desde el servidor
        navigate("/UserList"); // Redirigir a la lista de usuarios después de eliminar
      } else {
        const error = await response.json();
        console.error(error.error); // Mensaje de error desde el servidor
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <div className='all'>
      <h1>¿Está seguro de eliminar este Usuario?</h1>
      
      <button onClick={handleDeleteUser}>Eliminar Usuario</button>
      <Link to="/UserList" className='btn-volver'> No</Link>
    </div>
  );
};

export default DeleteUser;
