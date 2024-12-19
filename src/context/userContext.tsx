import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  cedula: string;
  nombre: string;
  apellido: string;
  email: string;
  rol_id: number;
}

const UserContext = createContext<User | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/usuarios/usuario/${localStorage.getItem('loggedUserId')}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

// Crear un hook para acceder al contexto
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }

  return context;
};
