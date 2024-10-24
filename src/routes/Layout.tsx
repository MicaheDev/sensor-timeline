import { Outlet } from "react-router-dom";
import Filters from "../components/Filters";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Navbar />
        <Outlet />
      <Filters />
    </div>
  );
}
