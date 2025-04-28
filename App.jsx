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

  const fetchStudents = async (event) => {
    try {
      const response = await axios.get('http://localhost:8000/getstudents')
      setStudents(response.data)
    } catch (err) {
      console.error(err)
      alert('Failed to fetch student')
    }
  }


  return (
    <div>
      <h1>Student details</h1>
      <form onSubmit={saveStudent}>
        <div>
          <label>Name:</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
          <br />
          <label>Reg no:</label>
          <input type="text" onChange={(e) => setRegno(e.target.value)} />
          <br />
          <label>CGPA:</label>
          <input type="text" onChange={(e) => setCGPA(e.target.value)} />
          <br />
          <label>Dept:</label>
          <input type="text" onChange={(e) => setDept(e.target.value)} />
          <br />
          <button>Save Student</button>
        </div>
      </form>

      <button onClick={fetchStudents}>View details</button>

      <h2>ALL STUDENTS</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Reg no</th>
            <th>CGPA</th>
            <th>Dept</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student, index) => (
            <tr key={index} >
              <td>{student.name}</td>
              <td>{student.regno}</td>
              <td>{student.cgpa}</td>
              <td>{student.dept}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

export default App
