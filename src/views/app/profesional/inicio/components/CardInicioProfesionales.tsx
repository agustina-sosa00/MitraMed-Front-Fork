import { Link } from "react-router-dom";
import "./CardInicioProfesionales.css";
// import { FaArrowRight } from "react-icons/fa";

export default function CardInicioProfesionales({ text, description, link }) {
  return (
    <div className="card">
      <Link className="card1" to={link}>
        <p className="">{text}</p>
        <p className="small">{description}</p>
        <div className="go-corner">
          <div className="go-arrow">→</div>
        </div>
      </Link>
    </div>
    // <Link to={link}>
    //   <div className=" bg-white flex justify-between items-center shadow-gray-200 shadow-lg rounded p-4  hover:scale-105 transition-all duration-300">
    //     <h1 className="text-primaryBlue font-bold text-lg ">{text}</h1>
    //     <FaArrowRight className="text-primaryBlue" />
    //   </div>
    // </Link>
  );
}
