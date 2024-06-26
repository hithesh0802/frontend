// SearchFriends.js
import React, { useState } from 'react';
import axios from 'axios';

const SearchFriends = ({ userId }) => {
  const [username, setUsername] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/search-friends`, {
        userId,
        username
      });
      setSearchResult(response.data);
    } catch (error) {
      console.error('Error searching for friends:', error);
    }
  };

  return (
    <div className="search-friends-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for friends..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      {searchResult && (
        <div className="search-results">
          {searchResult.length > 0 ? (
            searchResult.map((friend) => (
              <div key={friend._id} className="friend-card">
                <p>{friend.username}</p>
              </div>
            ))
          ) : (
            <p>No friends found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFriends;

