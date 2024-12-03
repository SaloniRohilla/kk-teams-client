import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios.get('/api/users/profile')
      .then(response => {
        setEmployee(response.data);
      })
      .catch(error => console.error('Error fetching employee profile:', error));
  }, []);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Employee Profile</h1>
      <p>Name: {employee.name}</p>
      <p>Email: {employee.email}</p>
      <p>Department: {employee.department}</p>
    </div>
  );
};

export default EmployeeProfile;
