import axios from "axios";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL + "/api",
});

export const register = async (data: FormData) => {
  return await authApi.post("/register", data);
};

export const checkEmail = async (data: { email: string }) => {
  return await authApi.post("/checkemail", data);
};

export const checkPassword = async (data: { password: string }) => {
  return await authApi.post("/checkpassword", data, { withCredentials: true });
};
export const fetchUser = async () => {
  const data = await authApi.get("/user-details", { withCredentials: true });
  return data.data;
};
export const checkUserExist = async (data: { id: string | undefined }) => {
  return await authApi.post("/check-user", data);
};
export const updateUser = async (data: FormData) => {
  return await authApi.patch("/update-user-details", data, {
    withCredentials: true,
  });
};
export const searchUser = async (value: string) => {
  return await authApi.get(`/search?user=${value}`, {
    withCredentials: true,
  });
};
export const logout = async () => {
  return await authApi.get("/logout", { withCredentials: true });
};
