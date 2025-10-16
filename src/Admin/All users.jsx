import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { context } from "../context";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { handleedit, handledelete } = useContext(context)

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/auth/users");
      setUsers(response.data.users)
    } catch (err) {
      console.log(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-lg text-blue-600">Loading users...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg p-3">
        <table className="table-auto w-full border-collapse border border-gray-300 w-100">
          <thead className="bg-gray-200 text-center">
            <tr>
              <th className="border border-gray-300 px-4 py-2">First Name</th>
              <th className="border border-gray-300 px-4 py-2">Last Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Gender</th>
              <th className="border border-gray-300 px-4 py-2">Country</th>
              <th className="border border-gray-300 px-4 py-2">Accepted Terms</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="text-center hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{user.fname}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.lname}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.gender}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.country}</td>
                  <td className="border border-gray-300 px-4 py-2"> ✅ Yes </td>
                  <td className="border border-gray-300 px-4 py-2 d-flex gap-2">
                    <button className="bg-success border-0 text-light" onClick={handleedit}>Edit</button>
                    <button className="bg-danger border-0 text-light" onClick={() => handledelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4"> No users found </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}