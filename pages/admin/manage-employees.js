import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ 
    name: '', 
    email: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  // Fetch employee data on initial render
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token-based auth
          }
        });
        setEmployees(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch employees');
        console.error(err);
      }
    };

    fetchEmployees();
  }, []);

  // Handle employee creation
  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate inputs
    if (!newEmployee.name || !newEmployee.email || !newEmployee.password) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/employees', {
        name: newEmployee.name,
        email: newEmployee.email,
        password: newEmployee.password
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token-based auth
        }
      });

      // Extract the created employee from the response
      const createdEmployee = response.data.employee;

      setSuccess(response.data.message || 'Employee created successfully');
      setNewEmployee({ name: '', email: '', password: '' }); // Clear form after creation
      setEmployees([...employees, createdEmployee]); // Add new employee to list
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to create employee';
      setError(errorMessage);
      console.error(err.response ? err.response.data : err);
    }
  };

  // Handle employee deletion
  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token-based auth
        }
      });

      setSuccess('Employee deleted successfully');
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to delete employee';
      setError(errorMessage);
      console.error(err.response ? err.response.data : err);
    }
  };

  // Handle employee update
  const handleUpdateEmployee = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/employees/${id}`, updatedData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token-based auth
        }
      });

      // Update the employee in the list
      setEmployees(employees.map(emp => 
        emp._id === id ? response.data : emp
      ));

      setSuccess('Employee updated successfully');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to update employee';
      setError(errorMessage);
      console.error(err.response ? err.response.data : err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Employees</h1>

      {/* Success and Error Messages */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          {error}
        </div>
      )}

      {/* Create Employee Form */}
      <form onSubmit={handleCreateEmployee} className="mb-6 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl mb-4">Create New Employee</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={newEmployee.name}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={newEmployee.email}
            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={newEmployee.password}
            onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Employee
        </button>
      </form>

      {/* Employee List */}
      <div>
        <h2 className="text-xl mb-4">Employee List</h2>
        <ul className="space-y-2">
          {employees.map((employee) => (
            <li 
              key={employee._id} 
              className="flex justify-between items-center bg-white shadow-md rounded px-4 py-2"
            >
              <div>
                <span className="font-bold">{employee.name}</span> - {employee.email}
              </div>
              <button
                onClick={() => handleDeleteEmployee(employee._id)}
                className="bg-red-500 hover:bg-red-700 text-color font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageEmployees;