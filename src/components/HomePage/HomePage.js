import React from 'react'; // Asegúrate de importar React si aún no lo has hecho
import Navbar from "../NavBar/NavBar";
import PromptsList from "../PromptsCRUD/ListPrompts/PromptsList";
import Footer from "../Footer/Footer";
//import "./HomePage.css";

const HomePage = () => {
  return (
    <div>
      <div className="navbar">
        <Navbar />
      </div>
      <div> {/* Cambio aquí: <div> en lugar de <di> */}
        <PromptsList />
      </div>
      {/* Agrega el componente Footer si es necesario */}
    </div>
  );
};

export default HomePage;
