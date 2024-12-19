"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface LoginData {
  email: string;
  clave: string;
}

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    clave: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("loggedUserId", data.cedula);
        navigate("/dashboard");
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <h2 className="text-center text-3xl font-bold text-gray-900">
        Iniciar sesión
      </h2>
      <form className="mt-8 space-y-6 animate-fadeIn" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Correo electrónico"
              value={loginData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="clave" className="sr-only">
              Clave
            </label>
            <input
              id="clave"
              name="clave"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Contraseña"
              value={loginData.clave}
              onChange={handleInputChange}
            />
            {/* Button para enviar el formulario */}
            <div className="flex items-center justify-between mt-4">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
              >
                Iniciar sesión
              </button>
            </div>
            <Link to={"/"}
                className="group relative w-full flex justify-center py-2 mt-2 px-4 border text-sm font-medium rounded-md text-blue-700 bg-transparent border-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-blue-100 transition"
              >
                Volver
              </Link>
            <article className="flex justify-center mt-6">
              <Link
                to="/register"
                className="text-sm text-blue-600 hover:text-blue-900"
              >
                <span>¿No tienes cuenta? Regístrate</span>
              </Link>
            </article>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
