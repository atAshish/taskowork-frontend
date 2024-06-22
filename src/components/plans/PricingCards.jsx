/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-3 w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

export function PricingCard({ color, title, price, duration, features }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("AccessToken");
    setIsLoggedIn(!!accessToken);
  }, []);

  const toggleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleBuyNow = () => {
    if (isLoggedIn) {
      // Handle buy plan logic
    } else {
      toggleDialog();
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
    toggleDialog();
  };

  return (
    <>
      <Card color={color} variant="gradient" className="w-full max-w-[20rem] p-8 mt-16">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
        >
          <Typography
            variant="small"
            color="white"
            className="font-normal uppercase"
          >
            {title}
          </Typography>
          <Typography
            variant="h1"
            color="white"
            className="mt-6 flex justify-center gap-1 text-7xl font-normal"
          >
            <span className="mt-2 text-4xl">₹</span>{price}{" "}
            <span className="self-end text-4xl">/{duration}</span>
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
          <ul className="flex flex-col gap-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-4">
                <span className="rounded-full border border-white/20 bg-white/20 p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">{feature}</Typography>
              </li>
            ))}
          </ul>
        </CardBody>
        <CardFooter className="mt-12 p-0">
          <Button
            size="lg"
            color="white"
            className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            ripple={false}
            fullWidth={true}
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </CardFooter>
      </Card>

      {openDialog && (
        <Dialog open={openDialog} handler={toggleDialog} size="xs" className="bg-white rounded-lg shadow-lg p-8">
          <DialogHeader className="flex items-center justify-between p-4 border-b border-gray-200">
            <Typography variant="h5" color="blue-gray">
              Login Required
            </Typography>
            <Button
              variant="text"
              color="blue-gray"
              onClick={toggleDialog}
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </DialogHeader>
          <DialogBody className="p-4">
            <Typography>
              You need to be logged in to buy a plan. Please log in first.
            </Typography>
          </DialogBody>
          <DialogFooter className="flex justify-center p-4">
            <Button
              variant="gradient"
              size="lg"
              className="w-full rounded-lg py-3 bg-black"
              onClick={navigateToLogin}
            >
              Log In
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </>
  );
}
