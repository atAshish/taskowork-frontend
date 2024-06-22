/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { gsap } from "gsap";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import Clientcontent from "./Admindashboard/Clientcontent";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import Assigntask from "./Admindashboard/Assigntask";
import AddEmploye from "./Admindashboard/AddEmploye";
import { useNavigate } from "react-router-dom";
import {
  PresentationChartBarIcon,
  PowerIcon,
  RectangleStackIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import "react-calendar/dist/Calendar.css";
import logo from "../../assets/img/WhatsApp_Image_2024-05-19_at_3.23.09_PM__1_-removebg-preview.png"
ChartJS.register(BarElement, CategoryScale, LinearScale);


const DashboardContent = () => {
  // Dashboard content component
  return (
    <div>
      <Clientcontent />
    </div>
  );
};

const AssignTaskContent = () => {
  // Assign task content component
  return (
    <div>
      <Assigntask></Assigntask>
    </div>
  );
};

const AddEmployeesContent = () => {
  // Add employees content component
  return (
    <div>
      <AddEmploye></AddEmploye>
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const labelDropdownRef = useRef(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [activeLink, setActiveLink] = useState("dashboard");
  const [showMenu, setShowMenu] = useState(true); // Set to true to open by default
  const [showLabelDropdown, setShowLabelDropdown] = useState(false); // New state for label dropdown
  const startDayRef = useRef(null);
  const [userDetailDrawerOpen, setUserDetailDrawerOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true); // New state to track image loading
  const handIconRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(startDayRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
    if (handIconRef.current) {
      gsap.to(handIconRef.current, {
        rotation: 20,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
        ease: "power1.inOut"
      });
    }
  }, []);

  let data = localStorage.getItem("AccessToken");
  let decodedToken = jwtDecode(data);
  console.log(decodedToken);

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleCloseLogoutDialog = () => {
    localStorage.removeItem("AccessToken");
    setShowLogoutDialog(false);
    navigate("/Login");
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowLabelDropdown(false); // Close label dropdown when menu is toggled
  };

  const toggleLabelDropdown = () => {
    setShowLabelDropdown(!showLabelDropdown);
  };

  const handleUserDetailClick = () => {
    setUserDetailDrawerOpen(true);
  };

  const handleCloseUserDetailDrawer = () => {
    setUserDetailDrawerOpen(false);
  };

  return (
    <div className="flex bg-white overflow-hidden">
      <div className="flex flex-col">
        <Card className="h-[calc(100vh-0.5rem)] w-full lg:flex max-w-[25rem] p-4  gap-4 sm:hidden border-r-8 border-gradient-r from-black via-gray-300 to-transparent  rounded-none">
          <div className="mb-2 p-4">
            <img src={logo} alt="" />
          </div>
          <div className="mb-2 p-4">
            <Typography
              variant="h1"
              color="blue-gray"
              className="text-pretty text-4xl font-bold text-black"
              ref={startDayRef}
            >
              Let's make today successful.✌️
            </Typography>
          </div>
          {/* User Details Section */}
          <div className="mb-4 p-4 flex-col items-center bg-blue-gray-50 rounded-lg shadow-sm justify-between cursor-pointer">
           <div className=" flex items-center bg-blue-gray-50  justify-between cursor-pointer w-full">
           <div className="flex items-center">
              <Avatar src="https://i.pravatar.cc/100" alt="Client Avatar" className="mr-4 w-16 h-16 border-2 border-blue-gray-300 shadow" />
              <div>
                <Typography variant="h5" color="blue-gray" className="text-2xl font-bold">
                  {decodedToken.EmployeeName}
                </Typography>
                <Typography variant="body2" color="blue-gray" className="text-sm">
                  {decodedToken.EmployeeRole}
                </Typography>
              </div>
            </div>
          <Tooltip content="View Details" placement="right">
            <span className="bg-black text-white p-3 rounded-full">
              <ChevronRightIcon className="h-6 w-6 text-blue-gray-50" ref={handIconRef} onClick={handleUserDetailClick} />
            </span>
          </Tooltip>
           </div>
           <div className=" flex w-full mt-4 ">
            <Button variant="filled" color="red" className="flex justify-center items-center gap-2 py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition-colors" onClick={handleLogoutClick}>
              <ArrowRightOnRectangleIcon className="h-5 w-5 text-white" />
              <span className="text-white font-medium">Log Out</span>
            </Button>
           </div>
          </div>
          <List>
            <ListItem className="cursor-pointer p-2 hover:bg-gray-50 flex justify-between items-center" onClick={toggleMenu}>
              <span className="text-black">Menu</span>
              {showMenu ? <ChevronUpIcon className="h-5 w-5 text-black" /> : <ChevronDownIcon className="h-5 w-5 text-black" />}
            </ListItem>
            {showMenu && (
              <div className="bg-white shadow-lg rounded-lg">
                <List>
                  <ListItem className={`cursor-pointer p-2 hover:bg-gray-50 ${activeLink === "dashboard" ? "bg-gray-200" : ""}`} onClick={() => handleLinkClick("dashboard")}>
                    <ListItemPrefix>
                      <PresentationChartBarIcon className="h-5 w-5 text-black" />
                    </ListItemPrefix>
                    <span className="ml-2 text-black">Dashboard</span>
                  </ListItem>
                  <ListItem className={`cursor-pointer p-2 hover:bg-gray-50 ${activeLink === "assignTask" ? "bg-gray-200" : ""}`} onClick={() => handleLinkClick("assignTask")}>
                    <ListItemPrefix>
                      <RectangleStackIcon className="h-5 w-5 text-black" />
                    </ListItemPrefix>
                    <span className="ml-2 text-black">Assign Task</span>
                  </ListItem>
                  <ListItem className={`cursor-pointer p-2 hover:bg-gray-50 ${activeLink === "addEmployees" ? "bg-gray-200" : ""}`} onClick={() => handleLinkClick("addEmployees")}>
                    <ListItemPrefix>
                      <UserPlusIcon className="h-5 w-5 text-black" />
                    </ListItemPrefix>
                    <span className="ml-2 text-black">Add Employees</span>
                  </ListItem>
                  <ListItem className="cursor-pointer p-2 hover:bg-gray-50" >
                    
                  </ListItem>
                  <ListItem className="cursor-pointer p-2 hover:bg-gray-50" onClick={toggleLabelDropdown}>
                    <ListItemPrefix>
                      <ChevronDownIcon className="h-5 w-5 text-black" />
                    </ListItemPrefix>
                    <span className="ml-2 text-black">Label</span>
                  </ListItem>
                  {showLabelDropdown && (
                    <div className="bg-white shadow-lg rounded-lg pb-9">
                      {/* Dropdown content here */}
                      <ListItem className="cursor-pointer p-2 hover:bg-gray-50 ">
                    <div className="flex items-center">
                      <span className="h-2 w-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                      <span className="ml-2 text-black">High</span>
                    </div>
                  </ListItem>
                  <ListItem className="cursor-pointer p-2 hover:bg-gray-50">
                    <div className="flex items-center">
                      <span className="h-2 w-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
                      <span className="ml-2 text-black">Medium</span>
                    </div>
                  </ListItem>
                  <ListItem className="cursor-pointer p-2 hover:bg-gray-50">
                    <div className="flex items-center">
                      <span className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      <span className="ml-2 text-black">Low</span>
                    </div>
                  </ListItem>
                    </div>
                  )}
                  
                </List>
              </div>
            )}
          </List>
        </Card>
      </div>
      <div className="flex-1 p-6">
        {activeLink === "dashboard" && <DashboardContent />}
        {activeLink === "assignTask" && <AssignTaskContent />}
        {activeLink === "addEmployees" && <AddEmployeesContent />}
      </div>
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h4 className="text-lg font-bold mb-4">Are you sure you want to logout?</h4>
            <div className="flex justify-around">
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700" onClick={handleCloseLogoutDialog}>Confirm Logout</button>
              <button className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-500" onClick={() => setShowLogoutDialog(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {userDetailDrawerOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[50vw]">
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h5" color="blue-gray">
                Edit Profile
              </Typography>
              <Button variant="text" color="red" onClick={handleCloseUserDetailDrawer}>
                Close
              </Button>
            </div>
            <div className="flex flex-col items-center mb-4">
              {imageLoading ? (
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-gray-400 h-24 w-24"></div>
                </div>
              ) : (
                <img
                  src="https://i.pravatar.cc/100"
                  alt="User Avatar"
                  className="rounded-full w-24 h-24 mb-4"
                  onLoad={() => setImageLoading(false)}
                  style={{ display: imageLoading ? 'none' : 'block' }}
                />
              )}
              <Button variant="outlined" className="mb-4">
                Upload new picture
              </Button>
              <Button variant="text" color="red">
                Delete Account
              </Button>
            </div>
            <div className="flex flex-col items-center w-full">
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 text-center">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-3/4 mx-auto rounded-md text-center border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={decodedToken.EmployeeName}
                  readOnly
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 text-center">Location</label>
                <input
                  type="text"
                  className="mt-1 block w-3/4 mx-auto rounded-md border-gray-300 text-center shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value="Ind"
                  readOnly
                />
              </div>
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-gray-700 text-center">Bio</label>
                <textarea
                  className="mt-1 block w-3/4 mx-auto rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  rows="3"
                  value=""
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

