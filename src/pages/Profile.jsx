import { useContext, useState, useEffect } from "react";
import { context } from "../context";
import Avatar from "react-avatar";

function Profile() {
  const { handlelogout, handleedit, user } = useContext(context);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(user || {});
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarUrl || "");

  useEffect(() => {
    setEditData(user || {});
    setAvatarPreview(user?.avatarUrl || "");
  }, [user]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    if (file) setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    const formData = new FormData();
    Object.keys(editData).forEach((key) => formData.append(key, editData[key]));
    if (avatarFile) formData.append("avatar", avatarFile);

    await handleedit(formData); 
    setIsEditing(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column align-items-center card p-4 shadow-lg" style={{ width: "400px", borderRadius: "20px", textAlign: "center" }}>
        <Avatar src={avatarPreview} name={user?.fname + " " + user?.lname} size="100" round={true} style={{marginBottom: "15px"}} />

        {!isEditing ? (
          <>
            <h4 style={{marginBottom: "16px"}}><strong>Name:</strong> {user?.fname} {user?.lname}</h4>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Mobile:</strong> {user?.phone}</p>
            <p><strong>Gender:</strong> {user?.gender}</p>
            <p><strong>Country:</strong> {user?.country}</p>
            <div className="d-flex gap-3 mt-2">
              <button className="btn btn-outline-success" onClick={() => setIsEditing(true)}>Edit</button>
              <button className="btn btn-outline-danger" onClick={handlelogout}>Logout</button>
            </div>
          </>
        ) : (
          <>
            <input type="file" onChange={handleAvatarChange} className="form-control mb-2" />
            <input type="text" name="fname" value={editData.fname} onChange={handleChange} className="form-control mb-2" />
            <input type="text" name="lname" value={editData.lname} onChange={handleChange} className="form-control mb-2" />
            <input type="email" name="email" value={editData.email} onChange={handleChange} className="form-control mb-2" />
            <input type="text" name="phone" value={editData.phone} onChange={handleChange} className="form-control mb-2" />
            <div className="mb-3 w-100 text-start d-flex gap-3">
              <input type="radio" className="form-check-input" name="gender" value="Male" checked={"editData.gender"} onChange={handleChange} required />
              <label className="form-check-label">Male</label>
              <input type="radio" className="form-check-input" name="gender" value="Female" checked={"editData.gender"} onChange={handleChange}/>
              <label className="form-check-label">Female</label>
            </div>
            <div className="mb-3 w-100">
              <select className="form-select" name="country" onChange={handleChange} required>
                <option value="" disabled>Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
              </select>
            </div>

            <div className="d-flex gap-3 mt-2">
              <button className="btn btn-success" onClick={handleSave}>Save</button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
