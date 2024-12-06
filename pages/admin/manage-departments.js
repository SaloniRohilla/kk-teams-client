import React, { useState, useEffect } from 'react';

const ManageDepartments = () => {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [newDepartment, setNewDepartment] = useState({ name: '', description: '' });
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [error, setError] = useState(null);

    // Fetch all departments
    const fetchDepartments = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/departments');
            if (!response.ok) throw new Error('Failed to fetch departments');
            const data = await response.json();
            setDepartments(data);
        } catch (err) {
            setError('Error fetching departments');
            console.error('Error fetching departments:', err);
        }
    };

    // Fetch all users
    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users');
            if (!response.ok) throw new Error('Failed to fetch users');
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError('Error fetching users');
            console.error('Error fetching users:', err);
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchDepartments();
        fetchUsers();
    }, []);

    // Fetch specific department details
    const fetchDepartmentDetails = async (departmentId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/departments/${departmentId}`);
            if (!response.ok) throw new Error('Failed to fetch department details');
            const data = await response.json();
            setSelectedDepartment(data);
        } catch (err) {
            setError('Error fetching department details');
            console.error('Error fetching department details:', err);
        }
    };

    // Create a new department
    const handleCreateDepartment = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/departments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDepartment)
            });
            if (!response.ok) throw new Error('Failed to create department');
            const data = await response.json();
            setDepartments([...departments, data]);
            setNewDepartment({ name: '', description: '' });
            fetchDepartments(); // Refresh the list
        } catch (err) {
            setError('Error creating department');
            console.error('Error creating department:', err);
        }
    };

    // Update department
    const handleUpdateDepartment = async (e) => {
        e.preventDefault();
        if (!selectedDepartment) return;

        try {
            const response = await fetch(`http://localhost:5000/api/departments/${selectedDepartment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    name: selectedDepartment.name, 
                    description: selectedDepartment.description 
                })
            });
            if (!response.ok) throw new Error('Failed to update department');
            const data = await response.json();
            
            // Update departments list
            setDepartments(departments.map(dept => 
                dept._id === data._id ? data : dept
            ));
            
            // Update selected department
            setSelectedDepartment(data);
            
            fetchDepartments(); // Refresh the list
        } catch (err) {
            setError('Error updating department');
            console.error('Error updating department:', err);
        }
    };

    // Delete department
    const handleDeleteDepartment = async () => {
        if (!selectedDepartment) return;

        try {
            const response = await fetch(`http://localhost:5000/api/departments/${selectedDepartment._id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete department');
            
            // Remove from departments list
            setDepartments(departments.filter(dept => dept._id !== selectedDepartment._id));
            
            // Clear selected department
            setSelectedDepartment(null);
            
            fetchDepartments(); // Refresh the list
        } catch (err) {
            setError('Error deleting department');
            console.error('Error deleting department:', err);
        }
    };

    // Add member to department
    const handleAddMember = async () => {
        if (!selectedDepartment || !selectedUser) return;

        try {
            const response = await fetch(`http://localhost:5000/api/departments/${selectedDepartment._id}/add-member`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: selectedUser })
            });
            if (!response.ok) throw new Error('Failed to add member');
            
            const data = await response.json();
            setSelectedDepartment(data);
            setSelectedUser('');
            
            // Refresh department details
            fetchDepartmentDetails(selectedDepartment._id);
        } catch (err) {
            setError('Error adding member');
            console.error('Error adding member:', err);
        }
    };

    // Remove member from department
    const handleRemoveMember = async (userId) => {
        if (!selectedDepartment) return;

        try {
            const response = await fetch(
                `http://localhost:5000/api/departments/${selectedDepartment._id}/remove-member/${userId}`, 
                { method: 'DELETE' }
            );
            if (!response.ok) throw new Error('Failed to remove member');
            
            const data = await response.json();
            setSelectedDepartment(data);
            
            // Refresh department details
            fetchDepartmentDetails(selectedDepartment._id);
        } catch (err) {
            setError('Error removing member');
            console.error('Error removing member:', err);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Department Management</h1>

            {/* Error Display */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Main Content Grid */}
            <div className="grid grid-cols-3 gap-4">
                {/* Department List */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Departments</h2>
                    <ul className="border rounded">
                        {departments.map(dept => (
                            <li 
                                key={dept._id} 
                                className={`p-2 cursor-pointer ${selectedDepartment?._id === dept._id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                                onClick={() => fetchDepartmentDetails(dept._id)}
                            >
                                {dept.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Department Details */}
                <div>
                    {selectedDepartment && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Department Details</h2>
                            <form onSubmit={handleUpdateDepartment} className="border p-4 rounded">
                                <input
                                    type="text"
                                    value={selectedDepartment.name}
                                    onChange={(e) => setSelectedDepartment({
                                        ...selectedDepartment, 
                                        name: e.target.value
                                    })}
                                    className="w-full border p-2 mb-2"
                                    placeholder="Department Name"
                                />
                                <textarea
                                    value={selectedDepartment.description}
                                    onChange={(e) => setSelectedDepartment({
                                        ...selectedDepartment, 
                                        description: e.target.value
                                    })}
                                    className="w-full border p-2 mb-2"
                                    placeholder="Department Description"
                                />
                                <div className="flex justify-between">
                                    <button 
                                        type="submit" 
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Update Department
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={handleDeleteDepartment}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Delete Department
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                {/* Department Members */}
                <div>
                    {selectedDepartment && (
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Department Members</h2>
                            <div className="border p-4 rounded">
                                {/* Add Member Section */}
                                <div className="mb-2">
                                    <select
                                        value={selectedUser}
                                        onChange={(e) => setSelectedUser(e.target.value)}
                                        className="w-full border p-2"
                                    >
                                        <option value="">Select a user to add</option>
                                        {users.map(user => (
                                            <option key={user._id} value={user._id}>
                                                {user.name} - {user.email}
                                            </option>
                                        ))}
                                    </select>
                                    <button 
                                        onClick={handleAddMember}
                                        className="w-full bg-green-500 text-white p-2 mt-2 rounded"
                                    >
                                        Add Member
                                    </button>
                                </div>

                                {/* Current Members */}
                                <h3 className="font-semibold mt-4">Current Members:</h3>
                                <ul>
                                    {selectedDepartment.members && selectedDepartment.members.map(member => (
                                        <li 
                                            key={member._id} 
                                            className="flex justify-between items-center border-b p-2"
                                        >
                                            <div>
                                                {member.name} - {member.email}
                                            </div>
                                            <button 
                                                onClick={() => handleRemoveMember(member._id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Create New Department */}
            <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Create New Department</h2>
                <form onSubmit={handleCreateDepartment} className="border p-4 rounded">
                    <input
                        type="text"
                        value={newDepartment.name}
                        onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                        className="w-full border p-2 mb-2"
                        placeholder="Department Name"
                        required
                    />
                    <textarea
                        value={newDepartment.description}
                        onChange={(e) => setNewDepartment({...newDepartment, description: e.target.value})}
                        className="w-full border p-2 mb-2"
                        placeholder="Department Description"
                    />
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Create Department
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ManageDepartments;