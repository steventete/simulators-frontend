import { UserProvider } from "../context/userContext";
import Header from "../components/dashboard/Header";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <UserProvider>
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-8">
          {children}
        </div>
      </div>
    </UserProvider>
  );
}
export default DashboardLayout;