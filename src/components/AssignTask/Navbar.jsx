import { Input } from "@material-tailwind/react";
import { MailIcon, BellIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <Input
        type="text"
        color="black"
        placeholder="Search task"
        className="bg-gray-100 focus:outline-none w-96 px-4 py-2"
        style={{ borderRadius: '0.5rem' }}
      />
      <div className="flex items-center gap-4">
        <div className="relative">
          <MailIcon className="h-6 w-6 text-gray-600" />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
        </div>
        <div className="relative">
          <BellIcon className="h-6 w-6 text-gray-600" />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;