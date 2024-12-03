import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios.get('/api/announcements')
      .then(response => {
        setAnnouncements(response.data);
      })
      .catch(error => console.error('Error fetching announcements:', error));
  }, []);

  return (
    <div>
      <h1>Manage Announcements</h1>
      <button onClick={createAnnouncement}>Create Announcement</button>
      <ul>
        {announcements.map((announcement) => (
          <li key={announcement._id}>
            {announcement.title}
            <button onClick={() => deleteAnnouncement(announcement._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const createAnnouncement = () => {
  // Handle the creation of a new announcement (you can use a modal/form here)
  console.log('Creating new announcement');
};

const deleteAnnouncement = async (id) => {
  try {
    await axios.delete(`/api/announcements/${id}`);
    alert('Announcement deleted successfully');
  } catch (err) {
    console.error('Failed to delete announcement', err);
  }
};

export default ManageAnnouncements;
