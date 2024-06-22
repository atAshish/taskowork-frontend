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
import logo from "../../assets/img/WhatsApp_Image_2024-05-19_at_3.23.09_PM__1_-removebg-preview.png";
ChartJS.register(BarElement, CategoryScale, LinearScale);

const DashboardContent = () => {
  return (
    <div>
      <Clientcontent />
    </div>
  );
};

const AssignTaskContent = () => {
  return (
    <div>
      <Assigntask />
    </div>
  );
};

const AddEmployeesContent = () => {
  return (
    <div>
      <AddEmploye />
    </div>
  );
};

const ClientDashboard = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const labelDropdownRef = useRef(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [activeLink, setActiveLink] = useState("dashboard");
  const [showMenu, setShowMenu] = useState(true);
  const [showLabelDropdown, setShowLabelDropdown] = useState(false);
  const startDayRef = useRef(null);
  const [userDetailDrawerOpen, setUserDetailDrawerOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const handIconRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [flag, setFlag] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://ip-api.com/json');
        const data = await response.json();

        if (data.status === 'success') {
          const countryCode = data.countryCode.toLowerCase();
          const flagUrl = `https://restcountries.com/v3.1/alpha/${countryCode}`;
          setFlag(flagUrl);
          setLocation(data.country);
        } else {
          console.error('Failed to fetch location data');
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchData();
  }, []);



  let data = localStorage.getItem("AccessToken");
  let decodedToken = jwtDecode(data);
  console.log(decodedToken);
useEffect(()=>{
  if (decodedToken.EmployeeRole !== "Admin") {
    navigate("/Login") // Show access denied popup if clientId is not "Admin"
  }
},[])
  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleCloseLogoutDialog = () => {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("remindDelete");

    setShowLogoutDialog(false);
    navigate("/Login");
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowLabelDropdown(false);
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 100 * 1024) {
        setUploadError("File size should be less than 100KB");
        return;
      }
      setUploadError("");
      setSelectedFile(file);
      setUploadingImage(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex bg-white overflow-hidden">
      <div className="flex flex-col">
        <Card className="h-[calc(100vh-0.5rem)] w-full lg:flex max-w-[25rem] p-4  gap-4 sm:hidden border-r-8 border-gradient-r from-black via-gray-300 to-transparent  rounded-none">
          <div className="mb-2 p-4">
            <img src={logo} alt="Logo" />
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
          <div className="mb-4 p-4 flex-col items-center bg-blue-gray-50 rounded-lg justify-between cursor-pointer">
            <div className="flex items-center bg-blue-gray-50 justify-between cursor-pointer w-full">
              <div className="flex items-center">
                <Avatar
                  src="https://i.pravatar.cc/100"
                  alt="Client Avatar"
                  className="mr-4 w-16 h-16 border-2 border-blue-gray-300"
                />
                <div>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="text-2xl font-bold"
                  >
                    {decodedToken.EmployeeName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="blue-gray"
                    className="text-sm"
                  >
                    {decodedToken.EmployeeRole}
                  </Typography>
                </div>
              </div>
              <Tooltip content="View Details" placement="right">
                <span className="bg-black text-white p-3 rounded-full">
                  <ChevronRightIcon
                    className="h-6 w-6 text-blue-gray-50"
                    ref={handIconRef}
                    onClick={handleUserDetailClick}
                  />
                </span>
              </Tooltip>
            </div>
            <div className="flex w-full mt-4">
              <Button
                variant="filled"
                color="red"
                className="flex justify-center items-center gap-2 py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition-colors"
                onClick={handleLogoutClick}
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 text-white" />
                <span className="text-white font-medium">Log Out</span>
              </Button>
            </div>
          </div>
          <List>
            <ListItem
              className="cursor-pointer p-2 hover:bg-gray-50 flex justify-between items-center"
              onClick={toggleMenu}
            >
              <span className="text-black">Menu</span>
              {showMenu ? (
                <ChevronUpIcon className="h-5 w-5 text-black" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-black" />
              )}
            </ListItem>
            {showMenu && (
              <div className="bg-white rounded-lg">
                <List>
                  <ListItem
                    className={`cursor-pointer p-2 hover:bg-gray-50 ${
                      activeLink === "dashboard" ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleLinkClick("dashboard")}
                  >
                    <ListItemPrefix>
                      <PresentationChartBarIcon className="h-5 w-5 text-black" />
                    </ListItemPrefix>
                    <span className="ml-2 text-black">Dashboard</span>
                  </ListItem>
                  <ListItem
                    className={`cursor-pointer p-2 hover:bg-gray-50 ${
                      activeLink === "assignTask" ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleLinkClick("assignTask")}
                  >
                    <ListItemPrefix>
                      <RectangleStackIcon className="h-5 w-5 text-black" />
                    </ListItemPrefix>
                    <span className="ml-2 text-black">Assign Task</span>
                  </ListItem>
                  <ListItem
                    className={`cursor-pointer p-2 hover:bg-gray-50 ${
                      activeLink === "addEmployees" ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleLinkClick("addEmployees")}
                  >
                    <ListItemPrefix>
                      <UserPlusIcon className="h-5 w-5 text-black" />
                    </ListItemPrefix>
                    <span className="ml-2 text-black">Add Employees</span>
                  </ListItem>
                </List>
              </div>
            )}
            <ListItem
              className="cursor-pointer p-2 hover:bg-gray-50 flex justify-between"
              onClick={toggleLabelDropdown}
            >
              <ListItemPrefix>
                <span className="text-black">Labels</span>
              </ListItemPrefix>
              {showLabelDropdown ? (
                <ChevronUpIcon className="h-5 w-5 text-black" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-black" />
              )}
            </ListItem>
            {showLabelDropdown && (
              <div className="bg-white rounded-lg">
                <List>
                  <ListItem className="cursor-pointer p-2 hover:bg-gray-50">
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
            <h4 className="text-lg font-bold mb-4">
              Are you sure you want to logout?
            </h4>
            <div className="flex justify-around">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={handleCloseLogoutDialog}
              >
                Confirm Logout
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => setShowLogoutDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {userDetailDrawerOpen && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-[50vw] max-w-lg">
      <div className="bg-gradient-to-r from-blue-gray-400 to-gray-900 py-4 px-6 rounded-t-lg flex items-center justify-between">
        <h2 className="text-white text-xl font-semibold">My Profile</h2>
        <button
          className="text-white hover:text-gray-300 focus:outline-none"
          onClick={handleCloseUserDetailDrawer}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      {/* Profile Content */}
      <div className="p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            {/* {imageLoading ? (
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-400 h-24 w-24"></div>
              </div>
            ) : (
              <img
                src={previewUrl || "https://i.pravatar.cc/100"}
                alt="User Avatar"
                className="rounded-full w-24 h-24 border-2 border-gray-300"
                onLoad={() => setImageLoading(false)}
                style={{ display: imageLoading ? "none" : "block" }}
              />
            )} */}
            <img
                src={previewUrl || "https://i.pravatar.cc/100"}
                alt="User Avatar"
                className="rounded-full w-24 h-24 border-2 border-gray-300"
                onLoad={() => setImageLoading(false)}
                style={{ display: imageLoading ? "none" : "block" }}
              />
        <span className="absolute bottom-1 right-1 w-5 h-5 z-30 bg-green-500 rounded-full" />

           
          </div>
          {uploadError && <div className="text-red-500 mt-2">{uploadError}</div>}
          {uploadingImage && (
            <div className="flex items-center justify-center mt-4">
              <svg
                className="animate-spin h-5 w-5 text-indigo-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                ></path>
              </svg>
            </div>
          )}
        </div>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-1">
            {decodedToken.EmployeeName}
          </h3>
          <p className="text-gray-600 mb-2">{decodedToken.EmployeeRole}</p>
          <p className="text-gray-600 mb-2">{decodedToken.EmployeeID}</p>
          <div className="text-center mb-6">
        {/* {flag && <img src={flag} alt="Country Flag" className="h-8 inline-block mr-2" />} */}
        <p className="text-gray-600 inline-block">Location: {location}</p>
      </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-600">
          {decodedToken.EmployeeEmail}
          </p>
        </div>
        <label className="bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer flex justify-center ">
              <input type="file" className="hidden" onChange={handleFileChange}  />
                UPLOAD
            </label>
        {/* <div className="flex justify-center">
          <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none">
            Edit Profile
          </button>
        </div> */}
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ClientDashboard;
