import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logoUser from "../../img/users.png";
import logoCreateUser from "../../img/create-user-icon.png";
import logoCreatePrompts from "../../img/create-promp-icon.png";
import Logout from "../../img/logout-icon.png";

const Navbar = () => {
  return (
    <nav className="navbar">

      <h2 className='name-user'> Bienvenido al sistema {sessionStorage.getItem("name")}</h2>

      <div className='btn-nav'>
        <Link to="/UserList">
          <img src={logoUser} />
        </Link>

        <Link to="/CreateUser">
          <img src={logoCreateUser} />
        </Link>

        <Link to="/createPrompts">
          <img src={logoCreatePrompts} />
        </Link>
        <Link to="/Logout">
          <img src={Logout} />
        </Link>
      </div>

      


    </nav>
  );
};

export default Navbar;
