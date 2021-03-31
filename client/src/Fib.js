import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from './constant';

function Fib() {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');
  
  const fetchValue = async () => {
    const values = await axios.get(`${API_URL}/values/current`);
    setValues(values.data);
  };

  const fetchIndexes = async () => {
    const seens = await axios.get(`${API_URL}/values/all`);
    setSeenIndexes(seens.data);
  }

  useEffect(() => {
    fetchValue();
    fetchIndexes();
  }, []);

  const renderSeenIndexes = () => {
    if (!seenIndexes || !seenIndexes.length || !Array.isArray(seenIndexes)) {
      return '';
    }
    return seenIndexes.map(({ number }) => number).join(', ');
  }

  const renderValues = () => {
    const entries = [];
    if (!Array.isArray(seenIndexes)) {
      return entries;
    }

    for (let key in values) {
      entries.push(
        <div key={key}>For index {key} I calculated: {values[key]}</div>
      )
    }
    return entries;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`${API_URL}/values`, {
      index
    });
    setIndex('');
    fetchValue();
    fetchIndexes();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index: </label>
        <input value={index} onChange={e => setIndex(e.target.value)} />
        <button>Submit</button>
      </form>
      <>
        <h3>Indexes I have seen: </h3>
        {renderSeenIndexes()}
        <h3>Calculated Values: </h3>
        {renderValues()}
      </>
    </div>
  )
}

export default Fib; 