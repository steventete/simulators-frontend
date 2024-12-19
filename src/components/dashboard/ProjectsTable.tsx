import { useEffect, useState } from "react";
import { fetchData } from "../../utils/fetchData";
import { ProjectResponse } from "../../types";
import { Link } from "react-router-dom";

const ProjectsTable = () => {
  const [projects, setProjects] = useState<ProjectResponse>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = (await fetchData("/proyectos")) as ProjectResponse;
      setProjects(data);
    };

    fetchProjects();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Descripción</th>
            <th className="p-3 text-left">Fecha de creación</th>
            <th className="p3-text-left">Evaluaciones</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr className="border-b" key={project.id}>
              <td className="p-3 text-blue-600">{project.nombre}</td>
              <td className="p-3">{project.descripcion}</td>
              <td className="p-3">
                {new Date(project.creado_en).toLocaleString()}
              </td>
              <td className="p-3 text-center">
                <Link
                  to={`/dashboard/project/${project.id}/evaluations`}
                  className="text-blue-600 font-semibold"
                >
                  Ver
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;
