import React, { useState } from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"

function Register() {
    const [formData, setFormData] = useState({
        "username":"",
        "password" :"",
        "expenses": [

        ],
        "income": [

        ]
        
    })
    const [formData2, setFormData2] = useState({
        "username":"",
        "password" :""
        
        
})
    const navigate= useNavigate()
    const handleSubmit= async(e)=>{
        e.preventDefault()
        
        await axios.post("/api/register", formData, { withCredentials: true,})
        navigate("/expenses")
       
    }
    const handleSubmit2 = async(e)=>{
        e.preventDefault()
        await axios.post("/api/login", formData2, { withCredentials: true,})
        
        navigate("/expenses")}

    const handleChange=(e)=>{ setFormData({...formData, [e.target.name]: e.target.value})}
    const handleChange2=(e)=>{ setFormData2({...formData2, [e.target.name]: e.target.value})}
    return(
        <>
       <h1>Welcome to the Expense Tracker!</h1>
        <h2>Register</h2>
       <div id="div">
        <form onSubmit={handleSubmit}>
          username:  <input name="username" type="text" value={formData.username} onChange={handleChange}/>
          password   <input name="password" type="password" value={formData.password} onChange={handleChange}/>
          <button type="submit">submit</button>
        </form>
        </div>
        <h2>Login</h2>
        <div>
        <form onSubmit={handleSubmit2}>
        username:  <input name="username" type="text" value={formData2.username} onChange={handleChange2}/>
        password   <input name="password" type="password" value={formData2.password} onChange={handleChange2}/>
        <button type="submit">submit for login</button>
        </form>
        </div>
      
        </>
    )
}
export default Register