import axios from "axios";
import { useState } from "react";

function Register(){
  const [form,setForm] = useState({});

 const submit = async ()=>{
  try{
    await axios.post("https://your-backend.onrender.com/api/register",form);

    alert("Registered Successfully");
    setForm({});

    window.location.href = "/login";

  }catch(err){
    alert(err.response?.data || "Registration Failed");
  }
}

  return (
  <div className="container">
    <h2>Register</h2>
    <form>
      <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
      <input placeholder="Course" onChange={e=>setForm({...form,course:e.target.value})}/>
      <button type="button" onClick={submit}>Register</button>
    </form>
  </div>
)
}
export default Register;
