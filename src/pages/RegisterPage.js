import React from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser} from '../services/api';
import './LoginPage.css';
import { useEffect , useState} from 'react';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.style.background = '#121212';
    document.body.style.color = '#fff';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.height = '100vh';
    document.body.style.webkitFontSmoothing = 'antialiased';
    document.body.style.mozOsxFontSmoothing = 'grayscale';

    return () => {
      document.body.style = ''; // Clear the styles when the component unmounts
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ email, password });
      console.log('API response:', response, response.token); // Log the response for debugging
      localStorage.setItem('token', response.token);
      navigate('/login');
    } catch (error) {
      document.getElementById('errText').innerHTML+='Login error: User With same Email already Exists'; // Log the error
      if (error.response && error.response.data) {
        console.error('Error response data:', error.response.data);
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Register New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <p id='errText'></p>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
