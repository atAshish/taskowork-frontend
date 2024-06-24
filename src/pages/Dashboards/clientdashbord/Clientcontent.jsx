/* eslint-disable no-prototype-builtins */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chip, Typography, Button } from "@material-tailwind/react";
import { DefaultSkeleton } from "../../../components/skeleton/skeleton.jsx";
import { PencilSquareIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";
import Calendar from "../../../components/dashboard/Calender/Calender";
import { getTask } from "../../../service/api";
import { jwtDecode } from "jwt-decode";
import blips from "../../../assets/img/WhatsApp_Image_2024-05-26_at_11.49.25_AM-removebg-preview.png";
import { gsap } from "gsap";

const Clientcontent = () => {
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state

  const data = localStorage.getItem("AccessToken");
  let decodedToken = {};
  if (data) {
    decodedToken = jwtDecode(data);
  } else {
    console.error("Access Token not found in local storage");
  }

  const [tasks, SetTasks] = useState([]);
  const [openTasksCount, setOpenTasksCount] = useState(0);
  const [inProcessTasksCount, setInProcessTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [inReviewTasksCount, setInReviewTasksCount] = useState(0);

  // Example: Assuming you have a state or a way to fetch the blip points
  const blipPoints = decodedToken.Blip || "∞";
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await getTask({
        CompanyID: decodedToken.CompanyID,
        CompanyName: decodedToken.CompanyName,
        EmployeeID: decodedToken.EmployeeID,
      });
      const fetchedTasks = response.tasks;
      SetTasks(fetchedTasks);

      const statusCounts = {
        open: 0,
        inprogress: 0,
        completed: 0,
        inreview: 0, // Ensure this key matches the transformed TaskStatus
      };

      fetchedTasks.forEach((task) => {
        const status = task.TaskStatus.toLowerCase().trim();
        if (status === "review") {
          // Handle "Review" specifically if necessary
          statusCounts.inreview++;
        } else if (statusCounts.hasOwnProperty(status)) {
          statusCounts[status]++;
        } else {
          console.warn(`Unknown status: ${status}`);
        }
      });

      setOpenTasksCount(statusCounts.open);
      setInProcessTasksCount(statusCounts.inprogress);
      setCompletedTasksCount(statusCounts.completed);
      setInReviewTasksCount(statusCounts.inreview);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch or calculate blip points somewhere in your component
  // For example, you might fetch it from an API or calculate based on some logic
  useEffect(() => {
    // Fetch or calculate blip points here
    // setBlipPoints(fetchedOrCalculatedBlipPoints);
  }, []);

  const renderTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  

    const todaysTasks = tasks
      .filter(
        (task) =>
          new Date(task.createdAt).setHours(0, 0, 0, 0) === today.getTime()
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6); // Ensure up to six tasks are shown

    if (isLoading) {
      return (
        <div className="flex gap-4">
          <DefaultSkeleton variant="rectangular" className="w-full h-24" />
          <DefaultSkeleton variant="rectangular" className="w-full h-24" />
          <DefaultSkeleton variant="rectangular" className="w-full h-24" />
        </div>
      );
    }

    if (todaysTasks.length === 0) {
      return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold capitalize">
            No tasks assigned today.
          </h1>
          <p className="text-sm">Latest tasks will be displayed here.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden" >
       {todaysTasks.map((task, index) => {
        const descriptionWords = task.TaskDescription.split(" ");
        const displayedDescription =
          descriptionWords.length > 25
            ? `${descriptionWords.slice(0, 25).join(" ")}...`
            : task.TaskDescription;

        return (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="flex justify-between items-center gap-5">
              <div>
                <h1 className="text-xl font-semibold capitalize">
                  {task.EmployeeName}
                </h1>
              </div>
              <div className={`chip ${task.TaskStatus}`}>
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium capitalize ${
                    task.TaskStatus === "Open"
                      ? "bg-orange-200 text-orange-900"
                      : task.TaskStatus === "Inprogress"
                      ? "bg-purple-200 text-purple-900"
                      : task.TaskStatus === "Completed"
                      ? "bg-teal-200 text-teal-900"
                      : task.TaskStatus === "Review"
                      ? "bg-yellow-200 text-yellow-900"
                      : "bg-gray-200 text-gray-800" // Default case for unknown statuses
                  }`}
                >
                  {task.TaskStatus}
                </span>
              </div>
            </div>
            <hr className="my-2" />
            <p className="text-sm">{task.TaskTitle}</p>
            <div className="mt-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  task.TaskPriority === "Low"
                    ? "bg-green-200 text-green-800"
                    : task.TaskPriority === "Medium"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {new Date(task.TaskDeadlineDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        );
      })}
      </div>
    );
  };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todaysTasksCount = tasks.filter(
    (task) => new Date(task.createdAt).setHours(0, 0, 0, 0) === today.getTime()
  ).length;

  const chartData = {
    labels: ["Open", "In Process", "Completed", "In Review"],
    datasets: [
      {
        label: "Tasks",
        data: [
          openTasksCount,
          inProcessTasksCount,
          completedTasksCount,
          inReviewTasksCount,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#A1DD70", "#FFD700"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
          color: "#ebedef",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "rgb(255, 99, 132)",
        },
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (tooltipItem) {
            let label = tooltipItem.dataset.label || "";
            if (label) {
              label += ": ";
            }
            label += tooltipItem.raw;
            return label;
          },
        },
      },
    },
    animation: {
      duration: 2000,
    },
  };

  const blipRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      blipRef.current,
      { boxShadow: "0 0 0px rgba(255,255,255,0)" },
      {
        boxShadow: "0 0 20px rgba(255,255,255,1)",
        repeat: -1,
        yoyo: true,
        duration: 0.5,
        ease: "power1.inOut",
        paused: true,
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center m-5 sm:gap-5 md:flex-col">
      <div className="lg:grid auto-rows-auto grid-cols-3 lg:gap-2 h-[82vh] sm:flex sm: gap-5 md:flex-col">
        <div className="rounded-xl border-2 border-slate-400/10 bg-white p-4 dark:bg-neutral-900 col-span-2 shadow-neoout flex-col gap-1 flex">
          <div className="flex flex-col">
            <div className="flex justify-between pb-3">
              <div className="flex gap-4 items-center">
                <span className=" p-2 rounded-lg">
                  <PencilSquareIcon className="w-6 h-6 text-black" />
                </span>
                <Typography
                  variant="h2"
                  color="blue-gray"
                  className="text-xl font-bold"
                >
                  Today's Tasks
                </Typography>
              </div>
              <Button variant="outlined" className="text-sm">
                Total Tasks ({tasks.length})
              </Button>
            </div>
            <hr className="my-2" />
            <div className="flex gap-4 mt-4 justify-center">
              {renderTasks()}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <div className="bg-black mt-5 rounded-xl w-full p-4 text-white shadow-neoout">
              <h1 className="text-center text-lg font-semibold">
                {todaysTasksCount > 0 ? (
                  <>
                    💬 You have {todaysTasksCount} tasks today. Keep it up! 💪
                  </>
                ) : (
                  <>You have {tasks.length} active tasks in total.</>
                )}
              </h1>
            </div>
          </div>
        </div>
        <div className="rounded-xl border-2 border-slate-400/20 bg-transparent p-4 dark:bg-neutral-900  shadow-neoout ">
          <div className="mt-4 ">
            <div className="flex justify-center items-center gap-2 mb-5">
              <h1 className=" text-center text-2xl font-bold capitalize">
                calendar
              </h1>
              <CalendarDaysIcon className="w-6 h-6 "></CalendarDaysIcon>
            </div>
            <hr />
            <div className="  p-6  bg-transparent text-black">
              <Calendar
                onChange={setDate}
                value={date}
                className="w-full rounded-lg p-2"
                tileClassName={({ date, view }) => {
                  // Apply black and white theme based on the date
                  const isToday =
                    view === "month" && date.getDate() === new Date().getDate();
                  const hasTask = tasks.some(
                    (task) =>
                      new Date(task.createdAt).setHours(0, 0, 0, 0) ===
                      date.getTime()
                  );
                  return isToday
                    ? "bg-black text-white rounded-full"
                    : hasTask
                    ? "bg-green-500 text-white rounded-full"
                    : "text-black";
                }}
              />
            </div>
          </div>
        </div>
        <div className="rounded-xl border-2 border-slate-400/10 bg-white p-4 dark:bg-neutral-900 col-span-2 mb-10 shadow-neoout">
          <Typography
            variant="h2"
            color="blue-gray"
            className="text-center mb-6 flex justify-center items-center gap-2"
          >
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full animate-bounce"></span>
            <span className="inline-block w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-bounce"></span>
            Task Overview
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-bounce"></span>
            <span className="inline-block w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full animate-bounce"></span>
          </Typography>
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="text-sm text-gray-700">Open</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
                <span className="text-sm text-gray-700">In Process</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="text-sm text-gray-700">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span className="text-sm text-gray-700">In Review</span>
              </div>
            </div>
          </div>
          <div className="h-80 w-full flex justify-center">
            {isLoading ? (
              <DefaultSkeleton variant="" className="w-full h-full" />
            ) : (
              <>
                <Bar data={chartData} options={chartOptions} />
              </>
            )}
          </div>
        </div>
        <div className="rounded-xl border border-gray-300 bg-white p-6 dark:bg-neutral-900  shadow-neoout">
          <h2 className="text-2xl text-blue-gray-800 dark:text-blue-gray-200 text-center mb-4 font-bold">
            BLIPS
          </h2>
          <hr />
          <div className="flex flex-col items-center">
            <div className="flex justify-center items-center mb-4 h-3/4 relative ">
              <img
                ref={blipRef}
                src={blips}
                alt="Blip Points"
                className="w-fit cursor-pointer hover:animate-spin h-24 rounded-full border-gray-300 transition-transform duration-500"
                onMouseEnter={() =>
                  gsap.to(blipRef.current, {
                    boxShadow: "0 0 20px rgba(255,255,255,1)",
                    scale: 1.1,
                  })
                }
                onMouseLeave={() =>
                  gsap.to(blipRef.current, {
                    boxShadow: "0 0 0px rgba(255,255,255,0)",
                    scale: 1,
                  })
                }
              />
            </div>
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 rounded-lg shadow-lg text-center w-3/4 h-3/6 relative bottom-1 ">
              <p className="text-sm">Total Coins</p>
              <div className="flex items-center justify-center">
                <span className="text-4xl font-bold">{blipPoints}</span>
                <img
                  src={blips}
                  alt="Blip Icon"
                  className="w-10 h-9 ml-2 animate-pulse"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Clientcontent;
