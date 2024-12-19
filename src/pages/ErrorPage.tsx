import { useNavigate } from 'react-router-dom';
import { AlertOctagon, ChevronLeft } from 'lucide-react';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <AlertOctagon className="w-16 h-16 mx-auto text-red-500 mb-4 animate-shake" />
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          ¡Oops!
        </h1>
        
        <p className="text-gray-600 mb-6">
          La página que buscas no existe.
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ChevronLeft className="size-5" />
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}