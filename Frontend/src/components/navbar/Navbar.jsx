import { useContext } from "react";
import { Link } from "react-router";
// Context
import AppContext from "../../context/AppContext.jsx";
// Components
import NavbarLoginButton from "./NavbarLoginButton.jsx";
import GraphSelector from "./GraphSelector.jsx";
import ThemeSelector from "./ThemeSelector.jsx";
import UserInfo from "./UserInfo.jsx";

const Navbar = () => {

  const { isAuth } = useContext(AppContext);

  return (
    <div className="h-20 md:px-6 px-3 flex justify-between items-center">
      <div className="flex items-end">

        <Link to="/welcome" className="font-bold md:text-4xl text-3xl bg-radial from-blue-400 from-10% to-blue-600 bg-clip-text text-transparent dark:brightness-125">ChartUp</Link>

        <div className="mx-4 md:text-4xl text-3xl font-light sm:block hidden dark:text-white">/</div>

        <GraphSelector />

      </div>
      <div className="flex items-center md:mt-0 gap-4">
        
        <ThemeSelector />
        <UserInfo />
        {!isAuth && <NavbarLoginButton />}
        
      </div>
    </div>
  );
};

export default Navbar;