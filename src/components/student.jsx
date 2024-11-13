import axios from 'axios';
import { useEffect, useState } from "react";

function Student() {
  const [studentid, setId] = useState('');
  const [studentname, setName] = useState("");
  const [studentaddress, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [students, setUsers] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("http://localhost:8081/api/v1/student/getall");
    setUsers(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8081/api/v1/student/save", {
        studentname,
        studentaddress,
        mobile
      });
      alert("Student Registration Successful");
      setId("");
      setName("");
      setAddress("");
      setMobile("");
      Load();
    } catch (err) {
      alert("User Registration Failed");
    }
  }

  async function editStudent(student) {
    setName(student.studentname);
    setAddress(student.studentaddress);
    setMobile(student.mobile);
    setId(student._id);
  }

  async function DeleteStudent(studentid) {
    await axios.delete("http://localhost:8081/api/v1/student/delete/" + studentid);
    alert("Student deleted Successfully");
    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.put("http://localhost:8081/api/v1/student/edit/" + studentid, {
        studentname,
        studentaddress,
        mobile
      });
      alert("Registration Updated");
      setId("");
      setName("");
      setAddress("");
      setMobile("");
      Load();
    } catch (err) {
      alert("Student Update Failed");
    }
  }

  return (
    <div className="app-background">
      <div className="container">
        <h1>Student Details</h1>
        <form onSubmit={studentid ? update : save}>
          <div className="form-group">
            <label>Student Name</label>
            <input type="text" className="form-control" id="studentname"
              value={studentname} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Student Address</label>
            <input type="text" className="form-control" id="studentaddress"
              value={studentaddress} onChange={(e) => setAddress(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Mobile</label>
            <input type="text" className="form-control" id="mobile"
              value={mobile} onChange={(e) => setMobile(e.target.value)} />
          </div>

          <button type="submit" className="button-save">
            {studentid ? "Update" : "Save"}
          </button>
        </form>

        <div className="student-list">
          <h2>Registered Students</h2>
          {students.map(student => (
            <div key={student._id} className="student-card">
              <p><strong>Name:</strong> {student.studentname}</p>
              <p><strong>Address:</strong> {student.studentaddress}</p>
              <p><strong>Mobile:</strong> {student.mobile}</p>
              <button onClick={() => editStudent(student)} className="button-edit">Edit</button>
              <button onClick={() => DeleteStudent(student._id)} className="button-delete">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Student;
