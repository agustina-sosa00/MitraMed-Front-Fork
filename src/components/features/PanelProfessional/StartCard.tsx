import { Link } from "react-router-dom";
import "./StartCard.css";

export const StartCard = ({ text, link, description }) => {
  return (
    <div className="card">
      <Link className="card1" to={link}>
        <p>{text}</p>
        <p className="small">{description}</p>
        <div className="go-corner">
          <div className="go-arrow">→</div>
        </div>
      </Link>
    </div>
  );
};
