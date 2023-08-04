import React, { useState, useEffect } from 'react';
import { useParams,useNavigate, Link } from 'react-router-dom';


const EditPrompts = () => {

  const [name, setName] = useState('');
  const [tipo, setTipo] = useState('');
  const [etiqueta, setEtiquetas] = useState('');
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar los datos antiguos del prompts al montar el componente
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3001/obtenerPromptsXId/${id}`);
        const data = await response.json();
        setName(data.name);
        setEtiquetas(data.etiqueta);
      } catch (error) {
        console.error('Error al obtener los datos del prompts:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleEditPrompts = async () => {
    try {
      // Realizar la solicitud PUT al servidor
      const response = await fetch(`http://localhost:3001/editPrompts/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        },
        body: JSON.stringify({
          name,
          tipo,
          etiqueta
        })
      });

      // Verificar si la solicitud fue exitosa
      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Mensaje de éxito desde el servidor
        navigate("/HomePage");
      } else {
        const error = await response.json();
        console.error(error.error); // Mensaje de error desde el servidor
      }
    } catch (error) {
      console.error('Error al actualizar el prompts:', error);
    }
  };

  return (
    <div>
      <h2>Editar Prompts</h2>
      <form>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="Edit">Edit</option>
          <option value="Images">Images</option>
          <option value="Completitions">Completitions</option>
        </select>
        <input type="etiquetas" value={etiqueta} onChange={(e) => setEtiquetas(e.target.value)} />
        <button type="button" onClick={handleEditPrompts}>Guardar Cambios</button>
        <Link to ="/HomePage" className='btn-volver'> Volver</Link>
      </form> 
    </div>
  );
};

export default EditPrompts;
