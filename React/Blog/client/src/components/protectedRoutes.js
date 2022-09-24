import axios from "axios";
import Cookies from "js-cookie";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoute() {
  const userCookie = Cookies.get("user");

  const navigate = useNavigate();

  async function checkAuth(token) {
    const config = {
      withCredentials: true,
    };
    await axios
      .post(process.env.REACT_APP_SERVER_BASE + "checkAuth", { token }, config)
      .then((response) => {
        const res = response.data;
        // console.log(res.success);
      })
      .catch((err) => {
        const error = err.response.data;
        // console.log(error);

        if (error) {
          navigate("/admin");
        }
      });
  }

  const user = JSON.parse(userCookie);
  const token = user.token;
  // console.log(user);

  checkAuth(token);

  if (!userCookie) {
    return <Navigate to={"/admin"} replace />;
  }

  return <Outlet />;
}
