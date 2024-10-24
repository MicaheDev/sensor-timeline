
import { useLocation, useNavigate } from "react-router-dom";
import useEventsStore from "../context/store";

type MenuItems = {
  label: string;
  path: string;
};

export default function Navbar() {
  const { setInitialEvents, setActiveFilters } = useEventsStore(); // Access state and actions

  const navigate = useNavigate()
  const location = useLocation()


  const menu: MenuItems[] = [
    {
      label: "Linea de Tiempo",
      path: "/",
    },
    {
      label: "Mapa",
      path: "/map",
    },
  ];
  function handleNavigation(path: string) {
    setInitialEvents();
    setActiveFilters(new Set());
    navigate(path)
  }
  return (
    <>
      <nav className="h-[80px] px-4 flex justify-end items-center p-2 fixed inset-x-0 top-0 z-[1000] pointer-events-none">
        <div className="flex gap-2 items-center p-1 bg-neutral-100 rounded-md pointer-events-auto">
          {menu.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`py-2 px-3 bg-transparent rounded-md font-bold text-neutral-700 ${location.pathname === item.path ? 'bg-white': 'bg-transparent'} transition-colors  hover:bg-white/60`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="h-[80px]"></div>
    </>
  );
}
