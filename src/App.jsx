import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Router from "routes/Router.jsx";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
}

export default App;
