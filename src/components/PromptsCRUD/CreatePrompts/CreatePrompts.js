import  { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';



const CreatePrompts = () => {
  const [name, setName] = useState('');
  const [tipo, setTipo] = useState('');
  const [idUser, setidUser] = useState(sessionStorage.getItem("userId"));
  const [etiquetas, setEtiqueta] = useState('');
  const navigate = useNavigate();  

  const handleRegister = async (e) => {
    e.preventDefault();
    
    console.log(idUser);

    try {
          
      const response = await axios.post('http://localhost:3001/createPrompts', { name, tipo, idUser, etiquetas }, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      });
      console.log(response.data);
      navigate("/HomePage");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className='all-dos'>
      <h2 className='title'>Registro</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="Edit">Edit</option>
          <option value="Images">Images</option>
          <option value="Completitions">Completitions</option>
        </select>
        
        <input type="etiquetas" placeholder="Etiquetas" value={etiquetas} onChange={(e) => setEtiqueta(e.target.value)} required />
        
        <button to ="/HomePage" type="submit" className='btn-register'>Crear</button>
        <Link to ="/HomePage" className='btn-volver'> Volver</Link>
      </form>
    </div>
  );
};

export default CreatePrompts;