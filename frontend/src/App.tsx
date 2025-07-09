import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
    <NavBar />
      <div className="max-w-7xl mx-auto ">
        <Outlet />
      </div>
    </>
  );
}

export default App;
