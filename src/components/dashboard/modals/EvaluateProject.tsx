import { AnimatePresence, type AnimationProps, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useUser } from "../../../context/userContext";
import { fetchData } from "../../../utils/fetchData";
import { SimulatorResponse, ProjectResponse } from "../../../types";
import { useNavigate } from "react-router-dom";

interface EvaluateProjectProps {
  isOpen: boolean;
  onClose: () => void;
}

const EvaluateProject = ({ isOpen, onClose }: EvaluateProjectProps) => {
  const [simulators, setSimulators] = useState<SimulatorResponse>([]);
  const [projects, setProjects] = useState<ProjectResponse>([]);
  const user = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectData, setProjectData] = useState({
    usuario_id: user.cedula,
    proyecto_id: 0,
    simulador_id: 0,
    parametros: "",
    resultado: "",
  });
  const navigate = useNavigate();

  const variants: { [key: string]: AnimationProps } = {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { ease: [0.19, 1, 0.22, 1], duration: 0.4 },
    },
    content: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.9, opacity: 0 },
      transition: { ease: [0.19, 1, 0.22, 1], duration: 0.4 },
    },
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const simulatorsData = (await fetchData(
          "/simuladores"
        )) as SimulatorResponse;
        const projectsData = (await fetchData("/proyectos")) as ProjectResponse;

        setSimulators(simulatorsData);
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProjectData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (name === "proyecto_id") {
        updatedData.proyecto_id = value ? parseInt(value, 10) : 0;
      }

      if (name === "simulador_id") {
        updatedData.simulador_id = parseInt(value, 10);

        const selectedSimulator = simulators.find(
          (simulator) => simulator.id === updatedData.simulador_id
        );

        if (selectedSimulator) {
          if (selectedSimulator.nombre === "TRL, BRL, CRL") {
            updatedData.parametros = JSON.stringify({
              TRL: null,
              BRL: null,
              CRL: null,
              Mensaje: "Indicar evaluación",
            });
          } else {
            updatedData.parametros = "";
          }
        }
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const simulacionResponse = await fetch(
        "http://localhost:3000/api/simulaciones",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario_id: projectData.usuario_id,
            simulador_id: projectData.simulador_id,
            parametros: projectData.parametros,
            resultado: projectData.resultado,
          }),
        }
      );

      if (!simulacionResponse.ok) {
        throw new Error("Error al crear la simulación");
      }

      const simulacionData = await simulacionResponse.json();
      console.log("Simulación creada:", simulacionData);

      const evaluacionResponse = await fetch(
        "http://localhost:3000/api/evaluaciones",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usuario_id: projectData.usuario_id,
            proyecto_id: parseInt(projectData.proyecto_id.toString(), 10),
            simulacion_id: simulacionData.simulacion.id,
            resultado: projectData.resultado,
          }),
        }
      );

      if (!evaluacionResponse.ok) {
        throw new Error("Error al crear la evaluación");
      }

      const evaluacionData = await evaluacionResponse.json();
      console.log("Evaluación creada:", evaluacionData);

      // Aquí verificamos el tipo de simulador
      const selectedSimulator = simulators.find(
        (simulator) => simulator.id === projectData.simulador_id
      );

      if (selectedSimulator) {
        if (selectedSimulator.nombre === "TRL, BRL, CRL") {
          navigate(
            `/dashboard/evaluation/trl-brl-crl/${evaluacionData.evaluacion.id}`
          );
        } else {
          navigate(
            `/dashboard/evaluation/other/${evaluacionData.evaluacion.id}`
          );
        }
      }

      onClose();
    } catch (error) {
      console.error("Error al evaluar el proyecto:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={onClose} /// <reference path="./EvaluateProject.tsx" />
    >
      <Dialog.Portal forceMount>
        <AnimatePresence mode="popLayout">
          {isOpen && (
            <Dialog.Overlay className="fixed top-0 left-0 h-full w-full bg-black bg-opacity-50">
              <motion.div
                className="fixed inset-0 bg-black-a10"
                {...variants.overlay}
              />
            </Dialog.Overlay>
          )}
        </AnimatePresence>
        <AnimatePresence mode="popLayout">
          {isOpen && (
            <Dialog.Content className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[450px]">
              <motion.div
                className="flex-col overflow-hidden rounded-xl bg-white border border-gray-3 bg-gray-1 sm:w-[384px]"
                {...variants.content}
              >
                <Dialog.Title className="px-6 pt-5 font-semibold text-foreground text-large">
                  Evaluar Proyecto
                </Dialog.Title>

                <form onSubmit={handleSubmit}>
                  {/* Evaluador */}
                  <fieldset className="mb-[15px] flex flex-col gap-4 px-6 py-4">
                    <label
                      htmlFor="evaluador"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Evaluador
                    </label>
                    <input
                      id="evaluador"
                      name="evaluador"
                      value={user.nombre + " " + user.apellido}
                      disabled
                      className="h-[32px] w-full flex-1 rounded-lg border border-gray-4 bg-gray-200 px-2.5 text-[15px] text-default leading-none transition-all placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-green-11 focus:ring-offset-2 focus:ring-offset-gray-1"
                    />
                  </fieldset>

                  {/* Proyectos */}
                  <fieldset className="mb-[15px] flex flex-col gap-4 px-6 py-4">
                    <label
                      htmlFor="proyecto_id"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Proyecto
                    </label>
                    <select
                      id="proyecto_id"
                      name="proyecto_id"
                      value={projectData.proyecto_id}
                      onChange={handleChange}
                      className="h-[32px] w-full flex-1 rounded-lg border border-gray-4 bg-gray-2 px-2.5 text-[15px] text-default leading-none transition-all placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-green-11 focus:ring-offset-2 focus:ring-offset-gray-1"
                      required
                    >
                      <option value="">Seleccione un proyecto</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.nombre}
                        </option>
                      ))}
                    </select>
                  </fieldset>

                  {/* Simulador */}
                  <fieldset className="mb-[15px] flex flex-col gap-4 px-6 py-4">
                    <label
                      htmlFor="simulador_id"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Simulador
                    </label>
                    <select
                      id="simulador_id"
                      name="simulador_id"
                      value={projectData.simulador_id}
                      onChange={handleChange}
                      className="h-[32px] w-full flex-1 rounded-lg border border-gray-4 bg-gray-2 px-2.5 text-[15px] text-default leading-none transition-all placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-green-11 focus:ring-offset-2 focus:ring-offset-gray-1"
                      required
                    >
                      <option value="">Seleccione un simulador</option>
                      {simulators.map((simulator) => (
                        <option key={simulator.id} value={simulator.id}>
                          {simulator.nombre}
                        </option>
                      ))}
                    </select>
                  </fieldset>

                  <div className="px-6 py-4">
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-blue-600 text-white py-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Cargando..." : "Evaluar"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </Dialog.Content>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EvaluateProject;
