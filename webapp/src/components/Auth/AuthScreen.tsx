import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
  ) : (
    <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
  );
};
