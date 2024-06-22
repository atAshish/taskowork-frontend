/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef,useMemo } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { gsap } from "gsap";
import {
  Chip,
  Input,
  Button,
  Avatar,
  Select,
  Option,
} from "@material-tailwind/react"; // Import Input from Material Tailwind
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sound from "../../../assets/sound/stop-13692.mp3";
import blips from "../../../assets/img/WhatsApp_Image_2024-05-26_at_11.49.25_AM-removebg-preview.png";
import {
  AdjustmentsHorizontalIcon,
  PlusIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/solid";
import CreatableSelect from "react-select/creatable"; // Import CreatableSelect
import { jwtDecode } from "jwt-decode";
import {
  createTask,
  getTask,
  getEmployeeList,
  deleteTask,
  updateTaskStatus,
} from "../../../service/api";
// import outlined from "@material-tailwind/react/theme/components/timeline/timelineIconColors/outlined";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";

const data = localStorage.getItem("AccessToken");
let decodedToken = {};
if (data) {
  decodedToken = jwtDecode(data);
} else {
  console.error("Access Token not found in local storage");
}

const initialData = {
  columns: {
    Open: { id: "Open", title: "Open", taskIds: [] },
    "In Progress": { id: "In Progress", title: "In Progress", taskIds: [] },
    Review: { id: "Review", title: "Review", taskIds: [] },
    Completed: { id: "Completed", title: "Completed", taskIds: [] },
    Deleted: { id: "Deleted", title: "Deleted", taskIds: [] },
  },
  tasks: {},
  columnOrder: ["Open", "In Progress", "Review", "Completed", "Deleted"],
};

// const initialData = {
//   columns: {
//     Open: { id: "Open", title: "Open", taskIds: ["task-1"] },
//     "In Progress": { id: "In Progress", title: "In Progress", taskIds: ["task-2","task-3"] },
//     Review: { id: "Review", title: "Review", taskIds: [] },
//     Completed: { id: "Completed", title: "Completed", taskIds: [] },
//     Deleted: { id: "Deleted", title: "Deleted", taskIds: [] },
//   },
//   tasks: {
//     "task-1": {
//       id: "task-1",
//       title: "Demo Task",
//       username: "billy jean",
//       EmployeeName: "billy jean",
//       text: "This is a demo task description.",
//       department: "lopment",
//       priority: "High",
//       daysLeft: 5,
//       tags: ["urgent", "new"],
//       image: "path_to_image",
//     },
//     "task-2": {
//       id: "task-2",
//       title: "Demo Task",
//       username: "John Doe",
//       text: "This is a demo task description.",
//       department: "Development",
//       priority: "High",
//       daysLeft: 5,
//       tags: ["urgent", "new"],
//       image: "path_to_image",
//     },
//     "task-3": {
//       id: "task-3",
//       title: "Demo Task",
//       username: "John Doe",
//       text: "This is a demo task description.",
//       department: "Development",
//       priority: "High",
//       daysLeft: 5,
//       tags: ["urgent", "new"],
//       image: "path_to_image",
//     },

//   },
//   columnOrder: ["Open", "In Progress", "Review", "Completed", "Deleted"],
// };
// Dependency array to re-run the effect when CompanyID changes
function mapStatusToColumnId(apiStatus) {
  const statusMapping = {
    Inprogress: "In Progress",  // API status to your column ID
    Open: "Open",
    Review: "Review",
    Completed: "Completed",
    Deleted: "Deleted"
  };

  return statusMapping[apiStatus] || "Unknown";  // Default to "Unknown" if no match found
}

const handleMarkAsCompleted = (taskId) => {
  console.log(taskId, "hello");
  // updateTaskStatus(
  //   decodedToken.CompanyID,
  //   decodedToken.CompanyName,
  //   taskId.TaskID,
  //   taskId.AssignedTo,
  //   "completed"
  // );
  console.log(taskId);
  console.log(`Marking task ${taskId} as completed`);
  // Assuming there's a way to update the task status on the server
  // You might need to call an API endpoint here
  toast.success("Task marked as completed!");
};

function Draggable({
  id,
  title,
  username,
  text,
  searchQuery,
  isDeleted,
  className,
  image,
  tags,
  daysLeft,
  department,
  priority,
}) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });
  const cardRef = useRef(null);
  // useEffect(() => {
  //   if (cardRef.current) {
  //     gsap.fromTo(
  //       cardRef.current,
  //       { opacity: 0, y: 50 },
  //       { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
  //     );
  //   }
  // }, []);

  useEffect(() => {
    if (searchQuery && text.toLowerCase().includes(searchQuery.toLowerCase())) {
      setIsAccordionOpen(true);
    }
  }, [searchQuery, text]);

  const toggleAccordion = (event) => {
    event.stopPropagation(); // Prevent event from propagating to other handlers
    setIsAccordionOpen((prevState) => !prevState);
  };

  const openDrawer = (event) => {
    event.stopPropagation(); // Prevent event from propagating to the accordion toggle
    setIsDrawerOpen(true);
  };

  const closeDrawer = (event) => {
    event.stopPropagation(); // Prevent event from propagating to the accordion toggle
    setIsDrawerOpen(false);
  };

  const highlightText = (text) => {
    if (!searchQuery) return text;

    const regex = new RegExp(`(${searchQuery})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Apply draggable attributes conditionally
  const draggableProps = isDrawerOpen ? {} : { ...listeners, ...attributes };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "#FF0000";
      case "Medium":
        return "#FFF455";
      case "Low":
        return "#06D001";
      default:
        return "bg-gray-500";
    }
  };

  const getDepartmentColor = (department) => {
    switch (department) {
      case "Client Relations":
        return "bg-blue-500";
      case "Design":
        return "bg-pink-500";
      case "Optimization":
        return "bg-purple-500";
      case "Development":
        return "bg-teal-500";
      case "Quality Assurance":
        return "bg-orange-500";
      case "Technical Support":
        return "bg-indigo-500";
      case "Operations":
        return "bg-gray-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div
      ref={(el) => {
        setNodeRef(el);
        cardRef.current = el;
      }}
      className={`bg-white shadow-md rounded-md p-6 mb-6 ${className} relative`} // Increased padding and margin
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : "",
        userSelect: "none",
      }}
      {...draggableProps}
    >
    <div
  className={`absolute left-0 top-0 bottom-0 w-1`}
  style={{ backgroundColor: getPriorityColor(priority) }}
></div>
      <div
        className="flex justify-between items-center cursor-pointer"
        onDoubleClick={toggleAccordion} // Changed from onClick to onDoubleClick
      >
        <div className="flex items-center">
          {/* <Avatar src={image} alt={username} size="sm" className="mr-2" /> */}
          <h4 className="text-red mb-2">
            {title}{" "}
            <Chip
              variant="gradient"
              size="sm"
              color="white"
              value={username}
              className="w-min"
            ></Chip>
          </h4>
        </div>
        <span>{isAccordionOpen ? "-" : "+"}</span>
      </div>
      {isAccordionOpen && (
        <div className="text-sm text-gray-600 mb-2">
          <p className="text-gray-800">
            {highlightText(text.length > 40 ? `${text.slice(0, 28)}...` : text)}
          </p>
        
          <p className="text-gray-500 mt-2">{daysLeft} days left</p>
          <Chip
            size="sm"
            color="white"
            value={department}
            className={`w-min ${getDepartmentColor(department)}`}
          />
          <button
            onDoubleClick={openDrawer}
            className="text-blue-500 underline mt-2"
          >
            View More
          </button>
        </div>
      )}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full mx-4 overflow-y-auto max-h-[80vh]">
            <div className="flex justify-between items-center bg-gray-100 p-4">
              <h4 className="text-lg font-semibold">{title}</h4>
              <button
                onClick={closeDrawer}
                className="text-gray-600 hover:text-gray-800"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 prose max-w-none">
              <div className="flex items-center mb-2">
                {/* <Avatar src={image} alt={username} size="sm" className="mr-2" /> */}
                <span className="text-gray-700 font-semibold">{username}</span>
              </div>
              <div className=" ">
                <h1>Description</h1>
                <p
                  className="text-gray-800 text-sm mb-4 whitespace-pre-wrap flex"
                  style={{ wordWrap: "break-word", whiteSpace: "normal" }}
                >
                  {text}
                </p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Department:</span>
                  <Chip
                    size="sm"
                    color="white"
                    value={department}
                    className={`w-min ${getDepartmentColor(department)}`}
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Priority:</span>
                  <Chip
                    size="sm"
                    color="white"
                    value={priority}
                    className={`w-min ${getPriorityColor(priority)}`}
                  />
                </div>
              </div>
              <div className="flex gap-5 items-center">
                <span className="text-gray-600">Days Left:</span>
                <span className="text-gray-800 font-semibold">{daysLeft}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Droppable({ id, children, data, clearDeletedTasks }) {
  const droppableRef = useRef(null);
  const { setNodeRef } = useDroppable({ id });
  const isDeletedColumn = id === "column-5";
  const hasDeletedTasks = data.columns[id].taskIds.length > 0;

  useEffect(() => {
    setNodeRef(droppableRef.current);
  }, [setNodeRef]);

  const handleClearTasks = () => {
    if (droppableRef.current) {
      clearDeletedTasks(droppableRef);
    }
  };

  return (
    <div
      ref={droppableRef}
      className={`border border-gray-300 rounded-lg p-4 min-h-64 bg-gray-100 ${
        isDeletedColumn && hasDeletedTasks ? "bg-red-200" : ""
      }`}
    >
      {children}
      {isDeletedColumn && hasDeletedTasks && (
        <div className="flex justify-center">
          <Button onClick={handleClearTasks} variant="filled">
            Clear Tasks
          </Button>
        </div>
      )}
    </div>
  );
}

export default function Assigntask() {
  const [datatemp, setDatatep] = useState([]);
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCardId, setCurrentCardId] = useState(null);
  const [isAddTaskDrawerOpen, setIsAddTaskDrawerOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    username: "",
    description: "",
    department: "",
    priority: "Low", // Default priority
    dueDate: "", // Added due date to the state
  });
  const proceedWithDeletion = (cardId) => {
    // Call the API to delete the task from the backend if necessary
    deleteTask( {CompanyID: decodedToken.CompanyID, CompanyName: decodedToken.CompanyName, TaskID: cardId})
      .then(() => {
        toast.success(`Task ${cardId} deleted successfully!`);
        setIsDeleteDialogOpen(false);
  
        // Update the local state to remove the task from the UI
        setData((prevData) => {
          const newColumns = { ...prevData.columns };
          Object.keys(newColumns).forEach(column => {
            newColumns[column].taskIds = newColumns[column].taskIds.filter(id => id !== cardId);
          });
  
          // Optionally, remove the task from the tasks object if it's maintained separately
          const newTasks = { ...prevData.tasks };
          delete newTasks[cardId];
  
          return {
            ...prevData,
            tasks: newTasks,
            columns: newColumns
          };
        });
      })
      .catch((error) => {
        console.error("Failed to delete task:", error);
        toast.error("Failed to delete task.");
      });
  };

  const handleCancelDeletion = () => {
    setIsDeleteDialogOpen(false);
  };
  const clearSound = new Audio();
  clearSound.src =  Sound ;
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  clearSound.addEventListener(
    "canplaythrough",
    () => {
      console.log("Audio is ready to play.");
    },
    false
  );

  clearSound.addEventListener("error", (e) => {
    console.error("Failed to load audio:", e);
  });

  const toggleAddTaskDrawer = () => {
    setIsAddTaskDrawerOpen(!isAddTaskDrawerOpen);
  };

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const [username, Setusername] = useState([]);

  useEffect(() => {
    fetchEmployeeList();
  }, [isAddTaskDrawerOpen]);

  const fetchEmployeeList = async () => {
    try {
      const response = await getEmployeeList(decodedToken.CompanyID);
      Setusername(response.employees);
      console.log(username, "employees");
    } catch (error) {
      console.error("Failed to fetch employee list:", error);
      toast.error("Failed to fetch employee list");
      // Set demo data on API failure
    }
  };
  const fetchTasks = async () => {
    try {
      const response = await getTask({
        CompanyID: decodedToken.CompanyID,
        CompanyName: decodedToken.CompanyName,
      });
      console.log(data, "tempdata");

      if (response && response.tasks) {
        const tasks = response.tasks;
        const newTasks = {};
        const newColumns = {
          Open: { ...initialData.columns.Open, taskIds: [] },
          "In Progress": {
            ...initialData.columns["In Progress"],
            taskIds: [],
          },
          Review: { ...initialData.columns.Review, taskIds: [] },
          Completed: { ...initialData.columns.Completed, taskIds: [] },
          Deleted: { ...initialData.columns.Deleted, taskIds: [] },
        };

        // Populate the tasks and assign them to the correct columns
        tasks.forEach((task) => {
          newTasks[task.TaskID] = {
            id: task.TaskID,
            title: task.TaskTitle,
            username: task.EmployeeName,
            text: task.TaskDescription,
            department: task.TaskDepartment,
            priority: task.TaskPriority,
            daysLeft: Math.ceil(
              (new Date(task.TaskDeadlineDate) - new Date()) /
                (1000 * 60 * 60 * 24)
            ), // Calculate days left
            assignedTo: task.AssignedTo, // Assuming 'AssignedTo' is the field name in the API response
            TaskBlipPoints: task.TaskBlipPoints,
          };
        
          // Use the mapping function to get the correct column ID
          const columnId = mapStatusToColumnId(task.TaskStatus);
        
          if (newColumns[columnId]) {
            newColumns[columnId].taskIds.push(task.TaskID);
          } else {
            console.error(`Column ${columnId} not found`);
          }
        });

        setData((prevData) => ({
          ...prevData,
          tasks: newTasks,
          columns: newColumns,
        }));
        console.log(newTasks,"newtask");
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      toast.error("Failed to load tasks. Displaying demo tasks.");
    }
  };

  useEffect(() => {


    fetchTasks();
  }, []);

  const handleAddTaskSubmit = async (e) => {
    e.preventDefault(); // Prevent form from submitting and reloading the page
  
    if (newTask.title.length > 25) {
      toast.error("The title cannot be more than 25 characters long.");
      return;
    }
  
    try {
      // Create the task payload
      const taskPayload = {
        CompanyID: decodedToken.CompanyID,
        CompanyName: decodedToken.CompanyName,
        AssignedBy: decodedToken.EmployeeID, // Assuming decodedToken has the UserName property
        AssignedTo: newTask.username,
        TaskDescription: newTask.description,
        TaskAssignedDate: new Date().toISOString(), // Current date as the assigned date
        TaskDeadlineDate: newTask.dueDate, // Set to null initially
        TaskTitle: newTask.title,
        TaskPriority: newTask.priority, // Include the priority from the form
        TaskDepartment: newTask.department, // Include the department from the form
      };
  
      // Call the createTask API
      const response = await createTask(taskPayload);
      if (response.status === 201) {
        // Task creation was successful
        toast.success("Task created successfully!");
        setIsAddTaskDrawerOpen(false); // Close the drawer
        fetchTasks(); // Refresh tasks
        setNewTask({ // Reset the form
          title: "",
          username: "",
          description: "",
          department: "",
          priority: "Low",
          dueDate: "",
        });
      }
    } catch (error) {
      console.error("Failed to create task:", error);
      toast.error("Failed to create task. Please try again.");
    }
  };

  const clearDeletedTasks = () => {
    const deletedCards = document.querySelectorAll(".deleted-card-animation");
    const tl = gsap.timeline({
      onComplete: () => {
        const newData = { ...data };
        newData.columns["Deleted"].taskIds = []; // Clear all tasks in the Deleted column
        setData(newData);
        clearSound
          .play()
          .catch((e) => console.error("Error playing the sound:", e));
      },
    });

    tl.to(deletedCards, {
      duration: 0.5,
      opacity: 0,
      scale: 0.5,
      stagger: 0.1,
      ease: "power1.inOut",
    });
  };
  const [sortOrder, setSortOrder] = useState("default");
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState(false);
  const toggleHistoryDrawer = () => {
    setIsHistoryDrawerOpen((prevState) => !prevState);
  };
  // Function to filter cards based on search query
  const filterCards = (cards) => {
    const priorityOrder = { High: 3, Medium: 2, Low: 1 };

    return cards
      .filter((card) => {
        const { title, username, text, priority, department } = card;
        const searchString = `${title.toLowerCase()} ${username.toLowerCase()} ${text.toLowerCase()}`;
        const isPriorityMatch = filterOptions.priority
          ? priority === filterOptions.priority
          : true;
        const isDepartmentMatch = filterOptions.department
          ? department === filterOptions.department
          : true;
        const isUsernameMatch = filterOptions.username
          ? username === filterOptions.username
          : true;

        return (
          searchString.includes(searchQuery.toLowerCase()) &&
          isPriorityMatch &&
          isDepartmentMatch &&
          isUsernameMatch
        );
      })
      .sort((a, b) => {
        if (sortOrder === "default") return 0; // No sorting applied
        if (sortOrder === "High")
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        if (sortOrder === "Medium")
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        if (sortOrder === "Low")
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        return 0; // Fallback in case sortOrder doesn't match expected values
      });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const cardId = active.id; // This is the card ID
    const overId = over.id;
    const columnStatus = {
      Open: "Open",
      "In Progress": "Inprogress",
      Review: "Review",
      Completed: "Completed",
      Deleted: "Deleted",
    };
    const status = columnStatus[overId] || "Unknown";
    if (overId === "Deleted") {
      if (overId === "Deleted") {
        const remindDelete = localStorage.getItem("remindDelete");
  
        if (remindDelete !== "false") {
          setCurrentCardId(cardId);
          setIsDeleteDialogOpen(true);
        } else {
          proceedWithDeletion(cardId);
        }
      }
  
    }
    if (cardId !== overId) {
      const sourceColumnId = Object.keys(data.columns).find((columnId) =>
        data.columns[columnId].taskIds.includes(cardId)
      );

      const destinationColumnId = Object.keys(data.columns).find(
        (columnId) => columnId === overId
      );
      // if (destinationColumnId === "Deleted") {
      //   // Call the delete function if the card is dropped in the "Deleted" column
      //   setData((prevData) => {
      //     const newColumns = { ...prevData.columns };
      //     // Remove the card from its current column
      //     newColumns[sourceColumnId].taskIds = newColumns[sourceColumnId].taskIds.filter(id => id !== cardId);
      //     // Optionally, you can handle the deleted items in a separate state or log it
      //     return {
      //       ...prevData,
      //       columns: newColumns
      //     };
      //   });
      //   toast.success(`Task ${cardId} deleted successfully!`);
      //   return; // Exit the function after handling deletion
      // }
      // if (destinationColumnId === "Deleted") {
      //   // Call the delete function if the card is dropped in the "Deleted" column
      //   deleteTask(cardId);
      //   toast.success(`Task ${cardId} deleted successfully!`);
      // } 

      // if (sourceColumnId && destinationColumnId) {
      //   const sourceItems = [...data.columns[sourceColumnId].taskIds];
      //   const destinationItems = [...data.columns[destinationColumnId].taskIds];
        
      //   const movedItemIndex = sourceItems.indexOf(cardId);
      //   const [movedItemId] = sourceItems.splice(movedItemIndex, 1);
      //   // Add to destination only if it's not already there (to handle same column drop)
      //   if (!destinationItems.includes(active.id)) {
      //     destinationItems.push(active.id);
      //   }
      
      if (sourceColumnId && destinationColumnId) {
        if (sourceColumnId === destinationColumnId) {
          console.log("Task moved within the same column.");
          return; // Exit the function if the task is moved within the same column
        }
    
        const sourceItems = [...data.columns[sourceColumnId].taskIds];
        const destinationItems = [...data.columns[destinationColumnId].taskIds];
    
        const movedItemIndex = sourceItems.indexOf(cardId);
        const [movedItemId] = sourceItems.splice(movedItemIndex, 1);
        // Add to destination only if it's not already there (to handle same column drop)
        if (!destinationItems.includes(active.id)) {
          destinationItems.push(active.id);
        }

        setData((prevData) => ({
          ...prevData,
          columns: {
            ...prevData.columns,
            [sourceColumnId]: {
              ...prevData.columns[sourceColumnId],
              taskIds: sourceItems,
            },
            [destinationColumnId]: {
              ...prevData.columns[destinationColumnId],
              taskIds: destinationItems,
            },
          },
        }));
        clearSound.play().catch((e) => console.error("Error playing the sound:", e));

        const movedTaskData = data.tasks[movedItemId];
        console.log(`Moved task data:`, movedTaskData);

        // Retrieve the assignedTo from the task details
        const AssignedTo = movedTaskData.assignedTo;
        const Blips = movedTaskData.TaskBlipPoints;
        console.log(AssignedTo, "assigne");
        // Update the task status based on the destination columns
        updateTaskStatus(
          decodedToken.CompanyID,
          decodedToken.CompanyName,
          movedItemId, // Ensure this is the task ID from your initial data
          status,
          AssignedTo, // Pass the assignedTo parameter
          Blips
        )
          .then(() => {
            toast.success(`Task updated`);
          })
          .catch((error) => {
            console.error("Failed to update task status:", error);
            toast.error("Failed to update task status.");
          });
      }
    }
  };
  const [filterOptions, setFilterOptions] = useState({
    priority: "",
    department: "",
    username: "",
  });

  function FilterMenu({ applyFilter }) {
    const usernames = React.useMemo(() => {
      const allUsernames = Object.values(data.tasks).map(task => task.username).filter(Boolean);
      const uniqueUsernames = Array.from(new Set(allUsernames));
      return uniqueUsernames.length > 0
        ? uniqueUsernames.map(username => ({ value: username, label: username }))
        : [{ value: 'No Users', label: 'No Users Available', isDisabled: true }];
    }, [data.tasks]);
    const handleFilterChange = (filterType, filterValue) => {
      setFilterOptions((prevOptions) => ({
        ...prevOptions,
        [filterType]: filterValue,
      }));
      setIsFilterMenuOpen(false);
    };
  
    const departmentOptions = useMemo(() => {
      const allDepartments = Object.values(data.tasks).map(task => task.department);
      const uniqueDepartments = Array.from(new Set(allDepartments));
      return uniqueDepartments.map(department => ({ value: department, label: department }));
    }, [data.tasks]);
  
    const activeFilterCount = Object.values(filterOptions).filter(
      (value) => value !== ""
    ).length;
  
    return (
      <div className="filter-menu bg-white shadow-xl rounded-lg p-4 mt-4 absolute left-1/4 z-50 top-60 w-1/3">
        <h3 className="text-lg font-medium mb-4 text-center">
          Advanced Filter Options
          {activeFilterCount > 0 && (
            <span className="ml-2 text-sm font-semibold text-blue-500">
              ({activeFilterCount} active)
            </span>
          )}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <h4 className="font-bold mb-2 text-gray-700">Priority</h4>
            {["High", "Medium", "Low"].map((priority) => (
              <Button
                key={priority}
                onClick={() => handleFilterChange("priority", priority)}
                variant="outlined"
                className={`text-black font-bold py-2 px-4 rounded-lg block w-full mb-2 transition-colors duration-300 ease-in-out ${
                  filterOptions.priority === priority
                    ? "bg-red-500 text-white"
                    : "hover:bg-red-700 hover:text-white"
                }`}
              >
                {priority}
              </Button>
            ))}
          </div>
          <div>
            <h4 className="font-bold mb-2 text-gray-700">Department</h4>
            <select
            value={filterOptions.department}
            onChange={(e) => handleFilterChange("department", e.target.value)}
            className="bg-white text-gray-700 py-2 px-4 pr-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
          >
            <option value="">Select Department</option>
            {departmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          </div>
          <div>
            <h4 className="font-bold mb-2 text-gray-700">Username</h4>
            <select
              value={filterOptions.username}
              onChange={(e) => handleFilterChange("username", e.target.value)}
              className="bg-white text-gray-700 py-2 px-4 pr-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            >
             {usernames.map((username) => (
            <option key={username.value} value={username.value} disabled={username.isDisabled}>
              {username.label}
            </option>
          ))}
            </select>
          </div>
  
          <div className="flex justify-center">
            <Button
              onClick={() =>
                setFilterOptions({
                  priority: "",
                  department: "",
                  username: "",
                })
              }
              className="mt-4 bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg block w-full transition-colors duration-300 ease-in-out justify-center"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>
    );
  }
  const [sortOption, setSortOption] = useState("");
  const handleFilter = (filter) => {
    // Implement filtering logic here
    console.log("Filter applied:", filter);
    // You might want to update a state that controls the displayed tasks
  };
  const activeFilterCount = Object.values(filterOptions).filter(
    (value) => value !== ""
  ).length;
  const token = localStorage.getItem("AccessToken");
  const decodedToken = jwtDecode(token);
  const companyName = decodedToken.CompanyName;
  return (
    <>
      <div className="flex-col mt-10 justify-between mx-14 mb-7 overflow-y-hidden">
        <div className="flex justify-between mb-5 shadow-sm  p-4 rounded">
          <div className="flex bg-gray-900 text-white rounded-lg justify-center items-center p-2">
            Total Coins : <span className=" text-lg ml-2"> {decodedToken.blip || 0}</span>{" "}
            <img src={blips} className="w-10 h-8 animate-pulse" alt="" />
          </div>
          <div className="text-4xl capitalize font-semibold items-center flex">
            {companyName}
          </div>
          <div className="flex items-center space-x-4">
            {/* Company Name */}
            <Button className="rounded-full bg-white w-14 h-14 p-5 flex justify-center items-center shadow-2xl hover:bg-blue-gray-100">
              <BellIcon className="text-black w-10 h-10 hover:animate-pulse cursor-pointer" />
            </Button>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="">
              <Button
                variant="outlined"
                className="rounded-full p-2 hover:bg-green-50 transition-colors duration-300"
                onClick={toggleHistoryDrawer}
              >
                <ClockIcon className="h-6 w-6" />
              </Button>
              {isHistoryDrawerOpen && (
                <div className="fixed inset-y-0 right-0 bg-gray-600 bg-opacity-50 flex z-50 w-[23rem]">
                  <div className="bg-white h-full w-full shadow-xl overflow-y-auto">
                    <div className="flex justify-between items-center bg-gray-100 p-4">
                      <h4 className="text-lg font-semibold">History</h4>
                      <button
                        onClick={toggleHistoryDrawer}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="p-4 space-y-4">
                      {/* Add your history content here */}
                      {/* Example tasks */}
                      <div className="bg-white shadow-md rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-semibold">Demo Task 1</h3>
                          <Button variant="outlined" size="sm">
                            Re-assign
                          </Button>
                        </div>
                        <p className="text-gray-600">This is a demo task.</p>
                      </div>
                      <div className="bg-white shadow-md rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-semibold">Demo Task 2</h3>
                          <Button variant="outlined" size="sm">
                            Re-assign
                          </Button>
                        </div>
                        <p className="text-gray-600">
                          This is another demo task.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between bg-white rounded-lg p-4 items-end">
          <div className="flex bg-white rounded-lg shadow-md p-4 gap-4 justify-between w-full">
            <div className="flex items-center gap-4 w-full">
              <div className="relative">
                <select
                  name="sort"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="appearance-none bg-white text-gray-700 py-2 px-4 pr-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="default">Sort By</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12l-5-5 1.41-1.41L10 9.17l3.59-3.58L15 7l-5 5z" />
                  </svg>
                </div>
              </div>

              <Button
                variant="outlined"
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                className="relative"
              >
                <AdjustmentsHorizontalIcon
                  className="h-5 w-5 mr-2"
                  aria-hidden="true"
                />
                {activeFilterCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center h-5 w-5 justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
                {isFilterMenuOpen && (
                  <FilterMenu data={data} applyFilter={handleFilter} />
                )}
              </Button>
              {isFilterMenuOpen && (
                <FilterMenu data={data} applyFilter={handleFilter} />
              )}
            </div>
            <Button
              onClick={toggleAddTaskDrawer}
              className="text-white rounded-lg py-2 items-center min-w-max bg-gradient-to-r from-gray to-black"
            >
              + Add Task
            </Button>
          </div>
        </div>
      </div>
      {isAddTaskDrawerOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-lg mb-4 font-bold text-gray-700">
              Add New Task
            </h2>
            <form onSubmit={handleAddTaskSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <Input
                  type="text"
                  placeholder="Title"
                  name="title"
                  id="title"
                  value={newTask.title}
                  onChange={handleNewTaskChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <CreatableSelect
                  options={username.map((user) => ({
                    value: user.EmployeeID,
                    label: user.EmployeeName,
                  }))}
                  value={{
                    value: newTask.username,
                    label: newTask.username
                      ? newTask.username
                      : "Select Username",
                  }}
                  onChange={(selectedOption) =>
                    setNewTask((prev) => ({
                      ...prev,
                      username: selectedOption ? selectedOption.value : "",
                    }))
                  }
                  placeholder="Select or type Username"
                  isClearable
                  isSearchable={true}
                  name="username"
                  id="username"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department
                </label>
                <CreatableSelect
                  options={[
                    { value: "Analysis", label: "Analysis" },
                    { value: "Design", label: "Design" },
                    { value: "Optimization", label: "Optimization" },
                    { value: "Development", label: "Development" },
                    { value: "Client Relations", label: "Client Relations" },
                    { value: "Quality Assurance", label: "Quality Assurance" },
                    { value: "Technical Support", label: "Technical Support" },
                    { value: "Operations", label: "Operations" },
                    { value: "HR", label: "HR" },
                    { value: "Manufacturing", label: "Manufacturing" },
                    { value: "Service", label: "Service" },
                    { value: "Logistics", label: "Logistics" },
                    { value: "IT", label: "IT" },
                  ]}
                  value={{
                    value: newTask.department,
                    label: newTask.department
                      ? newTask.department
                      : "Select Department",
                  }}
                  onChange={(selectedOption) =>
                    setNewTask((prev) => ({
                      ...prev,
                      department: selectedOption ? selectedOption.value : "",
                    }))
                  }
                  placeholder="Select or type Department"
                  isClearable
                  isSearchable={true}
                  name="department"
                  id="department"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  placeholder="Description"
                  name="description"
                  id="description"
                  value={newTask.description}
                  onChange={handleNewTaskChange}
                  className="w-full p-2 border rounded"
                  required
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-700"
                >
                  Priority
                </label>
                <Select
                  name="priority"
                  id="priority"
                  value={newTask.priority}
                  onChange={(value) =>
                    setNewTask((prev) => ({ ...prev, priority: value }))
                  }
                  placeholder="Select Priority"
                  required
                >
                  <Option value="High">High</Option>
                  <Option value="Medium">Medium</Option>
                  <Option value="Low">Low</Option>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Due Date
                </label>
                <Input
                  type="date"
                  placeholder="Due Date"
                  name="dueDate"
                  id="dueDate"
                  value={newTask.dueDate}
                  onChange={handleNewTaskChange}
                  min={new Date().toISOString().split("T")[0]} // Ensure no past dates are selected
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <Button type="submit" variant="filled">
                  Submit
                </Button>
                <Button onClick={toggleAddTaskDrawer} color="red">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="overflow-y-scroll no-scrollbar max-h-[70vh] overflow-x-hidden">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="flex flex-col items-center ">
            <div
              className="flex gap-4 justify-center w-full"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "stretch",
              }}
            >
              {data.columnOrder.map((columnId) => {
                const column = data.columns[columnId];
                const cards = filterCards(
                  column.taskIds.map((taskId) => data.tasks[taskId])
                ); // Filter cards based on search query
                let icon;

                // Assigning different colors based on the column title
                const colorMap = {
                  Open: "bg-green-500 opacity-60",
                  "In Progress": "bg-blue-500 opacity-60",
                  Review: "bg-yellow-500 ",
                  Completed: "bg-purple-500 opacity-60",
                  Deleted: "bg-red-500 opacity-60",
                };

                const columnColor = colorMap[column.title] || "bg-gray-500";

                return (
                  <div key={column.id} className="flex flex-col w-64 h-full">
                    <h3 className="text-center text-gray-700 mb-4 sticky top-0 z-10 bg-white pb-5">
                      {icon}
                      {column.title}{" "}
                      <span
                        className={`inline-block ${columnColor} text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 ml-2`}
                      >
                        {cards.length}
                      </span>
                    </h3>
                    <Droppable
                      id={column.id}
                      data={data}
                      clearDeletedTasks={clearDeletedTasks}
                    >
                      {cards.map((card) => (
                        <Draggable
                          key={card.id}
                          id={card.id}
                          title={card.title}
                          username={card.username}
                          text={card.text}
                          department={card.department}
                          isDeleted={
                            column.id === "Deleted" &&
                            data.columns["Deleted"].taskIds.length > 0
                          }
                          className={
                            column.id === "Deleted"
                              ? "deleted-card-animation"
                              : ""
                          }
                          image={card.image}
                          tags={card.tags}
                          daysLeft={card.daysLeft}
                          priority={card.priority}
                        />
                      ))}
                    </Droppable>
                  </div>
                );
              })}
            </div>
          </div>
        </DndContext>
      </div>
      <ToastContainer />
      <Dialog size="sm" open={isDeleteDialogOpen} handler={setIsDeleteDialogOpen}>
        <DialogHeader>Confirm Deletion</DialogHeader>
        <DialogBody>
          Are you sure you want to delete this task? Check 'Don't remind me again' to not see this message again.
          <div className="form-check mt-4">
            <input
              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              value=""
              id="dontRemindAgain"
              onChange={(e) => {
                if (e.target.checked) {
                  localStorage.setItem("remindDelete", "false");
                }
              }}
            />
            <label className="form-check-label inline-block text-gray-800" htmlFor="dontRemindAgain">
              Don't remind me again during this login
            </label>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            color="red"
            onClick={() => proceedWithDeletion(currentCardId)}
            className="mr-1"
          >
            Delete
          </Button>
          <Button onClick={handleCancelDeletion}>Cancel</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
