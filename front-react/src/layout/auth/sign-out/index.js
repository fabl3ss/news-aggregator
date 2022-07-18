import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth-context/auth.context";

function SignOut() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    await setUser(null);
    localStorage.removeItem("user");
    return navigate("/sign-in");
  };

  useEffect(() => {
    handleLogout();
  });

  return null;
}

export default SignOut;
