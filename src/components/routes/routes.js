import { BrowserRouter, Routes, Route  } from "react-router-dom";
import Login from "../Login/Login.js";
import Register from "../Register/Register";
import HomePage from "../HomePage/HomePage.js";
import Navbar from "../NavBar/NavBar.js";
import UserList from "../UserCRUD/ListUsers/UserList.js";
import CreateUser from "../UserCRUD/CreateUser/CreateUser.js";
import EditUser from "../UserCRUD/EditUser/EditUser.js";
import DeleteUser from "../UserCRUD/DeleteUser/DeleteUser.js";

import CreatePrompts from "../PromptsCRUD/CreatePrompts/CreatePrompts.js";
import EditPrompts from "../PromptsCRUD/EditPrompts/EditPrompts.js";
import DeletePrompts from "../PromptsCRUD/DeletePrompts/DeletePrompts.js";
import SearchPage from "../searchPage/searchPage.js";

import UserProfile from "../UserProfile/UserProfile.js";
import EditProfile from "../UserProfile/EditProfile.js";
import ChangePassword from "../ChangePasword/ChangePasword.js";

import ValidarSendEmail from "../validacion/validateEmail.js";
import ValidarSMS from "../validacion/valiSMS.js";
import Logout from "../Logout/Logout.js";
function AllRoutes() { 

    return (
        <BrowserRouter> 
            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/homePage" element={<HomePage />} />
                <Route path="/navBar" element={<Navbar />} />
                <Route path="/UserList" element={<UserList />} />
                <Route path="/CreateUser" element={<CreateUser />} />
                <Route path="/EditUser/:id" element={<EditUser/>} />
                <Route path="/DeleteUser/:id" element={<DeleteUser />} />
                <Route path="/createPrompts" element={<CreatePrompts/>} />
                <Route path="/DeletePrompts/:id" element={<DeletePrompts/>} />
                <Route path="/EditPrompts/:id" element={<EditPrompts/>} />
                <Route path="/SearchPage" element={<SearchPage/>} />

                <Route path="/UserProfile/:id" element={<UserProfile/>} />
                <Route path="/editProfile/:id" element={<EditProfile/>} />
                <Route path="/ChangePassword/:id" element={<ChangePassword/>} />

                <Route path="/validarEmail/:token" element={<ValidarSendEmail/>} />
                <Route path="/validarSMS" element={<ValidarSMS/>} /> 
                <Route path="/Logout" element={<Logout/>} />

            </Routes>

        </BrowserRouter>

    );
}
export default AllRoutes;