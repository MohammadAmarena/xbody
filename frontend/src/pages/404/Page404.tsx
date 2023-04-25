import { Link } from "react-router-dom";
import "./page404.scss";

const Page404 = () => {
  return (
    <div className="page404 w-100">
      <h1>404</h1>
      <h2>Sieh aus, als wärst du verloren</h2>
      <h5>Die gesuchte Seite ist nicht verfügbar</h5>
      <Link to="/home">Zurück zur Home Seite</Link>
    </div>
  );
};

export default Page404;
