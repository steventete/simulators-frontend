import Services from './Services';
import { ArrowDown } from 'lucide-react';

function Hero() {
  return (
    <main className="min-h-screen -z-10">
      <section className="relative h-screen flex items-center justify-center bg-gray-100">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Bienvenido a Simulators</h1>
          <p className="text-xl md:text-2xl mb-12">
            Transforma la manera en que evalúas y valoras tus proyectos. Nuestra
            plataforma combina simuladores líderes como FMI y Mark51 con
            herramientas avanzadas de análisis, brindándote todo lo que necesitas
            para tomar decisiones basadas en datos, de forma rápida y precisa.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#about" className="bg-white text-blue-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-100 transition-colors">
              Conoce más
            </a>
            <a href="#services" className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors">
              Nuestros servicios
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-8 h-8 text-white" />
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Sobre Simulators</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-600 mb-6">
                Nuestra plataforma combina simuladores líderes como FMI y Mark51 con
                herramientas avanzadas de análisis, brindándote todo lo que necesitas
                para tomar decisiones basadas en datos, de forma rápida y precisa.
              </p>
              <p className="text-lg text-gray-600">
                Visualiza cada detalle en gráficos interactivos, accede a historiales
                completos de tus evaluaciones y optimiza cada etapa de tus proyectos
                con una experiencia diseñada para ti. Empieza hoy a maximizar tu impacto.
              </p>
            </div>
            <div className="relative h-64 md:h-auto">
              <img
                src="https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="About Simulators"
                className="w-full h-full object-cover rounded-lg shadow-lg -z-10"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-gray-100">
        <Services />
      </section>

      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para transformar tus proyectos?</h2>
          <p className="text-xl">
            Únete a Simulators hoy y lleva tus evaluaciones al siguiente nivel.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Hero;