import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const Logout = () => {
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const handleLogout = async () => {

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("id");
         navigate("/Login"); 
    };

    return (
        <div className='all'>
            <h1>¿Está seguro que desea cerrar sesión?</h1>

            <button onClick={handleLogout}>Cerrar</button>
            <Link to="/HomePage" className='btn-volver'> No</Link>
        </div>
    );
};

export default Logout;
