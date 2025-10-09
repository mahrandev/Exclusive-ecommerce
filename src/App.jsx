import Header from "./components/layout/Header";
import AppRoutes from "./routes";
import { Outlet } from "react-router-dom";
import Footer from "./components/layout/Footer";
function App() {
  return (
    <>
      <Header />
      <hr />
      <main>
        <AppRoutes />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
