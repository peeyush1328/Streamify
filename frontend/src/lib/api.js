import axiosInstance from "./axios";

export const signUp = async (userData) => {
  const res = await axiosInstance.post("/auth/signup", userData);
  return res.data;
};

export const getUser = async () => {
  const res = await axiosInstance.get(`/auth/me`);
  return res.data;
};

export const completeOnboarding = async (onboardingData) => {
  const res = await axiosInstance.patch("/auth/onboard", onboardingData);
  return res.data;
};

export const login = async (loginData) => {
  const res = await axiosInstance.post("/auth/login", loginData);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};
