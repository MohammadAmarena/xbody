import "bootstrap/dist/css/bootstrap.min.css";
import { Header, Footer } from "./components/Index";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import "sweetalert2/src/sweetalert2.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="vh-100">
        <Header />
        <ToastContainer position="bottom-center" limit={1} />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
