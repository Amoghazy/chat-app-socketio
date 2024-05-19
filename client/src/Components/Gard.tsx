import { Navigate, useLocation } from "react-router-dom";
import UnAuthorized from "../Pages/UnAuthorized";

export default function Gard({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  if (!localStorage.getItem("token") && location.pathname !== "/") {
    return <UnAuthorized />;
  }

  if (!localStorage.getItem("token") && location.pathname === "/") {
    return <Navigate to="/auth/email" />;
  }

  return <>{children}</>;
}
