import React, { useState } from 'react';

const FriendsSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        // Implement your search logic here
        console.log('Searching for:', searchQuery);
    };

    return (
        <div>
            <h2>Friends Search</h2>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            {/* Display search results or other content */}
        </div>
    );
};

export default FriendsSearch;
