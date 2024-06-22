import { Button } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
const Hero = () => {
 return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-center min-h-screen mb-5 gap-16 sm:flex-col">
      <div className="flex flex-col justify-center text-center lg:text-left">
        <h1 className="text-4xl lg:text-7xl font-bold text-black   mt-4">
          SIMPLIFY TASKS,
        </h1>
        <h1 className="text-4xl lg:text-7xl font-bold text-black">
          MAXIMIZE
        </h1>
        <h1 className="text-4xl lg:text-7xl font-bold text-black">IMPACT WITH</h1>
        <h1 className="text-4xl lg:text-7xl font-bold text-black">TASKOWORK!</h1>
        <div className="mt-5">
          <p className="text-gray-900 ">Take charge of your workflow, stay organized, and achieve</p>
          <p className="text-gray-900 mt-2">unparalleled productivity with our task management software.</p>
        </div>
          <div className="text-center">
          <NavLink to={"/Plans"}>
        <Button variant="filled" className="mt-5 w-60 lg:w-full text-center">Get A Demo</Button>
          </NavLink>
          </div>
      </div>
      <div className="mt-5 lg:mt-0">
        <div className="flex justify-center">
          <img
            className="w-full max-w-lg grayscale"
            src="https://i.ibb.co/8K6VNVB/task-o-work-image.png"
            alt="Hero Image"
          />
        </div>
      </div>
    </div>
 );
};

export default Hero;
