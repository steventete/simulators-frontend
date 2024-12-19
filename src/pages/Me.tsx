import { useEffect, useState } from "react";
import { UserCircle, Mail, IdCard, Loader2, ArrowLeftCircleIcon } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Link } from "react-router-dom";

interface Usuario {
  cedula: number;
  nombre: string;
  apellido: string;
  email: string;
  rol_id: number;
}

interface Estado {
  usuario: Usuario | null;
  isLoading: boolean;
  error: string | null;
}

export default function Me() {
  const [estado, setEstado] = useState<Estado>({
    usuario: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchUsuario = async () => {
      const userId = localStorage.getItem("loggedUserId");

      if (!userId) {
        setEstado((prev) => ({
          ...prev,
          isLoading: false,
          error: "No se encontró el ID del usuario",
        }));
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/usuarios/usuario/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Error al obtener la información del usuario (${response.status})`
          );
        }

        const usuarioData = await response.json();

        if (!usuarioData) {
          throw new Error("No se encontraron datos del usuario");
        }

        setEstado({
          usuario: usuarioData,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        setEstado({
          usuario: null,
          isLoading: false,
          error: err instanceof Error ? err.message : "Error desconocido",
        });
      }
    };

    fetchUsuario();
  }, []);

  return (
    <DashboardLayout>
      <div className=" bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {estado.error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {estado.error}
            </div>
          )}

          {estado.isLoading ? (
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Loader2 className="animate-spin h-8 w-8 mx-auto text-blue-500" />
              <p className="mt-2 text-gray-500">Cargando información...</p>
            </div>
          ) : estado.usuario ? (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                <div className="flex justify-center">
                  <UserCircle className="h-20 w-20 text-white" />
                </div>
                <h2 className="mt-4 text-center text-2xl font-bold text-white">
                  {estado.usuario.nombre} {estado.usuario.apellido}
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3 text-gray-700">
                  <IdCard className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Cédula</p>
                    <p className="font-medium">{estado.usuario.cedula}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{estado.usuario.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-gray-700">
                <Link
                      to="/dashboard"
                      className="text-blue-500 font-medium flex items-center justify-center gap-2 border-blue-500 border-2 rounded w-full py-2 hover:bg-blue-100 transition"
                      >
                        <ArrowLeftCircleIcon className="size-5 text-blue-500" />
                      Volver
                    </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </DashboardLayout>
  );
}
