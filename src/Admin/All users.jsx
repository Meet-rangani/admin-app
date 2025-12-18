import React, { useContext } from "react";
import { context } from "../context";

export default function UsersTable() {

  const { handleeditadmin, handledelete, edituser, setedituser, handleedituser, handlechageuser, editref,  users, loading } = useContext(context)

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
                    <button className="bg-success border-0 text-light" onClick={() => handleedituser(user)}>Edit</button>
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

        {edituser && (
          <div className="d-flex justify-content-center align-items-center" ref={editref}>
            <div className="d-flex flex-column align-items-center card p-4 shadow-lg h-auto" style={{ width: "400px", borderRadius: "20px", textAlign: "center", position: "absolute", top: "56px" }}>
              <h4 style={{marginBottom: "16px"}}>{edituser?.fname} {edituser?.lname}</h4>
              <input type="text" defaultValue={edituser.fname} className="form-control mb-2" onChange={handlechageuser} name="fname" />
              <input type="text" defaultValue={edituser.lname} className="form-control mb-2" onChange={handlechageuser} name="lname" />
              <input type="text" defaultValue={edituser.email} className="form-control mb-2" onChange={handlechageuser} name="email" />
              <input type="text" defaultValue={edituser.phone} className="form-control mb-2" onChange={handlechageuser} name="phone" />
              <div className="mb-3 w-100 text-start d-flex gap-3">
                <input type="radio" className="form-check-input" name="gender" value="Male" checked={edituser.gender === "Male"} onChange={handlechageuser} />
                <label className="form-check-label">Male</label>  
                <input type="radio" className="form-check-input" name="gender" value="Female" checked={edituser.gender === "Female"} onChange={handlechageuser}/>
                <label className="form-check-label">Female</label>
              </div>
              <div className="mb-3 w-100">
                <select className="form-select" name="country" value={edituser.country} onChange={handlechageuser}>
                  <option value="" disabled>Select Country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
              <div className="d-flex gap-3">
                <button className="btn btn-success" onClick={() => handleeditadmin(edituser, edituser._id)}>Update</button>
                <button className="btn btn-secondary" onClick={() => setedituser(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}