import React, { useRef, useEffect } from 'react';

function SearchBar({ searchTerm, onSearchChange, commonWidth }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.setProperty('--placeholder-color', 'white');
    }
  }, []);

  return (
    <div style={{
      width: '100%',
      maxWidth: commonWidth,
      display: 'flex',
      justifyContent: 'center',
      marginRight: '3.5rem',
    }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            padding: '10px 30px 10px 10px', 
            width: '100%',
            borderRadius: '5px',
            border: '1px solid #555',
            backgroundColor: '#333',
            color: 'white',
            fontSize: '1em',
            '--placeholder-color': 'gray'
          }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#007bff" // search icon color
          style={{
            position: 'absolute',
            right: '-2rem', 
            top: '50%',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '20px',
            pointerEvents: 'none'
          }}
        >
          <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.313 0 6 2.687 6 6s-2.687 6-6 6-6-2.687-6-6 2.687-6 6-6z" />
        </svg>
      </div>
    </div>
  );
}

export default SearchBar;