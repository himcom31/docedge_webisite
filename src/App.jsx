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

function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}> 
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/payment-status" element={<PaymentStatus />} />
          <Route path="/plan/:planId" element={<PlanDetails />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </div>
    </GoogleReCaptchaProvider> 
  );
}

export default App;