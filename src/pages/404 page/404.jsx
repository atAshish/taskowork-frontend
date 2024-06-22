import { Button, Typography } from '@material-tailwind/react';
import { NavLink } from 'react-router-dom';
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-8">
          <Typography variant="h1" className="mb-4 text-black">
            404
          </Typography>
          <Typography variant="h4" className="text-center text-gray-800">
            Oops! Page Not Found
          </Typography>
        </div>
        <Typography variant="paragraph" className="mb-8 text-center text-gray-600">
          The page you are looking for does not exist or has been moved. Please check the URL or go back to the homepage.
        </Typography>
        <div className="flex justify-center">
          <NavLink to={"/"}>
          <Button variant="gradient" className="bg-indigo-500 hover:bg-indigo-600">
            Go to Homepage
          </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;