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
      <di>
        <PromptsList />
      </di>

    </div>
  );
};

export default HomePage;