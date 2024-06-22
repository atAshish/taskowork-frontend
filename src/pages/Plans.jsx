/* eslint-disable react/no-unescaped-entities */
import StickyNavbar from "../components/Navbar";
import { FooterWithLogo } from "../components/Footer";
import { PricingCard } from "../components/plans/PricingCards";

const Plans = () => {
  return (
    <>
      <nav><StickyNavbar /></nav>
      <div className="flex flex-col items-center justify-center gap-8 mt-16 mb-8">
        <div className="w-4/5 lg:w-1/2 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Pricing And <span className="p-2 text-white bg-black rounded-lg">Plans...</span>
          </h1>
          <p className="text-sm lg:text-lg text-gray-600">
            Welcome to Taskowork! We're thrilled to present a variety of pricing plans tailored to your requirements, whether you're an individual seeking organization or a team aiming for heightened collaboration and productivity. Taskowork brings you seamless task management, streamlined project planning, and impactful communication, all within a user-friendly platform.
          </p>
        </div>
      </div>
      <div className="w-screen flex flex-col lg:flex-row justify-center items-center gap-8 mt-5 lg:mt-10 px-4">
        <PricingCard 
          color="green"
          title="Free Trial"
          price="0"
          duration="15 days"
          features={[
            "Up to 5 users",
            "200+ components",
            "1 year free updates",
            "Lifetime technical support"
          ]}
        />
        <PricingCard 
          color="blue-gray"
          title="Standard"
          price="5000"
          duration="30 days"
          features={[
            "Up to 20 users",
            "200+ components",
            "1 year free updates",
            "Lifetime technical support"
          ]}
        />
      </div>
      <footer className="mt-16"><FooterWithLogo /></footer>
    </>
  )
}

export default Plans;
