import Header from "./components/layout/Header";
import AppRoutes from "./routes";
import { Outlet } from "react-router-dom";
import Footer from "./components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Header />
      <hr className="border-gray-200" />
      <main>
        <AppRoutes />
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
