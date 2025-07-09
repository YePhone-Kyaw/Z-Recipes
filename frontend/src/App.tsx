import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
    <NavBar />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
