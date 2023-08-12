import React, { useState, useEffect } from 'react';
import { useParams,useNavigate, Link } from 'react-router-dom';


const EditUser = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [estado, setEstado] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar los datos antiguos del usuario al montar el componente
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3001/obtenerXId/${id}`);
        const data = await response.json();
        setName(data.name);
        setEmail(data.email);
        
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleEditUser = async () => {
    try {
      // Realizar la solicitud PUT al servidor 
      const response = await fetch(`http://localhost:3001/editUser/${id}`, {
        method: 'patch',
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        },
        body: JSON.stringify({
          name,
          email,
          role,
          estado
        })
      });

      // Verificar si la solicitud fue exitosa
      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Mensaje de éxito desde el servidor
        navigate("/UserList");
      } else {
        const error = await response.json();
        console.error(error.error); // Mensaje de error desde el servidor
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  return (
    <div className='all'>
      <h2>Editar Usuario</h2>
      <form>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <select type="role1" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <select type="role1" value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
        <button type="button" onClick={handleEditUser}>Guardar Cambios</button>
        <Link to ="/UserList" className='btn-volver'> Volver</Link>
      </form> 
    </div>
  );
};

export default EditUser;
