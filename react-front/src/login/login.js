import React, { useState } from 'react';
import { Button, Container, Jumbotron } from 'reactstrap';
import BackgroundImg from '../commons/images/sage-green.jpg';
import '../commons/styles/my-styles.css';
import * as API from "../api/api";

const backgroundStyle = {
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: "100%",
  height: "100%",
  backgroundImage: `url(${BackgroundImg})`
};



function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('administrator');
  const [userId, setUserId] = useState(null); 


  const handleLogin = () => {
    if (username && password) {
        API.loginUser({ username, password }, userType, (result, status, err) => {

          console.log('Status:', status);
          console.log('Error:', err);
          
            if (result !== null && status === 201) {
              
                if (userType === 'client') {
                    sessionStorage.setItem("userId", result);
                    window.location.href = '/client';
                } else if (userType === 'administrator') {
                    sessionStorage.setItem("userId", result);
                    window.location.href = '/admin';
                }
                sessionStorage.setItem('userRole', userType);
                setUserId(result);
            }
        });
    }
};


  return (
    <div style={backgroundStyle}>
     <div className="login-container">
      <div className="login-box">
        <h2>Login Page</h2>
        <div className="form-group mt-3">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            className="form-control mt-1"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            className="form-control mt-1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>User Type:</label>
          <select className="form-control mt-1" value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="client">Client</option>
            <option value="administrator">Administrator</option>
          </select>
        </div >
        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
      </div>
    </div>
    </div>
  );
}

export default Login;
