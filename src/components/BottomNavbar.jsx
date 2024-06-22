/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

// BottomNavBar.js

const BottomNavBar = ({ activeLink, setActiveLink }) => {
const navigate = useNavigate();
const handleLogoutClick = () => {
    localStorage.removeItem('AccessToken');
    navigate('/Login');
  };
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-blue-gray-800 text-white p-4">
      <ul className="flex justify-around">
        <li onClick={() => setActiveLink('dashboard')}>
          <a href="#" className={`cursor-pointer ${activeLink === 'dashboard'? 'border-b-2 border-white' : ''}`}>
            Dashboard
          </a>
        </li>
        <li onClick={() => setActiveLink('assign-task')}>
          <a href="#" className={`cursor-pointer ${activeLink === 'assign-task'? 'border-b-2 border-white' : ''}`}>
            Assign Task
          </a>
        </li>
        <li onClick={() => setActiveLink('add-employees')}>
          <a href="#" className={`cursor-pointer ${activeLink === 'add-employees'? 'border-b-2 border-white' : ''}`}>
            Add Employees
          </a>
        </li>
        <li onClick={handleLogoutClick}>
          <a href="#" className="cursor-pointer">Log Out</a>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNavBar;
