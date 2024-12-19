import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { User, LogOut, UserCircle } from "lucide-react";
import Breadcrumb from "./Breadcrumb";

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  function logoutHandler() {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedUserId");
    navigate("/");
  }

  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        <h1 className="text-2xl font-bold text-gray-800">Simulators</h1>
        <Breadcrumb />
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-xl hover:scale-90 hover:bg-blue-600 transition"
            aria-label="Menu de usuario"
          >
            <User className="w-6 h-6 text-white" />
          </button>

          {isOpen && (
            <>
              <div 
                className="fixed inset-0 h-full w-full z-10"
                onClick={() => setIsOpen(false)}
              />

              {/* Menú desplegable */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20 border border-gray-200">
                <button
                  onClick={() => {
                    navigate("/dashboard/profile");
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <UserCircle className="w-4 h-4" />
                  <span>Mi Perfil</span>
                </button>
                
                <div className="my-1 border-t border-gray-200" />
                
                <button
                  onClick={() => {
                    logoutHandler();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}