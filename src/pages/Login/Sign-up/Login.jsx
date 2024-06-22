/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { Input, Button, IconButton, Spinner } from "@material-tailwind/react";
import { handleLogin } from "../../../service/api";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
// import { isloggedin } from "./isloggedin";
import image from "../../../assets/img/realtime-enhance-enhanced (2).png";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("AccessToken");
  
    if (!token) {
      // No token found, showing access denied toast
      toast.error("Access Denied: Please login.");
    } else {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.ClientRole === "ADMIN") {
          navigate("/Protected/ClientDashboard");
        } else if (decodedToken.EmployeeRole === "Employee") {
          navigate("/Protected/EmployeeDashboard");
        } else if (decodedToken.EmployeeRole === "Admin") {
          navigate("/Protected/AdminDashboard");
        }
      } catch (decodeError) {
        // Token could not be decoded, showing access denied toast
        toast.error("Access Denied: Invalid Credentials");
      }
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await handleLogin({ ClientEmail: email, Password: password });
      const accessToken = response.AccessToken;
      localStorage.setItem("AccessToken", accessToken);
      toast.success("Login Successful!");

      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        if (decodedToken.ClientRole === "ADMIN") {
          navigate("/Protected/ClientDashboard");
        } else if (decodedToken.EmployeeRole === "Employee") {
          navigate("/Protected/EmployeeDashboard");
        } else if (decodedToken.EmployeeRole === "Admin") {
          navigate("/Protected/AdminDashboard");
        }
      }
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 h-full bg-cover bg-center">
        <img src={image} alt="" className="w-full h-screen object-cover" />
      </div>
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8">
          <ToastContainer />
          <div className="text-center mb-6">
            <h1 className="text-5xl font-bold text-gray-800">Welcome back!</h1>
            <p className="text-gray-600">Don't have an account yet? <Link to="/Signup" className="text-blue-500 hover:text-blue-700">Sign up</Link></p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">           
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="E.g. yourname@gmail.com"
            />
            <div className="relative">
              <Input
                type={showPassword? "text" : "password"}
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your password"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <IconButton onClick={() => setShowPassword(!showPassword)} color="gray" variant="text">
                  {showPassword? <EyeSlashIcon className="h-5 w-5 text-gray-600" /> : <EyeIcon className="h-5 w-5 text-gray-600" />}
                </IconButton>
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full py-2 bg-black hover:bg-gray-800 text-white font-semibold rounded-md shadow-lg">
              {loading? <Spinner color="white" size="sm" /> : "Sign in"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/Forgot_password" className="text-blue-500 hover:text-blue-700">
              Forgot password?
            </Link>
          </div>
          <div className="mt-4 text-center">
            <Link to="/Employe_login" className="text-blue-500 hover:text-blue-700">
               Login as Employee
            </Link>
          </div>
          {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;