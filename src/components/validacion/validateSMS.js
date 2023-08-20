import React, { useState } from 'react';
import axios from 'axios';

const ValidarSMS = () => {
  const [phoneNumber, setPhoneNumber] = useState('+50670982247');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');

  
  const verifyCode = async () => {
    try {
      const response = await axios.post('/verifyCode', { phoneNumber, code: verificationCode });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Error en el servidor.');
    }
  };

  return (
    <div className="App">
      <h1 className='title'>Verificación de Número de Teléfono</h1>
      <div className=''>
        <input className='numeros'
          type="text"
          placeholder="Código de verificación"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <button onClick={verifyCode}>Verificar</button>
      </div>
      <p>{message}</p>
    </div >
  );
}

export default ValidarSMS;