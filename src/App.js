import './App.css';
import Cards from './Components/Cards';
import Hero from './Components/Hero';
import Navbar from './Components/Navbar';
import { useEffect, useState } from 'react';
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState('')

  return (
    <div className="App">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} setResults={setResults} />
      {/* <Hero/> */}
      <Cards results={results}/>
    </div>
  );
}

export default App;
