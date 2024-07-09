
import React, { useEffect, useState } from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Cards from './Components/Cards';
import Shelf from './Components/Shelf';

import "./App.css"; 
 
function App() { 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [results, setResults] = useState(""); 
  const [savedBooks, setSavedBooks] = useState([]); 
 
  useEffect(() => { 
    const saved = JSON.parse(localStorage.getItem("savedBooks")) || []; 
    console.log("Loaded saved books:", saved); 
    if (saved.length > 0) { 
      setSavedBooks(saved);
    }
  }, []);
 
  const handleSaveBook = (book) => { 
    const updatedBooks = [...savedBooks, book];
    setSavedBooks(updatedBooks); 
    localStorage.setItem("savedBooks", JSON.stringify(updatedBooks)); 
  }; 
 
  const handleRemoveBook = (bookKey) => { 
    const updatedBooks = savedBooks.filter((book) => book.key !== bookKey);
    setSavedBooks(updatedBooks); 
    localStorage.setItem("savedBooks", JSON.stringify(updatedBooks)); 
  };
 
  return ( 
    <Router>
      <div className="bg-[#FFFFFF] dark:bg-slate-800 dark:text-white">
        <Navbar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
          setResults={setResults} 
        />      
        <Routes>
          <Route 
            path="/" 
            element={
              <Cards 
                results={results} 
                onSaveBook={handleSaveBook} 
                onRemoveBook={handleRemoveBook} 
                savedBooks={savedBooks} 
              />
            } 
          />
          <Route 
            path="/shelf" 
            element={
              <Shelf 
                savedBooks={savedBooks} 
                onRemoveBook={handleRemoveBook} 
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  ); 
} 
export default App;
