import { Outlet } from "react-router-dom";

export default function LoginLayout() {
  return (
    <>
    <section className="h-dvh flex items-center justify-center">
        <div className="w-1/2 p-1 flex justify-center items-center animate-fadeInUp transition-all">
      <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-2xl">
        <Outlet />
        </div>
        </div>
    </section>
    </>
  );
}
