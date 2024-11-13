import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import { useState  } from "react";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [err, setErr] = useState(null);
  const [inputs,setinputs]=useState({
    username: "",
    password: ""
  })
  const navigate=useNavigate()
  const handleChange=(e)=>{
    setinputs((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  console.log(inputs)
  const handleLogin= async (e)=>{
    e.preventDefault();
    // Send data to server
    try{
      await login(inputs)
      navigate("/")
    }catch(err){
      setErr(err.response.data)
    }
  }

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onClick={handleChange}/>
            <input type="password" placeholder="Password" name="password" onClick={handleChange}/>
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
