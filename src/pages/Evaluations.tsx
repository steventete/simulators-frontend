import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Loader2 } from "lucide-react";
import ProgressChart from "../components/dashboard/charts/ProgressChart";

interface Usuario {
  cedula: number;
  nombre: string;
  apellido: string;
  email: string;
}

interface Simulacion {
  id: number;
  parametros: string;
  creado_en: string;
}

interface Evaluacion {
  id: number;
  resultado: string;
  creado_en: string;
  usuario: Usuario;
  simulacion: Simulacion;
}

interface Proyecto {
  id: number;
  nombre: string;
}

function Evaluations() {
  const { id } = useParams();
  const [evaluaciones, setEvaluaciones] = useState<Evaluacion[]>([]);
  const [proyecto, setProyecto] = useState<Proyecto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const proyectoResponse = await fetch(
          `http://localhost:3000/api/proyectos/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!proyectoResponse.ok) {
          throw new Error("No se pudo obtener la información del proyecto");
        }

        const proyectoData = await proyectoResponse.json();
        setProyecto(proyectoData);

        const evaluacionesResponse = await fetch(
          `http://localhost:3000/api/evaluaciones/proyecto/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!evaluacionesResponse.ok) {
          throw new Error("No se pudieron obtener las evaluaciones");
        }

        const evaluacionesData = await evaluacionesResponse.json();
        setEvaluaciones(evaluacionesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const graficoData = evaluaciones.map((evaluacion) => {
    let resultadoParsed;

    try {
      resultadoParsed =
        typeof evaluacion.resultado === "string"
          ? JSON.parse(evaluacion.resultado)
          : evaluacion.resultado;
    } catch (error) {
      console.error("Error al parsear el resultado:", error);
      resultadoParsed = {};
    }

    return {
      fecha: new Date(evaluacion.creado_en).toLocaleDateString(),
      trl: resultadoParsed?.trl || 0,
      brl: resultadoParsed?.brl || 0,
      crl: resultadoParsed?.crl || 0,
    };
  });

  return (
    <DashboardLayout>
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">{error}</div>
      ) : (
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold">Evaluaciones del proyecto</h1>

          {evaluaciones.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Este proyecto aún no tiene evaluaciones.
            </p>
          ) : (
            <>
              <h2 className="text-2xl">Progreso de {proyecto?.nombre}</h2>
              <ProgressChart data={graficoData} />
              <h2 className="text-2xl">Indicadores</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {evaluaciones.map((evaluacion) => {
                  let resultadoParsed;

                  try {
                    resultadoParsed =
                      typeof evaluacion.resultado === "string"
                        ? JSON.parse(evaluacion.resultado)
                        : evaluacion.resultado;
                  } catch (error) {
                    console.error("Error al parsear el resultado:", error);
                    resultadoParsed = {};
                  }

                  return (
                    <div
                      key={evaluacion.id}
                      className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-500">
                          {new Date(evaluacion.creado_en).toLocaleDateString()}
                        </span>
                        <span className="text-xs font-bold text-blue-600 uppercase bg-blue-100 px-2 py-1 rounded">
                          ID: {evaluacion.id}
                        </span>
                      </div>
                      <div className="flex justify-around mb-4">
                        <div className="text-center">
                          <span className="text-lg font-bold text-green-600">
                            {resultadoParsed?.trl || 0}
                          </span>
                          <p className="text-sm text-gray-600">TRL</p>
                        </div>
                        <div className="text-center">
                          <span className="text-lg font-bold text-yellow-600">
                            {resultadoParsed?.brl || 0}
                          </span>
                          <p className="text-sm text-gray-600">BRL</p>
                        </div>
                        <div className="text-center">
                          <span className="text-lg font-bold text-red-600">
                            {resultadoParsed?.crl || 0}
                          </span>
                          <p className="text-sm text-gray-600">CRL</p>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        <strong>Acción:</strong>{" "}
                        {resultadoParsed?.generalSummary || "No disponible"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}

export default Evaluations;
