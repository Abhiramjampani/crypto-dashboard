import NewsFeed from "./components/NewsFeed";
import CurrencyConverter from "./components/CurrencyConverter";
import Login from "./components/login";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const jwt = sessionStorage.getItem("jwt");
  if (!jwt && location.pathname === "/home") {
    toast.error("Please login first");
    // console.log(location.pathname);
  }
  return (
    <div className="app">
      {/* <NewsFeed />
      <CurrencyConverter />
      <Login /> */}
      <ToastContainer />
      <Routes>
        {jwt ? (
          <Route path="/home" element={ <><CurrencyConverter /><NewsFeed />
          </>} />
          
        ) : (
          <>
            <Route path="/home" element={<Navigate to="/" />} />
          </>
        )}
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
