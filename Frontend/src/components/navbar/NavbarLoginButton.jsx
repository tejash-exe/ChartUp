import useLogin from "../../hooks/useLogin.jsx";

const NavbarLoginButton = () => {

  const { loginWithGoogle, loading } = useLogin();

  return (
    <button onClick={() => loginWithGoogle()} className="bg-blue-500 hover:bg-blue-600 duration-200 cursor-pointer text-white font-semibold md:px-4 px-3 py-2 md:text-base text-xs rounded shadow-sm">
      {loading ? "Logging" : "Login"}
    </button>
  );
};

export default NavbarLoginButton;