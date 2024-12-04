import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch leave requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        console.log('Attempting to fetch leave requests...');
        const response = await axios.get('http://localhost:5000/api/leave-requests');
        console.log('Response received:', response.data);
        setRequests(response.data);
      } catch (err) {
        console.error('Full error object:', err);
        console.error('Error response:', err.response);
        console.error('Error message:', err.message);
        setError(err.response?.data?.error || 'Failed to fetch leave requests');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Update leave request status
  const updateLeaveRequest = async (id, status) => {
    try {
      const response = await axios.put(`/api/leave-requests/${id}`, { status });
      alert(`Leave request ${status}`);
      // Update the status in the frontend after successful update
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status: response.data.status } : request
        )
      );
    } catch (err) {
      console.error('Failed to update leave request', err);
      alert('Failed to update leave request. Please try again.');
    }
  };

  if (loading) return <p>Loading leave requests...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Leave Requests</h1>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            <strong>{request.employee?.name || 'Unknown Employee'}</strong> -{' '}
            <span>{request.leaveType || 'General Leave'}</span> -{' '}
            <span style={{ color: request.status === 'approved' ? 'green' : 'red' }}>
              {request.status || 'Pending'}
            </span>
            <button onClick={() => updateLeaveRequest(request._id, 'approved')}>
              Approve
            </button>
            <button onClick={() => updateLeaveRequest(request._id, 'rejected')}>
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveRequests;
