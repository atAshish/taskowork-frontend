/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
 Card,
 CardHeader,
 CardBody,
 CardFooter,
 Typography,
} from "@material-tailwind/react";

export function CardDefault(props) {
 // Accessing props
 const { imageUrl, title, description } = props;

 return (
    <Card className="mt-6 w-96">
      <CardHeader color="white" className="relative max-h-96">
        <img
          src={imageUrl} // Using the imageUrl prop
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography>
          {description} 
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
      </CardFooter>
    </Card>
 );
}
