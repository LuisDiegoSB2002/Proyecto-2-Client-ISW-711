import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import "./ChangePassword.css";
import sweet from 'sweetalert';

const success = () => {

  sweet({
    title: "Su contraseña de cambió con éxito.",
    text: "",
    icon: "success",
    buttons: "Aceptar"
  });

}




const ChangePassword = ({ userId }) => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const handleChangePassword = async () => {
        const userData = {
            password: password,
            newPassword: newPassword
        };
        try {

            const response = await axios.patch(`http://localhost:3001/changePasword/${id}`, userData);
            setMessage(response.data.message);
            success();
            navigate(`/UserProfile/${sessionStorage.getItem("userId")}`);
        } catch (error) {
            console.error(error);
            setMessage('Error al cambiar la contraseña');
        }
    };

    return (
        <div className='all'>
            <h2 className='title'>Cambiar Contraseña</h2>
            <input className='imput-password'
                type="password"
                placeholder="Contraseña anterior"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input className='imput-newPassword'
                type="password"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className='btn-change' onClick={handleChangePassword}>Cambiar Contraseña</button>

        </div>
    );
};

export default ChangePassword;
