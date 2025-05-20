import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Hello(){
    
    const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/main')
      .then(response => setMessage(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
    return (<h1>{message} </h1>);

}
export default Hello