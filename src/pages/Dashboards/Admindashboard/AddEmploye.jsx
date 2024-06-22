import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import {
  Card,
  CardBody,
  Button,
  Input,
  Dialog,
  Spinner,
  Slider
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
    EmployeeDepartment: ""
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
    EmployeeDepartment: ""
  });
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployeeList();
  }, []);

  const fetchEmployeeList = async () => {
    setLoading(true);
    try {
      const response = await getEmployeeList(decodedToken.CompanyID);
      setEmployees(response.employees);
    } catch (error) {
      console.error("Failed to fetch employee list:", error);
      toast.error("Failed to fetch employee list");
      // Set demo data on API failure
      setEmployees([
        { id: 1, EmployeeName: "John Doe", EmployeeEmail: "john@example.com", Role: "Admin", EmployeeDepartment: "HR" },
        { id: 2, EmployeeName: "Jane Smith", EmployeeEmail: "jane@example.com", Role: "Employee", EmployeeDepartment: "Finance" }
      ]);
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

  const handleRoleChange = (value) => {
    if (value === 1) {
      if (selectedEmployee) {
        setEditedEmployee({
          ...editedEmployee,
          Role: "Admin",
        });
      } else {
        setFormData({
          ...formData,
          Role: "Admin",
        });
      }
    } else {
      if (selectedEmployee) {
        setEditedEmployee({
          ...editedEmployee,
          Role: "Employee",
        });
      } else {
        setFormData({
          ...formData,
          Role: "Employee",
        });
      }
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
      EmployeeDepartment: ""
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
        await registerEmployee(formData);
        fetchEmployeeList();
        closeDialog(); // Ensure this is being called on success
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
      EmployeeDepartment: employee.EmployeeDepartment
    });
    setSelectedEmployee(employee);
    setIsDialogOpen(true);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.EmployeeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Button onClick={handleClick} variant="gradient" className="bg-gradient-to-r from-blue-gray-800 to-blue-gray-900 text-white text-sm">
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
                  <label htmlFor="employeeName" className="text-gray-700 font-semibold mb-2">Employee Name</label>
                  <Input
                    id="employeeName"
                    type="text"
                    color="lightBlue"
                    placeholder="Enter employee name"
                    name="EmployeeName"
                    value={selectedEmployee ? editedEmployee.EmployeeName : formData.EmployeeName}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="employeeEmail" className="text-gray-700 font-semibold mb-2">Employee Email</label>
                  <Input
                    id="employeeEmail"
                    type="email"
                    color="lightBlue"
                    placeholder="Enter employee email"
                    name="EmployeeEmail"
                    value={selectedEmployee ? editedEmployee.EmployeeEmail : formData.EmployeeEmail}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="Password" className="text-gray-700 font-semibold mb-2">Password</label>
                  <Input
                    type="password"
                    id="Password"
                    color="lightBlue"
                    placeholder="Enter employee password"
                    name="Password"
                    value={selectedEmployee ? editedEmployee.Password : formData.Password}
                    onChange={handleInputChange}
                    required
                    className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700 font-semibold mb-2">Role</label>
                  <Slider
                    id="role-slider"
                    min={0}
                    max={1}
                    step={1}
                    value={selectedEmployee ? editedEmployee.Role === "Admin" ? 1 : 0 : formData.Role === "Admin" ? 1 : 0}
                    onChange={(value) => handleRoleChange(value)}
                  />
                  <div className="flex justify-between">
                    <span>Employee</span>
                    <span>Admin</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="ReportsTo" className="text-gray-700 font-semibold mb-2">Reports To</label>
                  <Input
                    id="ReportsTo"
                    type="text"
                    placeholder="Enter Reports To"
                    name="ReportsTo"
                    value={selectedEmployee ? editedEmployee.ReportsTo : formData.ReportsTo}
                    onChange={handleInputChange}
                    required
                    className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="Designation" className="text-gray-700 font-semibold mb-2">Designation</label>
                  <Input
                    id="Designation"
                    type="text"
                    placeholder="Enter Designation"
                    name="Designation"
                    value={selectedEmployee ? editedEmployee.Designation : formData.Designation}
                    onChange={handleInputChange}
                    required
                    className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="Branch" className="text-gray-700 font-semibold mb-2">Branch</label>
                  <Input
                    id="Branch"
                    type="text"
                    placeholder="Enter Branch"
                    name="Branch"
                    value={selectedEmployee ? editedEmployee.Branch : formData.Branch}
                    onChange={handleInputChange}
                    required
                    className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="Location" className="text-gray-700 font-semibold mb-2">Location</label>
                  <Input
                    id="Location"
                    type="text"
                    placeholder="Enter Location"
                    name="Location"
                    value={selectedEmployee ? editedEmployee.Location : formData.Location}
                    onChange={handleInputChange}
                    required
                    className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="EmployeeDepartment" className="text-gray-700 font-semibold mb-2">Department</label>
                  <Input
                    id="EmployeeDepartment"
                    type="text"
                    placeholder="Enter Department"
                    name="EmployeeDepartment"
                    value={selectedEmployee ? editedEmployee.EmployeeDepartment : formData.EmployeeDepartment}
                    onChange={handleInputChange}
                    required
                    className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-center gap-5 mt-6">
                <Button type="submit" color="lightBlue" variant="gradient" className="bg-gradient-to-r from-green-400 to-green-600 text-white">
                  {selectedEmployee ? "Update Employee" : "Add Employee"}
                </Button>
                <Button onClick={closeDialog} color="gray" variant="text" className="hover:bg-gray-200">
                  Close
                </Button>
              </div>
            </form>
          </Dialog>
          {loading ? (
            <div className="flex justify-center items-center h-80">
              <Spinner color="blue-500" className="w-16 h-16" />
            </div>
          ) : (
            <table className="w-full mt-5 text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-2 text-left">Name</th>
                  <th className="py-3 px-2 text-left">Role</th>
                  <th className="py-3 px-2 text-left">Email</th>
                  <th className="py-3 px-2 text-left">Department</th>
                  <th className="py-3 px-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-2 text-center">No employees found</td>
                  </tr>
                ) : (
                  filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="py-2 px-2">{employee.EmployeeName}</td>
                      <td className="py-2 px-2">{employee.Role}</td>
                      <td className="py-2 px-2">{employee.EmployeeEmail}</td>
                      <td className="py-2 px-2">{employee.EmployeeDepartment}</td>
                      <td className="py-2 px-2 flex gap-5">
                      <Button
                          onClick={() => handleEdit(employee)}
                          variant="outlined"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(employee)}
                          variant="filled"
                          className="bg-red-500 hover:bg-red-700 text-white"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default EmployeeList;