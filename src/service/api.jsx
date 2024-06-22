/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-useless-catch */
import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

const api_url = import.meta.env.VITE_API_URL;
console.log(api_url);
const token = localStorage.getItem("AccessToken");

axios.interceptors.request.use(
  config => {
    // Add the token to the request headers
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  error => {
    Promise.reject(error);
  }
);


export const updateTaskStatus = async (companyID, companyName, taskID, taskStatus,AssignedTo,Blips) => {
  try {
    const response = await axios.put(`${api_url}taskmanagement/change-status`, {
      CompanyID: companyID,
      CompanyName: companyName,
      TaskID: taskID,
      TaskStatus: taskStatus,
      AssignedTo:AssignedTo,
      TaskBlipPoints:Blips
    });
    console.log(Blips,"response");
    console.log('Task status updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error; // Re-throw the error to be caught in `markTaskAsCompleted`
  }
};

export const handleLogin = async (formData) => {
    console.log(formData);
    try {
        const apiResponse = await axios.post(`${api_url}authentication/client-login`, formData);
        return apiResponse.data; // Return response data if needed
    } catch (error) {
        throw error; // Rethrow error to handle it where this function is called
    }
};
export const handle_employeLogin = async (data) => {
  console.log(data);
  try {
      const apiResponse = await axios.post(`${api_url}authentication/employee-login`,data );
      return apiResponse.data; // Return response data if needed
  } catch (error) {
      throw error; // Rethrow error to handle it where this function is called
  }
};


export const handleSignup = async (formData) => {
    console.log(formData);
    try {
        const apiResponse = await axios.post(`${api_url}authentication/client-signup`, formData);
        return apiResponse.data; // Return response data if needed
    } catch (error) {
        throw error; // Rethrow error to handle it where this function is called
    }
};

export const createTask = async (taskData) => {
    try {
        console.log(taskData);
        const response = await axios.post(`${api_url}taskmanagement/create-task`, taskData);
      // Optionally, you can update the UI or perform additional actions after successful task creation
      console.log("Task assigned successfully!");
      return response;
    } catch (error) {
      console.error('Error creating task:', error);
      // Handle the error appropriately (e.g., display an error message to the user)
    }
  };
  
  export const getTask = async (data) => {
    console.log("this is task api",data)
    try {
      const Response = await axios.post(`${api_url}taskmanagement/get-task`,data);
      return Response.data;     
    } catch (error) {
      console.error('Error fetching task:', error);
      // Handle the error appropriately (e.g., display an error message to the user)
    }
  };



 export const registerEmployee = async (formData) => {
try {
        const apiResponse = await axios.post(`${api_url}employee/register-new-employee`, formData);
        return apiResponse.data; // Return response data if needed
    } catch (error) {
        throw error; // Rethrow error to handle it where this function is called
    }
};
export const updateEmployee = async (id,formData) => {
  try {
          const apiResponse = await axios.put(`${api_url}employee/update-employee/${id}`, formData);
          return apiResponse.data; // Return response data if needed
      } catch (error) {
          throw error; // Rethrow error to handle it where this function is called
      }
  };

export const getEmployeeList = async (companyId) => {
    try {
      console.log(companyId);
      const response = await axios.post(`${api_url}employee/get-employees`,{CompanyID:companyId});
      return response.data; // Return the list of employees
    } catch (error) {
      throw error; // Rethrow error to handle it where this function is called
    }
  };
 

  export const deleteTask = async (taskId) => {
    try {
     
       console.log("this is deleted data",typeof taskId,"---------",taskId);
      const response = await axios.post(`${api_url}taskmanagement/delete-task`,taskId);
  
      console.log('Task deleted successfully:', response.data);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };
  
  export const DeleteEmployee = async (id,formData) =>{
    try {
      console.log('Deleting employee', formData,"this is", id);
      const response=  await axios.delete(`${api_url}employee/delete-employee/${id}`,formData)
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }