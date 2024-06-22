import { Typography } from "@material-tailwind/react";
import {
  BeakerIcon,
  CameraIcon,
  ChevronDoubleLeftIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline"; // Replace these with the appropriate icons

export function FooterWithLogo() {
  return (
    <footer className="w-full bg-black p-8 mt-24 relative bottom-0">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
        <div className="flex items-center justify-center md:justify-start gap-4">
          <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="logo-ct" className="w-10 invert" />
          <Typography color="white" className="text-xl font-semibold">
            Taskowork
          </Typography>
        </div>
        <ul className="flex flex-wrap items-center justify-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              License
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contribute
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
        <div className="flex items-center justify-center gap-4">
          <a href="#" className="text-white hover:text-blue-500 transition-colors">
            <BeakerIcon className="h-6 w-6" />
          </a>
          <a href="#" className="text-white hover:text-blue-500 transition-colors">
            <CameraIcon className="h-6 w-6" />
          </a>
          <a href="#" className="text-white hover:text-blue-500 transition-colors">
            <ChevronDoubleLeftIcon className="h-6 w-6" />
          </a>
          <a href="#" className="text-white hover:text-blue-500 transition-colors">
            <DocumentDuplicateIcon className="h-6 w-6" />
          </a>
        </div>
      </div>
      <hr className="my-8 border-gray-50" />
      <Typography color="white" className="text-center font-normal">
        &copy; 2024 Taskowork. All Rights Reserved.
      </Typography>
    </footer>
  );
}
