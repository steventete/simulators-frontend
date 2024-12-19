import { Signpost, MSquare, BarChart3, Zap, ArrowRight } from 'lucide-react';

const services: Service[] = [
  {
    id: 1,
    title: 'FMI Simulator',
    description: 'Evalúa indicadores TRL, BRL y CRL de tu proyecto con precisión.',
    icon: Signpost,
    features: ['Análisis detallado de TRL', 'Evaluación de BRL', 'Métricas de CRL'],
    color: 'blue',
  },
  {
    id: 2,
    title: 'Mark51 Simulator',
    description: 'Simula el impacto de tu proyecto en el mercado con datos en tiempo real.',
    icon: MSquare,
    features: ['Proyecciones de mercado', 'Análisis de competencia', 'Escenarios de lanzamiento'],
    color: 'green',
  },
  {
    id: 3,
    title: 'Análisis Avanzado',
    description: 'Obtén insights profundos con nuestras herramientas de análisis de datos.',
    icon: BarChart3,
    features: ['Visualizaciones interactivas', 'Modelos predictivos', 'Informes personalizados'],
    color: 'purple',
  },
  {
    id: 4,
    title: 'Optimización de Proyectos',
    description: 'Mejora la eficiencia y el rendimiento de tus proyectos con IA.',
    icon: Zap,
    features: ['Recomendaciones basadas en IA', 'Optimización de recursos', 'Seguimiento de KPIs'],
    color: 'orange',
  },
];
interface Service {
    id: number;
    title: string;
    description: string;
    icon: React.ComponentType;
    features: string[];
    color: keyof typeof colorClasses;
}
const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
};

function Services() {
  return (
    <div id="services" className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Nuestros Servicios</h2>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Descubre cómo nuestras herramientas de simulación y análisis pueden impulsar el éxito de tus proyectos.
        </p>
      </div>

      <div className="mt-20 grid gap-10 lg:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
          >
            <div className="flex-1 p-6 sm:p-8">
              <div className={`inline-flex p-3 rounded-lg ${colorClasses[service.color]} mb-5`}>
                <service.icon  />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="mt-3 text-base text-gray-500">{service.description}</p>
              <ul className="mt-6 space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <ArrowRight className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-base text-gray-700">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;