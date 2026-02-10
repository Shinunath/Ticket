import React, { useState } from "react";
import Register from "./register";
import VerifyOtp from "./VerifyOtp";
import Login from "./Login";

const AuthFlow = () => {
  const [step, setStep] = useState("register");
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl">
        {step === "register" && (
          <Register
            onSuccess={(userEmail) => {
              setEmail(userEmail);
              setStep("verifyOtp");
            }}
          />
        )}

        {step === "verifyOtp" && (
          <VerifyOtp
            email={email}
            onSuccess={() => setStep("login")}
          />
        )}

        {step === "login" && <Login />}
      </div>
    </div>
  );
};

export default AuthFlow;
