import { File, BarChartIcon as ChartBar } from 'lucide-react';
import CreateProject from "../dashboard/modals/CreateProject";
import EvaluateProject from "./modals/EvaluateProject";
import { ToolbarButton } from "./ToolbarButton";
import { useModal } from "../../hooks/useModal";

const toolbarItems = [
  {
    name: "Nuevo proyecto",
    icon: File,
    action: "create",
    ariaLabel: "Crear nuevo proyecto",
  },
  {
    name: "Evaluar proyecto",
    icon: ChartBar,
    action: "evaluate",
    ariaLabel: "Evaluar proyecto existente",
  },
];

export default function Toolbar() {
  const [createProjectModal, openCreateProject, closeCreateProject] = useModal();
  const [evaluateProjectModal, openEvaluateProject, closeEvaluateProject] = useModal();

  const handleButtonClick = (action: string) => {
    if (action === "create") {
      openCreateProject();
    } else if (action === "evaluate") {
      openEvaluateProject();
    }
  };

  return (
    <nav className="w-auto py-4 px-6 bg-blue-500 shadow-md rounded-md">
      <div className="max-w-7xl mx-auto flex justify-center items-center">
        <ul className="flex space-x-4">
          {toolbarItems.map((item) => (
            <li key={item.action}>
              <ToolbarButton
                icon={item.icon}
                onClick={() => handleButtonClick(item.action)}
                ariaLabel={item.ariaLabel}
              >
                {item.name}
              </ToolbarButton>
            </li>
          ))}
        </ul>
      </div>
      <CreateProject isOpen={createProjectModal} onClose={closeCreateProject} />
      <EvaluateProject isOpen={evaluateProjectModal} onClose={closeEvaluateProject} />
    </nav>
  );
}

