import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('/api/leave-requests')
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => console.error('Error fetching leave requests:', error));
  }, []);

  return (
    <div>
      <h1>Leave Requests</h1>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            {request.employee.name} - {request.leaveType} - {request.status}
            <button onClick={() => updateLeaveRequest(request._id, 'approved')}>Approve</button>
            <button onClick={() => updateLeaveRequest(request._id, 'rejected')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const updateLeaveRequest = async (id, status) => {
  try {
    await axios.put(`/api/leave-requests/${id}`, { status });
    alert(`Leave request ${status}`);
  } catch (err) {
    console.error('Failed to update leave request', err);
  }
};

export default LeaveRequests;
