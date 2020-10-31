import React, { useState } from 'react';
import './App.css';
import {getHero} from './api';

interface heroDetail {
  name: string,
  age: number,
  height: number
}

function App() {

  const [text, setText] = useState<string>('');
  const [load, setLoad] = useState<boolean>(false);
  const [data, setData] = useState<object>();

  const handleSubmit = async () => {
    setLoad(true);
    const detail: heroDetail = await getHero(text);
    setData(detail)
    setLoad(false);
  }
  return (
    <div className="App">
      <label htmlFor="hero" >Search</label>
      <input 
        id="hero"
        placeholder="Enter name hero"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        value={text}
      />
      <button onClick={handleSubmit}>Submit</button>
      {load && <div>Loading...</div>}

    </div>
  );
}

export default App;
