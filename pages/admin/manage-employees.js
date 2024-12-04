import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  // Fetch employee data on initial render
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees/employees');
        setEmployees(response.data);
      } catch (err) {
        setError('Failed to fetch employees');
      }
    };
    fetchEmployees();
  }, []);

  // Handle employee creation
  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/employees/employees', {
        name: newEmployee.name,
        email: newEmployee.email,
        password: 'defaultPassword123', // Handle password securely
      });
      setSuccess('Employee created successfully');
      setNewEmployee({ name: '', email: '' }); // Clear form after creation
      setEmployees([...employees, response.data]); // Add new employee to list
    } catch (err) {
      setError('Failed to create employee');
    }
  };

  // Handle employee deletion
  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/employees/${id}`);
      setSuccess('Employee deleted successfully');
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (err) {
      setError('Failed to delete employee');
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <div>
      <h1>Manage Employees</h1>
      
      {success && <div style={{ color: 'green' }}>{success}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <form onSubmit={handleCreateEmployee}>
        <h3>Create New Employee</h3>
        <input
          type="text"
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newEmployee.email}
          onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
          required
        />
        <button type="submit">Create Employee</button>
      </form>

      <h3>Employee List</h3>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.name} - {employee.email}
            <button onClick={() => handleDeleteEmployee(employee._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageEmployees;
