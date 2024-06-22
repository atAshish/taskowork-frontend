/* eslint-disable react/no-unescaped-entities */
import  { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StickyNavbar from '../components/Navbar';
import { FooterWithLogo } from '../components/Footer';
import { Input, Button, Checkbox, Select, Option, Textarea } from '@material-tailwind/react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    subject: '',
    message: '',
    industry: '',
    isChecked: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your form submission logic goes here
    console.log(formData);
    toast.success('Form submitted successfully!');
    // Reset form data after successful submission
    setFormData({
      name: '',
      email: '',
      mobileNumber: '',
      subject: '',
      message: '',
      industry: '',
      isChecked: false,
    });
  };

  return (
    <>
      <nav>
        <StickyNavbar />
      </nav>
      <div className="flex justify-center mt-10  h-screen">
        <div className="w-full md:max-w-2xl px-4 flex-col ">
          <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
          <form onSubmit={handleSubmit} className="shadow-lg p-6 mb-8 mt-8 bg-white flex-col gap-4 lg:gap-8 flex mb  ">
            <div className="mb-4">
              <Input
                label="Name"
                name="name"
                placeholder="Enter name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Email address"
                name="email"
                placeholder="Enter email"
                required
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <small className="text-gray-500">We'll never share your email with anyone else.</small>
            </div>
            <div className="mb-4">
              <Input
                label="Mobile Number"
                name="mobileNumber"
                placeholder="Enter number"
                required
                type="number"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Subject"
                name="subject"
                placeholder="Subject"
                required
                value={formData.subject}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Textarea
                label="Message"
                name="message"
                placeholder="Enter your message"
                required
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Select
                label="Your Industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              >
                <Option value="">Please choose your Industry</Option>
                <Option value="Retail">Retail</Option>
                <Option value="IT">IT</Option>
                <Option value="Service">Service</Option>
                <Option value="Marketing">Marketing</Option>
              </Select>
            </div>
            <div className="mb-4 flex items-center">
              <Checkbox
                name="isChecked"
                checked={formData.isChecked}
                onChange={handleChange}
              />
              <label htmlFor="isChecked" className="ml-2">
                Check me out
              </label>
            </div>
            <div className="text-center">
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
      <footer>
        <FooterWithLogo />
      </footer>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Contact;