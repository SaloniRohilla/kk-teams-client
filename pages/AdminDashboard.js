
import Link from 'next/link';

const AdminDashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "250px", background: "#f0f0f0", padding: "1rem" }}>
        <ul>
          <li><Link href="/admin/manage-employees">Manage Employees</Link></li>
          <li><Link href="/admin/manage-announcements">Announcements</Link></li>
          <li><Link href="/admin/leave-requests">Leave Requests</Link></li>
          <li><Link href="/admin/employee-profile">Employee Profile</Link></li>
          <li><Link href="/admin/holiday-calendar">Holiday Calendar</Link></li>
          <li><Link href="/admin/manage-departments">Manage Departments</Link></li>

        </ul>
      </aside>
      <main style={{ marginLeft: "250px", padding: "1rem" }}>
        <h1>Admin Dashboard</h1>
      </main>
    </div>
  );
};

export default AdminDashboard;
