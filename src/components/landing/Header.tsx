import { Home, MessageCircle, SquareActivity, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { id: 1, title: "Inicio", path: "/", icon: Home },
  { id: 2, title: "Servicios", path: "/#services", icon: SquareActivity },
  { id: 3, title: "Contacto", path: "/#contact", icon: MessageCircle },
];

function Header() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-5xl mx-auto z-20">
      <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-full shadow-lg px-4 py-2 flex items-center justify-between">
        <a
          href="/"
          className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
        >
          Simulators
        </a>

        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.path}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          to="/login"
          className="flex items-center space-x-1 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          <span>Comenzar</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
