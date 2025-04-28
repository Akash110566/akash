import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [name, setName] = useState('')
  const [regno, setRegno] = useState('')
  const [cgpa, setCGPA] = useState('0.0')
  const [dept, setDept] = useState('')
  const [students, setStudents] = useState([])


  const saveStudent = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/savestudent',
        { name, regno, cgpa, dept })
      alert(response.data.message)
    }
    catch (err) {
      alert(err)
    }
  }

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/getstudents');
      setStudents(response.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch students');
    }
  }


  return (
    <div>
      <h1>Save Student Details</h1>
      <form onSubmit={saveStudent}>
        <div>
          <label>Name:</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
          <br />
          <label>Regno:</label>
          <input type="number" onChange={(e) => setRegno(e.target.value)} />
          <br />
          <label>CGPA:</label>
          <input type="number" onChange={(e) => setCGPA(e.target.value)} />
          <br />
          <label>Dept:</label>
          <input type="text" onChange={(e) => setDept(e.target.value)} />
          <br />
          <br />
          <button>Save Student </button>
        </div>
      </form>
      <br />
      <button onClick={fetchStudents}>view</button>

      <h1>All STUDENTS</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Regno</th>
            <th>CGPA</th>
            <th>Dept</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td className="border border-gray-400 px-4 py-2">{student.name}</td>
              <td className="border border-gray-400 px-4 py-2">{student.regno}</td>
              <td className="border border-gray-400 px-4 py-2">{student.cgpa}</td>
              <td className="border border-gray-400 px-4 py-2">{student.dept}</td>
            </tr>
          ))}
        </tbody>
      </table>



    </div>

  )
}

export default App
