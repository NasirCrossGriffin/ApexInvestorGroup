import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './styles/AdminLogin.css'
import { login } from '../middleware/admin.tsx';

function AdminLogin() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const loginData = {
      username : username,
      password : password
    }

    try {
      const authenticate = await login(loginData);

      if (authenticate) {
        navigate(`/admin`, { replace: true });
      }
    } catch(err) {
      console.log(err)
      return
    }
  }

  return (
    <>
        <div className='AdminLogin'>
            <div className='LoginForm'>
                <h1>Admin Login</h1>
                <label htmlFor='username'>Username</label>
                <input placeholder='Username' onChange={(e) => {setUsername(e.currentTarget.value)}} name='username'></input>
                <label htmlFor='password' typeof='password'>Password</label>
                <input placeholder='Password' name='password' onChange={(e) => {setPassword(e.currentTarget.value)}}></input>
                <button onClick={() => {handleLogin()}}>Submit</button>
            </div>
        </div>
    </>
  )
}


export default AdminLogin;
