import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard(){
  const [user,setUser] = useState({});

  useEffect(()=>{
    const token = localStorage.getItem("token");

    if(!token){
      window.location.href = "/login";
      return;
    }

    axios.get("https://fsd-mse2-backend.onrender.com/api/dashboard",{
      headers:{token}
    })
    .then(res=>{
      setUser(res.data);
    })
    .catch(err=>{
      console.log(err);
      alert("Session expired, login again");
      localStorage.removeItem("token");
      window.location.href = "/login";
    });

  },[]);

  const logout = ()=>{
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return(
    <div className="container">
      <h2>Dashboard</h2>

      <p><b>Name:</b> {user.name || "Loading..."}</p>
      <p><b>Email:</b> {user.email || "Loading..."}</p>
      <p><b>Course:</b> {user.course || "Loading..."}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
