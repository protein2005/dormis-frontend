import './MainLayout.scss'
import Header from "@/layout/Header";
import { Outlet } from "react-router-dom";
import Footer from "@/layout/Footer";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default MainLayout