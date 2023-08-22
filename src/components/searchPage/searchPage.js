import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../NavBar/NavBar";

import "./searchPage.css";

const SearchPage = () => {
  const [tipo, setTipo] = useState('');
  const [name, setName] = useState('');
  const [etiquetas, setEtiquetas] = useState('');
  const [results, setResults] = useState([]); // Estado para almacenar los resultados
  

  const getAll = async (idUser, e) => {
    e.preventDefault(); // Prevenir el envío del formulario por defecto

    const body = `
      query {
        GetAll(user_id: "${idUser}") {
          id
          name
          tipo
          idUser
          etiquetas
        }
      }
    `;

    try {
      const response = await axios.post('http://localhost:3002/graphql', { query: body }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      });

      setResults(response.data.data.GetAll); // Guardar los resultados en el estado
    } catch (error) {
      console.error(error);
    }
  }
  const getByName = async (idUser, e) => {
    e.preventDefault(); // Prevenir el envío del formulario por defecto

    const body = `
      query {
        Name(user_id: "${idUser}", name: "${name}") {
          id
          name
          tipo
          idUser
          etiquetas
        }
      }
    `;

    try {
      const response = await axios.post('http://localhost:3002/graphql', { query: body }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
        
      });
      

      setResults(response.data.data.Name); // Guardar los resultados en el estado
    } catch (error) {
      setResults([]);
      console.error(error);
    }
  }
  const getByEtiquetas = async (idUser, e) => {
    e.preventDefault(); // Prevenir el envío del formulario por defecto

    const body = `
      query {
        Name(user_id: "${idUser}", etiquetas: "${etiquetas}") {
          id
          name
          tipo
          idUser
          etiquetas
        }
      }
    `;

    try {
      const response = await axios.post('http://localhost:3002/graphql', { query: body }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
        
      });
      

      setResults(response.data.data.Name); // Guardar los resultados en el estado
    } catch (error) {
      setResults([]);
      console.error(error);
    }
  }

  const searchTipo = (e) => {
    if(tipo === "Nombre"){
      console.log("estoiy");
      getByName(sessionStorage.getItem("userId"),e);

    }
    else if(tipo === "Etiquetas"){
      getByEtiquetas(sessionStorage.getItem("userId"), e)
    }
    else if(tipo === "GetAll"){
      getAll(sessionStorage.getItem("userId"), e)
    }
  }

  return (
    <div className='all'>
      
      <h2 className='titulo'>Buscar Prompts</h2>
      <ul className='contenedor'>
        <form onSubmit={(e) => searchTipo(e)}>
          <h4>Tipo de Busqueda</h4>
          <select className='combox' value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option className='opcion' value="Nombre">Nombre</option>
            <option className='opcion' value="Etiquetas">Etiquetas</option>
            <option className='opcion' value="GetAll">Todos</option>
          </select>
          <br></br>
          <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)}/>
          <br></br>
          <input type="etiquetas" placeholder="Etiquetas" value={etiquetas} onChange={(e) => setEtiqueta(e.target.value)} required />
          <button type="submit" className='btn-register'>Buscar</button>
          
        </form>
        <h1>Resultados</h1>
        {results.length > 0 ? (
          <div className='resultado'>
            {results.map((result) => (
              <div key={result.id}>
                <p>Nombre: {result.name}</p>
                <p>Tipo: {result.tipo}</p>
                <p>ID Usuario: {result.idUser}</p>
                <p>Etiquetas: {result.etiquetas}</p>
              </div>
            ))}
            
          </div>
          
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </ul>
      <Link to="/HomePage" className='btn-volver'> Volver</Link>
    </div>
  );
};

export default SearchPage;
