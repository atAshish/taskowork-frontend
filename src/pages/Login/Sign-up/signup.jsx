import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { handleSignup } from '../../../service/api';
import image from "../../../assets/img/realtime-enhance-enhanced (3).png";

const Signup = () => {
  const [formData, setFormData] = useState({
    ClientName: "",
    ClientEmail: "",
    Password: "",
    confirmPassword: "",
    ClientPhone: "",
    CompanyName: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTermsCheck = () => {
    setTermsChecked(!termsChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.ClientName) {
      validationErrors.ClientName = "Name is required";
    }
    if (!formData.CompanyName) {
      validationErrors.CompanyName = "Company Name is required";
    }
    if (!formData.ClientPhone) {
      validationErrors.ClientPhone = "Mobile Number is required";
    }
    if (!formData.ClientEmail) {
      validationErrors.ClientEmail = "Email is required";
    }
    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword !== formData.Password) {
      validationErrors.confirmPassword = "Passwords must match";
    }
    if (!termsChecked) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await handleSignup(formData);
        if (response) {
          console.log("Signup successful");
          toast.success("Signup successful");
          navigate("/Login");
        } else {
          console.error("Signup failed:", response.statusText);
        }
      } catch (error) {
        toast.error("Signup failed. Please try again later.");
        console.error("Error:", error.message);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2">
        <img
          src={image}
          alt="Signup"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 flex justify-center items-center bg-white">
        <Card className="w-full max-w-md shadow-lg p-8">
          <Typography variant="h4" className="mb-6 text-center text-gray-800">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Company Name"
                name="CompanyName"
                type="text"
                value={formData.CompanyName}
                onChange={handleChange}
                error={errors.CompanyName}
              />
              <Input
                label="Client Name"
                name="ClientName"
                type="text"
                value={formData.ClientName}
                onChange={handleChange}
                error={errors.ClientName}
              />
              <Input
                label="Client Email"
                name="ClientEmail"
                type="email"
                value={formData.ClientEmail}
                onChange={handleChange}
                error={errors.ClientEmail}
              />
              <div className="relative">
                <Input
                  label="Password"
                  name="Password"
                  type={showPassword ? "text" : "password"}
                  value={formData.Password}
                  onChange={handleChange}
                  error={errors.Password}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    variant="text"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 animate-pulse" />
                    ) : (
                      <EyeIcon className="h-5 w-5 animate-pulse" />
                    )}
                  </IconButton>
                </div>
              </div>
              <div className="relative">
                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                />
              </div>
              <Input
                label="Client Phone"
                name="ClientPhone"
                type="number"
                value={formData.ClientPhone}
                onChange={handleChange}
                error={errors.ClientPhone}
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="termsCheckbox"
                  checked={termsChecked}
                  onChange={handleTermsCheck}
                  className="h-4 w-4 mr-2 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor="termsCheckbox" className="text-gray-700">
                  I agree to the <a href="#">terms and conditions</a>
                </label>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6 flex-col">
              <Button type="submit" fullWidth className="bg-black hover:bg-blue-gray-900 text-white">
                Sign Up
              </Button>
              <div>
                <Typography className="text-sm mt-5">
                  Already have an account?{" "}
                  <a href="/login" className="text-indigo-500 hover:underline">Login</a>
                </Typography>
              </div>
            </div>
          </form>
        </Card>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
