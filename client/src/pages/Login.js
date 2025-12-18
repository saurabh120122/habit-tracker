import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, register } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.username, formData.email, formData.password);
      }
      navigate('/');
    } catch (err) { alert('Error authenticating'); }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {!isLogin && (
          <input 
            className="border p-2 rounded" 
            placeholder="Username"
            onChange={e => setFormData({...formData, username: e.target.value})}
          />
        )}
        <input 
          className="border p-2 rounded" 
          type="email" 
          placeholder="Email"
          onChange={e => setFormData({...formData, email: e.target.value})}
        />
        <input 
          className="border p-2 rounded" 
          type="password" 
          placeholder="Password"
          onChange={e => setFormData({...formData, password: e.target.value})}
        />
        <button className="bg-blue-600 text-white p-2 rounded">
          {isLogin ? 'Log In' : 'Sign Up'}
        </button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-blue-500 mt-4">
        {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
      </button>
    </div>
  );
}