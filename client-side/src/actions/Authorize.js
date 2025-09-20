import { useDispatch } from "react-redux";
import { setAdminStatus } from "../app/authSlice.js";
const PORT = import.meta.env.VITE_BACKEND_URL;


export const AuthorizeAdmin = async () => {
  const dispatch = useDispatch()
  try {
    console.log(`Accessing admin authorization at ${PORT}/authorize-admin`);
    const res = await fetch(`${PORT}/authorize-admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (data && data.isAdmin) {
      dispatch(setAdminStatus(data.isAdmin));
    }
  } catch (error) {}
};
