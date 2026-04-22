import axios from "axios";
import { useState } from "react";

function Login() {
  const [form, setForm] = useState({});

  const login = async () => {
    try {
     const res=await axios.post("https://fsd-backend-demo.onrender.com/api/login", form)

      localStorage.setItem("token", res.data.token);

      alert("Login Success");
      window.location.href = "/dashboard";

    } catch {
      alert("Login Failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form>
        <input
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button type="button" onClick={login}>Login</button>
      </form>
    </div>
  );
}

export default Login;
