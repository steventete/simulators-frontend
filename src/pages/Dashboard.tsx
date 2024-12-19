import ProjectsTable from "../components/dashboard/ProjectsTable";
import Toolbar from "../components/dashboard/Toolbar";
import DashboardLayout from "../layouts/DashboardLayout";

function Dashboard() {
  return (
    <>
      <DashboardLayout>
        <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
        <Toolbar />
        <div className="space-y-8">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Proyectos</h2>
            <ProjectsTable />
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default Dashboard;
