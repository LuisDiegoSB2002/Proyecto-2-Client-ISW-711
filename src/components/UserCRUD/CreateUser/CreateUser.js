import React, { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';



const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    

    try {
        
      const response = await axios.post('http://localhost:3001/createNewUser', { name, email, password, role }, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      });
      console.log(response.data);
      navigate("/UserList");
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
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
        <button to ="/UserList" type="submit" className='btn-register'>Crear</button>
        <Link to ="/UserList" className='btn-volver'> Volver</Link>
      </form>
    </div>
  );
};

export default CreateUser;