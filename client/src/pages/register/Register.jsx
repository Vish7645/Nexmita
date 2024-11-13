import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [err, setErr] = useState(null);
  const [inputs,setinputs]=useState({
    username: "",
    email: "",
    password: "",
    name: "",
  })
  const handleChange=(e)=>{
    setinputs((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  console.log(inputs)
  const handleSubmit= async (e)=>{
    e.preventDefault();
    // Send data to server
    try{
      await axios.post("http://localhost:5050/api/auth/register",inputs)
    }catch(err){
      setErr(err.response.data)
    }
  }
  
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onClick={handleChange}/>
            <input type="email" placeholder="Email" name="email" onClick={handleChange}/>
            <input type="password" placeholder="Password" name="password" onClick={handleChange}/>
            <input type="text" placeholder="Name" name="name" onClick={handleChange}/>
            {err && err}
            <button onClick={handleSubmit}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
