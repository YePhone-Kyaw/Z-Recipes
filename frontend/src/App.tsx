import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
    <NavBar />
      <div className="mx-auto">
        <Outlet />
      </div>
    </>
  );
}

export default App;
