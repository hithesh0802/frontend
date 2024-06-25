import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (query.trim() !== '') {
            try {
                // const results = await searchFriends(query); // Call API function to search
                // onSearch(results); // Pass search results to parent component
            } catch (error) {
                console.error('Error searching friends:', error);
                // Handle error if needed
            }
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search by username "
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
