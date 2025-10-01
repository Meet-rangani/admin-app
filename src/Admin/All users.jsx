import { useState, useEffect } from 'react';

export default function UserDataTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // AJAX call using fetch
      const response = await fetch('http://localhost:5000/api/auth/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      // Handle response structure: { message: "...", users: [...] }
      setUsers(data.users || data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-semibold mb-2">Error Loading Users</h3>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchUsers}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-3 rounded-lg">
                <span className="text-white text-2xl">👥</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
                <p className="text-gray-500 mt-1">Total Users: {users.length}</p>
              </div>
            </div>
            <button 
              onClick={fetchUsers}
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">First Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Last Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Gender</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Country</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      <div className="text-6xl mb-3">👥</div>
                      <p className="text-lg">No users found</p>
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr 
                      key={user._id || index} 
                      className="border-b border-gray-200 hover:bg-indigo-50 transition"
                    >
                      <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                        {user.fname}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                        {user.lname}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <span>📧</span>
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <span>📱</span>
                          {user.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          user.gender === 'Male' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-pink-100 text-pink-700'
                        }`}>
                          <span>{user.gender === 'Male' ? '👨' : '👩'}</span>
                          {user.gender}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <span>🌍</span>
                          {user.country}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}