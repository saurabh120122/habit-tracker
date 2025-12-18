import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  if (!user) return null;

  return (
    <nav className="bg-white shadow p-4 mb-6">
      <div className="container mx-auto flex justify-between">
        <div className="font-bold text-xl">HabitTracker</div>
        <div className="flex gap-4">
          <Link to="/" className="text-gray-700 hover:text-blue-500">Dashboard</Link>
          <Link to="/feed" className="text-gray-700 hover:text-blue-500">Friends</Link>
          <button onClick={logout} className="text-red-500">Logout</button>
        </div>
      </div>
    </nav>
  );
}