import { Outlet } from "react-router-dom";
import { Footer } from "../Footer";
import { Header } from "../Header";

export function PageLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
