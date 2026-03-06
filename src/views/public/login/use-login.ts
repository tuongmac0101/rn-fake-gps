import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "~/stores/auth.store";
import { useToast } from "~/hooks";

const initData = {
  email: "apetechs.sale@gmail.com",
  password: "Password@123",
};

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false); // Thêm state loading

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const toast = useToast();

  const { login } = useAuthStore((state) => state);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login({
        username: email,
        password,
      });
      navigation.navigate("HomeTabs");
    } catch (error: any) {
      toast.handlerError(error);
    }

    setIsLoading(false);
  };
  const gotoForgotPassword = () => {
    navigation.navigate("ForgotPasswordView");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    setIsLoading,
    gotoForgotPassword,
    handleLogin,
  };
};
