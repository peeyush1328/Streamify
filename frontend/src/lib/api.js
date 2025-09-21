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

export const getAllFriends = async () => {
  const res = await axiosInstance.get("/user/friends");
  return res.data;
};
export const getRecommendedFriends = async () => {
  const res = await axiosInstance.get("/user");
  return res.data;
};
export const getOutgoingFriendReqs = async () => {
  const res = await axiosInstance.get("/user/outgoing-friend-requests");
  return res.data;
};

export const sendFriendRequest = async (userId) => {
  const res = await axiosInstance.post(`/user/friend-request/${userId}`);
  return res.data;
};

export const getFriendRequests = async () => {
  const res = await axiosInstance.get("/user/friend-requests");
  return res.data;
};

export const acceptFriendRequest = async (requestId) => {
  const res = await axiosInstance.put(
    `/user/friend-request/${requestId}/accept`
  );
  return res.data;
};

export const getStreamToken = async () => {
  const res = await axiosInstance.get("/chat/token");
  return res.data;
};
