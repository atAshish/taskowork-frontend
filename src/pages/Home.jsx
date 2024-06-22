import Hero from "../components/Hero";
import { StickyNavbar } from "../components/Navbar";
import { FooterWithLogo } from "../components/Footer";
import { DefaultGallery } from "../components/Imagegallery";
import { CardDefault } from "../components/features";
import { TabsDefault } from "../components/Tabs";

const Home = () => {
  return (
    <>
      <div data-scroll className="flex justify-center sticky top-0 z-50">
        <div className="w-screen ">
          <StickyNavbar />
        </div>
      </div>
      <Hero />
      <div className="flex justify-center sm: mt-10">
        <div className="w-screen h-screen lg:mt-4 sm:mt-2">
          <h1 className="text-4xl lg:text-7xl  text-center">OUR CLIENTS</h1>
          <div className="flex justify-center mt-9 h-3/4 items-center gap-12 overflow-hidden">
            <div className="lg: w-2/4 sm:w-1/3 ">
              <DefaultGallery />
            </div>
          </div>
        </div>
      </div>
      <div className="flex lg:w-screen justify-center items-center flex-col gap-12  h-max">
        <h1 className="text-4xl lg:text-7xl text-center">
          Take work from{" "}
          <span className=" bg-black rounded-2xl text-white p-3">chaos</span> to
          control
        </h1>
        <div className=" gap-9 mt-9  w-screen h-max  justify-center items-center hidden lg:flex  ">
          <CardDefault
            description="Simplify your workload with our task management tool, ensuring organized task lists that enhance productivity. Achieve more in less time, as you effortlessly manage tasks and drive success."
            title="Task List"
            imageUrl="https://cdn.taskopad.com/user/themes/quark/images/features/tasklist.webp"
          />
          <CardDefault
            description="Elevate project collaboration with our comprehensive project management solutions, fostering seamless communication and efficient task allocation. Empower teams to work together cohesively, achieving project milestones with precision."
            title="Project Management"
            imageUrl="https://cdn.taskopad.com/user/themes/quark/images/features/project.webp"
          />
          <CardDefault
            description="sharing through TaskOpad's chat discussions feature. Seamlessly exchange thoughts, brainstorm, and drive projects forward with real-time collaboration and insightful conversations"
            title="Chat Discussions"
            imageUrl="https://cdn.taskopad.com/user/themes/quark/images/features/chat.webp"
          />
        </div>

        <div className=" gap-9 mt-9  w-screen h-max  justify-center items-center flex-col lg:hidden  ">
          <CardDefault
            description="Simplify your workload with our task management tool, ensuring organized task lists that enhance productivity. Achieve more in less time, as you effortlessly manage tasks and drive success."
            title="Task List"
            imageUrl="https://cdn.taskopad.com/user/themes/quark/images/features/tasklist.webp"
          />
          <CardDefault
            description="Elevate project collaboration with our comprehensive project management solutions, fostering seamless communication and efficient task allocation. Empower teams to work together cohesively, achieving project milestones with precision."
            title="Project Management"
            imageUrl="https://cdn.taskopad.com/user/themes/quark/images/features/project.webp"
          />
          <CardDefault
            description="sharing through TaskOpad's chat discussions feature. Seamlessly exchange thoughts, brainstorm, and drive projects forward with real-time collaboration and insightful conversations"
            title="Chat Discussions"
            imageUrl="https://cdn.taskopad.com/user/themes/quark/images/features/chat.webp"
          />
        </div>
      </div>
      <section className="flex flex-col h-screen  items-center gap-5 lg:gap-40 mt-20 lg:mt-5 mb-5">
            <div className="flex flex-col text-center mt-8 lg:mt-9">
                <h1 className="text-xl lg:text-7xl ">A Task Management Tool Built For Every</h1>
                <h1 className="text-xl lg:text-7xl ">Business & Every Team.</h1>
            </div>
            <div className="w-full lg:w-3/5  ">
            <TabsDefault/>
            </div>
        </section>

      <FooterWithLogo />
    </>
  );
};

export default Home;
