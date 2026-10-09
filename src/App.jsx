import React from 'react';
import { Routes, Route } from "react-router-dom";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"; // ← ADD
import Home from './pages/Home';
import SignupForm from './components/Signupform';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PaymentStatus from './pages/Paymentstatus';
import PlanDetails from './components/Plandetails';
import AuthPage from './pages/Authpage';
import Dashboard from './pages/Dashboard';
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import PrivacyPolicy from './pages/PrivacyPolicy';
import DocEdgeTerms from './pages/termsCondition';
import Pricing from './components/Pricing';

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};


function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LdGnX4tAAAAAFrRpJWwdQGNWdRM0NaUtUtQ29pa">
      <div className="App">
        <Navbar scrollTo={scrollTo} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/payment-status" element={<PaymentStatus />} />
          <Route path="/plan/:planId" element={<PlanDetails />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/term-condt." element={<DocEdgeTerms />} />
          <Route path="/pricing" element={<Pricing />} />





        </Routes>
        <Footer />
      </div>
    </GoogleReCaptchaProvider>
  );
}

export default App;

// import Maintenance from './components/Maintenance';

// function App() {
//   return <Maintenance />;
// }

// export default App;