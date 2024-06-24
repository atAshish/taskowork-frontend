/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Select, { components } from "react-select";
import CreatableSelect from "react-select/creatable";

import {
  Card,
  CardBody,
  Button,
  Input,
  Dialog,
  Spinner,
  Radio,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getEmployeeList,
  DeleteEmployee,
  updateEmployee,
  registerEmployee,
} from "../../../service/api";

const data = localStorage.getItem("AccessToken");
let decodedToken = {};
if (data) {
  decodedToken = jwtDecode(data);
} else {
  console.error("Access Token not found in local storage");
}

const EmployeeList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    CompanyID: decodedToken.CompanyID,
    EmployeeName: "",
    EmployeeEmail: "",
    Password: "",
    Role: "Employee",
    CompanyName: decodedToken.CompanyName,
    ReportsTo: "",
    Designation: "",
    Branch: "",
    Location: "",
    EmployeeDepartment: "",
  });
  const [editedEmployee, setEditedEmployee] = useState({
    EmployeeName: "",
    EmployeeEmail: "",
    Role: "",
    Password: "",
    ReportsTo: "",
    Designation: "",
    Branch: "",
    Location: "",
    EmployeeDepartment: "",
  });
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [reportParams, setReportParams] = useState({
    startDate: "",
    endDate: "",
    format: "PDF", // default format
  });

  const handleReportParamsChange = (e) => {
    const { name, value } = e.target;
    setReportParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  const fetchEmployeeList = async () => {
    setLoading(true);
    try {
      const response = await getEmployeeList(decodedToken.CompanyID);
      setEmployees(response.employees);
      // Extract unique departments from the employee list
      const uniqueDepartments = [
        ...new Set(
          response.employees.map((employee) => employee.EmployeeDepartment)
        ),
      ];
      setDepartments(uniqueDepartments);
      if (response.employees.length === 0) {
        toast.info("No employees found. Consider adding some!");
      }
    } catch (error) {
      console.error("Failed to fetch employee list:", error);
      toast.error("Failed to fetch employee list");
      // Set empty array on API failure
      setEmployees([]);
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (selectedEmployee) {
      setEditedEmployee({
        ...editedEmployee,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    if (selectedEmployee) {
      setEditedEmployee({
        ...editedEmployee,
        Role: value,
      });
    } else {
      setFormData({
        ...formData,
        Role: value,
      });
    }
  };

  const closeDialog = () => {
    console.log("Closing dialog");
    setIsDialogOpen(false);
    setEditedEmployee({
      EmployeeName: "",
      EmployeeEmail: "",
      Password: "",
      ReportsTo: "",
      Designation: "",
      Branch: "",
      Location: "",
      EmployeeDepartment: "",
    });
    setSelectedEmployee(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (selectedEmployee) {
        // Update employee
        const updatedEmployee = {
          ...editedEmployee,
          Password: editedEmployee.Password,
        };
        await updateEmployee(selectedEmployee.EmployeeID, updatedEmployee);
        fetchEmployeeList();
        closeDialog();
        toast.success("Employee updated successfully");
      } else {
        // Register new employee
        const newDepartment = formData.EmployeeDepartment;
        if (!departments.includes(newDepartment)) {
          // Add the new department to the departments array
          setDepartments([...departments, newDepartment]);
        }
        await registerEmployee(formData);
        fetchEmployeeList();
        closeDialog();
        toast.success("Employee added successfully");
      }
    } catch (error) {
      console.error("Failed to update/register employee:", error);
      toast.error("Failed to update/add employee");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    setIsDialogOpen(true);
  };

  const handleDelete = async (employee) => {
    setLoading(true);
    try {
      await DeleteEmployee(employee.EmployeeID, {
        CompanyID: employee.CompanyID,
        EmployeeName: employee.EmployeeName,
      });
      fetchEmployeeList(); // Refresh the list after deletion
      toast.success("Employee deleted successfully");
    } catch (error) {
      console.error("Failed to delete employee:", error);
      toast.error("Failed to delete employee");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (employee) => {
    setEditedEmployee({
      EmployeeName: employee.EmployeeName,
      EmployeeEmail: employee.EmployeeEmail,
      Password: "",
      ReportsTo: employee.ReportsTo,
      Designation: employee.Designation,
      Branch: employee.Branch,
      Location: employee.Location,
      Role: employee.Role,
      EmployeeDepartment: employee.EmployeeDepartment,
    });
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };

  const openReportDialog = () => {
    setIsReportDialogOpen(true);
  };

  const closeReportDialog = () => {
    setIsReportDialogOpen(false);
  };

const filterEmployees = (employee, searchQuery) => {
  const { EmployeeID, EmployeeName, Role, EmployeeEmail, EmployeeDepartment } = employee;
  const query = searchQuery.toLowerCase();
  return (
    EmployeeID.toString().includes(query) ||
    EmployeeName.toLowerCase().includes(query) ||
    Role.toLowerCase().includes(query) ||
    EmployeeEmail.toLowerCase().includes(query) ||
    EmployeeDepartment.toLowerCase().includes(query)
  );
};

  const filteredEmployees = employees.filter((employee) =>
    filterEmployees(employee, searchQuery)
  );
  const handleDownloadReport = (employee) => {
    // Example function to download a report for an employee
    // This is a placeholder: you'll need to implement the actual download logic based on your requirements
    const reportData = JSON.stringify(employee, null, 2);
    const blob = new Blob([reportData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Report-${employee.EmployeeID}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="h-[99vh] p-4 md:p-8">
      <ToastContainer />
      <Card className="mx-auto my-10 w-full max-w-7xl  overflow-auto shadow-xl h-full">
        <CardBody>
          <div className="flex justify-between items-center gap-5 mb-5">
            <Input
              placeholder="Search"
              label="Search"
              value={searchQuery}
              onChange={handleSearch}
              iconFamily="material-icons"
              iconName="search"
              iconSize="sm"
              className="w-full md:w-60"
            />
            <Button
              onClick={handleClick}
              variant="gradient"
              className="bg-gradient-to-r from-blue-gray-800 to-blue-gray-900 text-white text-sm"
            >
              <span className="text-sm">Add Employee +</span>
            </Button>
          </div>
          <Dialog
            open={isDialogOpen}
            handler={closeDialog}
            className="bg-white rounded-lg shadow-lg p-8 m-4"
            size="lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">
                {selectedEmployee ? "Edit Employee" : "Add New Employee"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="employeeName"
                    className="text-gray-700 font-semibold mb-2"
                  >
                    Employee Name
                  </label>
                  <Input
                    id="employeeName"
                    type="text"
                    color="lightBlue"
                    placeholder="Enter employee name"
                    name="EmployeeName"
                    value={
                      selectedEmployee
                        ? editedEmployee.EmployeeName
                        : formData.EmployeeName
                    }
                    onChange={handleInputChange}
                    required
                    fullWidth
                    className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="employeeEmail"
                    className="text-gray-700 font-semibold mb-2"
                  >
                    Employee Email
                  </label>
                  <Input
                    id="employeeEmail"
                    type="email"
                    color="lightBlue"
                    placeholder="Enter employee email"
                    name="EmployeeEmail"
                    value={
                      selectedEmployee
                        ? editedEmployee.EmployeeEmail
                        : formData.EmployeeEmail
                    }
                    onChange={handleInputChange}
                    required
                    fullWidth
                    className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="employeePassword"
                    className="text-gray-700 font-semibold mb-2"
                  >
                    Password
                  </label>
                  <Input
                    id="employeePassword"
                    type="password"
                    color="lightBlue"
                    placeholder="Enter password"
                    name="Password"
                    value={
                      selectedEmployee
                        ? editedEmployee.Password
                        : formData.Password
                    }
                    onChange={handleInputChange}
                    required
                    fullWidth
                    className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="reportsTo"
                    className="text-gray-700 font-semibold mb-2"
                  >
                    Reports To
                  </label>
                  <Input
                    id="reportsTo"
                    type="text"
                    color="lightBlue"
                    placeholder="Enter supervisor"
                    name="ReportsTo"
                    value={
                      selectedEmployee
                        ? editedEmployee.ReportsTo
                        : formData.ReportsTo
                    }
                    onChange={handleInputChange}
                    required
                    fullWidth
                    className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="designation"
                    className="text-gray-700 font-semibold mb-2"
                  >
                    Designation
                  </label>
                  <Input
                    id="designation"
                    type="text"
                    color="lightBlue"
                    placeholder="Enter designation"
                    name="Designation"
                    value={
                      selectedEmployee
                        ? editedEmployee.Designation
                        : formData.Designation
                    }
                    onChange={handleInputChange}
                    required
                    fullWidth
                    className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="branch"
                    className="text-gray-700 font-semibold mb-2"
                  >
                    Branch
                  </label>
                  <Input
                    id="branch"
                    type="text"
                    color="lightBlue"
                    placeholder="Enter branch"
                    name="Branch"
                    value={
                      selectedEmployee ? editedEmployee.Branch : formData.Branch
                    }
                    onChange={handleInputChange}
                    required
                    fullWidth
                    className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="location"
                    className="text-gray-700 font-semibold mb-2"
                  >
                    Location
                  </label>
                  <Input
                    id="location"
                    type="text"
                    color="lightBlue"
                    placeholder="Enter location"
                    name="Location"
                    value={
                      selectedEmployee
                        ? editedEmployee.Location
                        : formData.Location
                    }
                    onChange={handleInputChange}
                    required
                    fullWidth
                    className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="role"
                    className="text-gray-700 font-semibold mb-2"
                  >
                    Role
                  </label>
                  <div className="flex items-center gap-4">
                    <Radio
                      id="role-employee"
                      name="Role"
                      value="Employee"
                      color="lightBlue"
                      checked={
                        selectedEmployee
                          ? editedEmployee.Role === "Employee"
                          : formData.Role === "Employee"
                      }
                      onChange={handleRoleChange}
                      label="Employee"
                    />
                    <Radio
                      id="role-admin"
                      name="Role"
                      value="Admin"
                      color="lightBlue"
                      checked={
                        selectedEmployee
                          ? editedEmployee.Role === "Admin"
                          : formData.Role === "Admin"
                      }
                      onChange={handleRoleChange}
                      label="Admin"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="employeeDepartment"
                    className="text-gray-700 font-semibold mb-2"
                  >
                    Department
                  </label>
                  <CreatableSelect
                    id="employeeDepartment"
                    name="EmployeeDepartment"
                    value={{
                      value: selectedDepartment,
                      label: selectedDepartment,
                    }}
                    options={departments.map((department) => ({
                      value: department,
                      label: department,
                    }))}
                    onChange={(selectedOption) => {
                      const departmentValue = selectedOption.value;
                      if (selectedEmployee) {
                        setEditedEmployee({
                          ...editedEmployee,
                          EmployeeDepartment: departmentValue,
                        });
                      } else {
                        setFormData({
                          ...formData,
                          EmployeeDepartment: departmentValue,
                        });
                      }
                      setSelectedDepartment(departmentValue);
                    }}
                    onCreateOption={(newDepartment) => {
                      setDepartments([...departments, newDepartment]);
                      if (selectedEmployee) {
                        setEditedEmployee({
                          ...editedEmployee,
                          EmployeeDepartment: newDepartment,
                        });
                      } else {
                        setFormData({
                          ...formData,
                          EmployeeDepartment: newDepartment,
                        });
                      }
                      setSelectedDepartment(newDepartment);
                    }}
                    className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <Button
                type="submit"
                variant="gradient"
                className="bg-gradient-to-r from-blue-gray-800 to-blue-gray-900 text-white"
              >
                {selectedEmployee ? "Update Employee" : "Add Employee"}
              </Button>
            </form>
          </Dialog>
          <Dialog
            open={isReportDialogOpen}
            handler={closeReportDialog}
            className="bg-white rounded-xl shadow-2xl p-6 m-4 max-w-md mx-auto"
            size="sm"
          >
            <form className="space-y-6">
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Generate Report
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="startDate"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Start Date
                  </label>
                  <Input
                    id="startDate"
                    type="date"
                    name="startDate"
                    value={reportParams.startDate}
                    onChange={handleReportParamsChange}
                    required
                    className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="endDate"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    End Date
                  </label>
                  <Input
                    id="endDate"
                    type="date"
                    name="endDate"
                    value={reportParams.endDate}
                    onChange={handleReportParamsChange}
                    required
                    className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="format"
                    className="text-sm font-medium text-gray-700 mb-1"
                  >
                    Format
                  </label>
                  <Select
                    id="format"
                    name="format"
                    value={{
                      value: reportParams.format,
                      label: reportParams.format.toUpperCase(),
                    }}
                    onChange={(selectedOption) =>
                      handleReportParamsChange({
                        target: { name: "format", value: selectedOption.value },
                      })
                    }
                    options={[
                      { value: "json", label: "JSON" },
                      { value: "xlsx", label: "Excel" },
                      { value: "pdf", label: "PDF" },
                    ]}
                    className="rounded-md"
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        borderColor: "#D1D5DB",
                        "&:hover": { borderColor: "#3B82F6" },
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected ? "#3B82F6" : "white",
                        color: state.isSelected ? "white" : "black",
                      }),
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center pt-4">
                <Button
                  type="button"
                  onClick={handleDownloadReport}
                  variant="gradient"
                  className="bg-gradient-to-r from-blue-gray-800 to-blue-gray-900 text-white"
                >
                  Download Report
                </Button>
              </div>
            </form>
          </Dialog>
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Spinner color="black" className="w-5 h-5" />
            </div>
          ) : (
            <div className="overflow-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="text-left py-2 px-4 border-b">
                      Employee ID
                    </th>
                    <th className="text-left py-2 px-4 border-b">Name</th>
                    <th className="text-left py-2 px-4 border-b">Email</th>
                    <th className="text-left py-2 px-4 border-b">Role</th>
                    <th className="text-left py-2 px-4 border-b">Department</th>
                    <th className="text-left py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                      <tr key={employee.EmployeeID}>
                        <td className="text-left py-2 px-4 border-b">
                          {employee.EmployeeID}
                        </td>
                        <td className="text-left py-2 px-4 border-b">
                          {employee.EmployeeName}
                        </td>
                        <td className="text-left py-2 px-4 border-b">
                          {employee.EmployeeEmail}
                        </td>
                        <td className="text-left py-2 px-4 border-b">
                          {employee.Role}
                        </td>
                        <td className="text-left py-2 px-4 border-b">
                          {employee.EmployeeDepartment}
                        </td>
                        <td className="text-left py-2 px-4 border-b flex items-center gap-2">
                          <Button
                            onClick={() => handleEdit(employee)}
                            size="sm"
                            color="blue"
                            variant="filled"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => openReportDialog(employee)}
                            size="sm"
                            variant="filled"
                          >
                            Report
                          </Button>
                          <Button
                            onClick={() => handleDelete(employee)}
                            size="sm"
                            color="red"
                            variant="filled"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        <div className="text-gray-500 text-lg font-semibold">
                          No employees found
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default EmployeeList;
