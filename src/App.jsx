import "./App.css";
import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Contact from "./pages/Contact";
import ClientDashboard from "./pages/Dashboards/ClientDashboard";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Login/Sign-up/signup";
import Login from "./pages/Login/Sign-up/Login";
import EmployeLogin from "./pages/Login/Sign-up/EmployeLogin";
import AdminDashboard from "./pages/Dashboards/AdminDashboard";
import ProtectedRoute from "./pages/Login/Sign-up/Auth";
import EmployeeDashboard from "./pages/Dashboards/EmployeeDashboard";
import NotFoundPage from "./pages/404 page/404";
function App() {
  return (
    <div>
      <div className="lg:hidden block text-center p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white min-h-screen flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-4">App Coming Soon!</h1>
        <p className="text-lg">Please access our website from a desktop device.</p>
      </div>
      <div className="hidden lg:block">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Plans" element={<Plans />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/Protected" element={<ProtectedRoute />}>
            <Route path="ClientDashboard" element={<ClientDashboard />}></Route>
            <Route path="AdminDashboard" element={<AdminDashboard />}></Route>
            <Route path="EmployeeDashboard" element={<EmployeeDashboard />}></Route>
          </Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Employe_Login" element={<EmployeLogin />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;