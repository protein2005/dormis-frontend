import './OnboardingLayout.scss'
import Header from "@/layout/Header";
import { Outlet } from "react-router-dom";
import Footer from "@/layout/Footer";

const OnboardingLayout = () => {
  return (
    <div className="onboarding-layout">
      <Header variant="onboarding"/>
      <main>
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}

export default OnboardingLayout