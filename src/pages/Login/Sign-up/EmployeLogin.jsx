/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { Input, Button, IconButton } from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { handle_employeLogin } from "../../../service/api";
import { isloggedin } from "./isloggedin";

const EmployeLogin = () => {
  
  useEffect(()=>{
    if (isloggedin()){
      let data=localStorage.getItem("AccessToken")
      const decodedToken = jwtDecode(data);
        console.log(decodedToken);
      if(decodedToken.ClientRole=="ADMIN"){
        navigate("/Protected/ClientDashboard")
      }
      else if(decodedToken.EmployeeRole=="Employee"){
        navigate("/Protected/EmployeeDashboard")
      }
      else if(decodedToken.EmployeeRole=="Admin"){
        navigate("/Protected/AdminDashboard")
      }
    }
  },[])
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await handle_employeLogin({ EmployeeEmail: email, Password: password });
      const AccessToken = response.AccessToken;
      localStorage.setItem("AccessToken", AccessToken);
      toast.success("Login Successful!");
      if (AccessToken) {
        const decodedToken = jwtDecode(AccessToken);
      
        if (decodedToken.EmployeeRole === "Admin") {
          navigate("/Protected/AdminDashboard");
        }
        else(
          navigate("/Protected/EmployeeDashboard")
        )
      }
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Employee Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <IconButton onClick={() => setShowPassword(!showPassword)} color="gray " variant="text">
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </IconButton>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 flex-col">
            <Button type="submit" className="ml-2">
              LOGIN
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <Link to="/Forgot_password" className="text-blue-500 hover:text-blue-700">
            Forgot password
          </Link>
        </div>
        <div className="mt-2 text-center">
        {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default EmployeLogin;
