import { useState } from "react";
import { File, ChartBar } from "lucide-react";
import CreateProject from "../dashboard/modals/CreateProject";
import EvaluateProject from "./modals/EvaluateProject";

const functions = [
  {
    name: "Nuevo proyecto",
    icon: File,
    action: "create",
  },
  {
    name: "Evaluar proyecto",
    icon: ChartBar,
    action: "evaluate",
  },
];

function Toolbar() {
  const [isCreateProjectModalOpen, setCreateProjectModalOpen] = useState(false);
  const [isEvaluateProjectModalOpen, setEvaluateProjectModalOpen] =
    useState(false);

  const handleEvaluateModalClose = () => {
    setEvaluateProjectModalOpen(false);
  };

  const handleButtonClick = (action: string) => {
    if (action === "create") {
      setCreateProjectModalOpen(true);
    } else if (action === "evaluate") {
      setEvaluateProjectModalOpen(true);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex max-lg:ml-auto space-x-4">
        {functions.map((func, index) => (
          <div key={index} className="flex items-center">
            <button
              onClick={() => handleButtonClick(func.action)}
              className="px-4 flex items-center gap-2 justify-center py-2 text-sm rounded-md font-bold text-white bg-blue-500 transition-all ease-in-out duration-300 hover:bg-blue-600"
            >
              <func.icon size={24} />
              {func.name}
            </button>
          </div>
        ))}
      </div>
      <CreateProject
        isOpen={isCreateProjectModalOpen}
        onClose={() => setCreateProjectModalOpen(false)}
      />
      <EvaluateProject
        isOpen={isEvaluateProjectModalOpen}
        onClose={handleEvaluateModalClose}
      />
    </div>
  );
}

export default Toolbar;
