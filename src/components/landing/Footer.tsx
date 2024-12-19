import { Mail, Phone, Twitter, Linkedin, Instagram } from 'lucide-react';

function Footer() {
  return (
    <footer id="contact" className="bg-gray-800 text-white py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Simulators</h3>
            <p className="text-gray-400">
              Transformando la evaluación de proyectos con tecnología avanzada.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contacto</h3>
            <p className="text-gray-400 flex items-center mb-2">
              <Mail className="w-5 h-5 mr-2" />
              <span>info@simulators.com</span>
            </p>
            <p className="text-gray-400 flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              <span>+1 234 567 890</span>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Simulators. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;