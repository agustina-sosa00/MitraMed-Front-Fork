import { Link } from "react-router-dom";
import "./CardInicioProfesionales.css";

export default function CardInicioProfesionales({ text, link, description }) {
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
  );
}
