import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({ name: '', frequency: 'daily', category: 'General' });

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/habits');
      setHabits(res.data);
    } catch (err) { console.error(err); }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/habits', newHabit);
      setNewHabit({ name: '', frequency: 'daily', category: 'General' });
      fetchHabits();
    } catch (err) { alert(err.response.data.msg); }
  };

  const handleCheckIn = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/habits/${id}/checkin`);
      fetchHabits(); // Refresh to show new streak
    } catch (err) { alert(err.response.data.msg); }
  };

  const deleteHabit = async (id) => {
      if(window.confirm('Delete this habit?')) {
          await axios.delete(`http://localhost:5000/api/habits/${id}`);
          fetchHabits();
      }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Habits</h1>
      
      {/* Create Form */}
      <form onSubmit={handleCreate} className="bg-white p-4 rounded shadow mb-6 flex gap-2">
        <input 
          className="border p-2 rounded flex-1"
          placeholder="New Habit Name" 
          value={newHabit.name}
          onChange={e => setNewHabit({...newHabit, name: e.target.value})}
          required
        />
        <select 
          className="border p-2 rounded"
          value={newHabit.frequency}
          onChange={e => setNewHabit({...newHabit, frequency: e.target.value})}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <button className="bg-blue-500 text-white p-2 rounded">Add</button>
      </form>

      {/* Habit List */}
      <div className="grid gap-4">
        {habits.map(habit => (
          <div key={habit.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{habit.name}</h3>
              <p className="text-gray-500 text-sm">Streak: 🔥 {habit.streak} | {habit.frequency}</p>
            </div>
            <div className="flex gap-2">
                <button 
                onClick={() => handleCheckIn(habit.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                Check In
                </button>
                <button onClick={() => deleteHabit(habit.id)} className="text-red-500 text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}