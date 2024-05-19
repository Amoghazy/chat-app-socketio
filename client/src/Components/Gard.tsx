import UnAuthorized from "../Pages/UnAuthorized";

export default function Gard({ children }: { children: React.ReactNode }) {
  if (!localStorage.getItem("token")) {
    return <UnAuthorized />;
  }

  return <>{children}</>;
}
