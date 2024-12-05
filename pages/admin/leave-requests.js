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
        console.error('Error fetching leave requests:', err);
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
      const url = status === 'approved'
        ? `http://localhost:5000/api/leave-requests/${id}/approve`
        : `http://localhost:5000/api/leave-requests/${id}/reject`;

      const response = await axios.patch(url); // Use PATCH instead of PUT

      // Directly update the status in the frontend after successful update
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status: response.data.leaveRequest.status } : request
        )
      );
    } catch (err) {
      console.error('Error updating leave request:', err);
      // Optionally display an error message here if needed
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
            <strong>{request.userId || 'Unknown User'}</strong> -{' '}
            <span>{new Date(request.startDate).toLocaleDateString()} to {new Date(request.endDate).toLocaleDateString()}</span> -{' '}
            <span
              style={{
                color: request.status === 'approved' ? 'green' : request.status === 'rejected' ? 'red' : 'orange',
              }}
            >
              {request.status === 'approved' ? 'Leave Approved' : request.status === 'rejected' ? 'Leave Rejected' : 'Pending'}
            </span>
            <button onClick={() => updateLeaveRequest(request._id, 'approved')} style={{ marginLeft: '10px' }}>
              Approve
            </button>
            <button onClick={() => updateLeaveRequest(request._id, 'rejected')} style={{ marginLeft: '5px' }}>
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveRequests;
