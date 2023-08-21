import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const EditProfile = () => {

    const [newName, setName] = useState('');
    const [newEmail, setEmail] = useState('');
    const [newPhone, setPhone] = useState('')

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
                setPhone(data.phone);
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };

        fetchUser();
    }, [id]);

    const handleEditProfile = async () => {
        const userData = {
            name: newName,
            email: newEmail,
            phone: newPhone
        };

        try {
            // Realizar la solicitud PUT al servidor 
            const response = await axios.patch(`http://localhost:3001/editProfile/${id}`, userData)
            navigate(`/UserProfile/${sessionStorage.getItem("userId")}`);

        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    };

    return (
        <div className='all'>
            <h2>Editar Usuario</h2>
            <form>
                <input type="text" value={newName} onChange={(e) => setName(e.target.value)} />
                <input type="email" value={newEmail} onChange={(e) => setEmail(e.target.value)} />
                <input type="phone" value={newPhone} onChange={(e) => setPhone(e.target.value)} />
                <button type="button" onClick={handleEditProfile}>Guardar Cambios</button>
                <Link to={`/UserProfile/${sessionStorage.getItem("userId")}`} className='btn-volver'> Volver</Link>
            </form>
        </div>
    );
};

export default EditProfile;