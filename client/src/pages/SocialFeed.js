import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SocialFeed() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    const res = await axios.get('http://localhost:5000/api/social/feed');
    setFeed(res.data);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await axios.get(`http://localhost:5000/api/social/search?q=${query}`);
    setSearchResults(res.data);
  };

  const followUser = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/social/follow/${id}`);
      alert('Followed!');
      setSearchResults([]); // clear search
      fetchFeed(); // refresh feed
    } catch (err) { alert(err.response.data.msg); }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Friends Activity</h1>

      {/* Search & Follow */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2 mb-2">
          <input 
            className="border p-2 rounded w-full"
            placeholder="Search username to follow..." 
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="bg-purple-500 text-white p-2 rounded">Search</button>
        </form>
        {searchResults.map(user => (
          <div key={user.id} className="bg-gray-200 p-2 flex justify-between rounded mt-1">
            <span>{user.username}</span>
            <button onClick={() => followUser(user.id)} className="text-blue-600 font-bold">Follow</button>
          </div>
        ))}
      </div>

      {/* Feed List */}
      <div className="grid gap-4">
        {feed.map(friend => (
          <div key={friend.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg text-purple-700">{friend.username}'s Habits</h3>
            <ul className="mt-2">
                {friend.Habits.map(h => (
                    <li key={h.id} className="text-sm border-b py-1">
                        {h.name} - <span className="font-bold">Streak: {h.streak} 🔥</span>
                    </li>
                ))}
            </ul>
          </div>
        ))}
        {feed.length === 0 && <p>Follow people to see their habits here!</p>}
      </div>
    </div>
  );
}