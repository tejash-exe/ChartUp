import { Link } from "react-router";

const DirectButton = ({ message }) => {
  return (
    <Link to="/" className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 text-white font-medium shadow-md hover:scale-[1.02] duration-200 cursor-pointer">{message}</Link>
  );
};

export default DirectButton;