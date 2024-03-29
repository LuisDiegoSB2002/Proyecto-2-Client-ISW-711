import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
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

const errorMessage = () => {

    sweet({
      title: "Su contraseña no es correcta",
      text: "",
      icon: "error",
      buttons: "Aceptar"
    });
  
  }




const ChangePassword = ({ userId }) => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();

    const handleChangePassword = async () => {
        const userData = {
            password: password,
            newPassword: newPassword
        };
        try {

            const response = await axios.patch(`http://localhost:3001/changePasword/${id}`, userData);
            console.log(response)
            success();
            navigate(`/UserProfile/${sessionStorage.getItem("userId")}`);
        } catch (error) { 
            errorMessage();
            console.error(error);
            
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
