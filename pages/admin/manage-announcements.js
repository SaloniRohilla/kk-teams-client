import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/announcements');
      setAnnouncements(response.data);
    } catch (err) {
      console.error('Error fetching announcements:', err);
      setError('Failed to fetch announcements');
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    setNewAnnouncement({
      ...newAnnouncement,
      [e.target.name]: e.target.value
    });
  };

  // Create announcement
  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/announcements', newAnnouncement);
      
      // Add new announcement to list
      setAnnouncements([response.data, ...announcements]);
      
      // Reset form
      setNewAnnouncement({ title: '', content: '' });
      setShowForm(false);
      setError(null);
    } catch (err) {
      console.error('Failed to create announcement', err);
      setError('Failed to create announcement');
    }
  };

  // Delete announcement
  const deleteAnnouncement = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/announcements/${id}`);
      
      // Remove announcement from local state
      setAnnouncements(announcements.filter(announcement => announcement._id !== id));
      
      setError(null);
    } catch (err) {
      console.error('Failed to delete announcement', err);
      setError('Failed to delete announcement');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Announcements</h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          {error}
        </div>
      )}

      {/* Create Announcement Button */}
      <button 
        onClick={() => setShowForm(!showForm)}
        className="mb-4 px-4 py-2 bg-blue-500 text-black rounded"
      >
        {showForm ? 'Cancel' : 'Create Announcement'}
      </button>

      {/* Create Announcement Form */}
      {showForm && (
        <form onSubmit={handleCreateAnnouncement} className="mb-4">
          <input
            type="text"
            name="title"
            placeholder="Announcement Title"
            value={newAnnouncement.title}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            name="content"
            placeholder="Announcement Content"
            value={newAnnouncement.content}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded mb-2"
          />
          <button 
            type="submit" 
            className="px-4 py-2 bg-green-500 text-black rounded"
          >
            Create Announcement
          </button>
        </form>
      )}

      {/* Announcements List */}
      <div>
        {announcements.map((announcement) => (
          <div 
            key={announcement._id} 
            className="border p-4 mb-4 rounded shadow-md"
          >
            <h2 className="text-xl font-semibold">{announcement.title}</h2>
            <p className="mt-2">{announcement.content}</p>
            <button 
              onClick={() => deleteAnnouncement(announcement._id)}
              className="mt-2 px-4 py-2 bg-red-500 text-black rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAnnouncements;