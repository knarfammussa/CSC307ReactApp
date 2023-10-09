import React, {useState, useEffect} from "react";
import Table from "./Table"
import Form from './Form';
import axios from 'axios';

  
function MyApp() {
  const [characters, setCharacters] = useState([]);
  async function removeOneCharacter(index) {
    try {
      const characterToDelete = characters[index].id;
      //console.log('Character ID to delete:', characterToDelete);
      //const deleteURL = `http://localhost:8000/users/${characterToDelete}`;
      //console.log('DELETE URL:', deleteURL);
      const response = await axios.delete(`http://localhost:8000/users/${characterToDelete}`);
      //console.log('DELETE response:', response);
  
      if (response.status === 204) {
        const updatedCharacters = characters.filter((_, i) => i !== index);
        setCharacters(updatedCharacters);
        //console.log('Character removed successfully');
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      // Handle errors
      console.log(error);
      return false;
      //console.error('Error deleting character:', error);
    }
  }
  function updateList(person) { 
    makePostCall(person).then( result => {
    if (result && result.status === 201) {
      const newUser = result.data;
      setCharacters([...characters, newUser] );}
    });
  }
  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:8000/users');
       return response.data.users_list;     
    }
    catch (error){
       console.log(error); 
       return false;         
    }
  }
  async function makePostCall(person){
    try {
       const response = await axios.post('http://localhost:8000/users', person);
       return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
  }
  useEffect(() => {
    fetchAll().then( result => {
       if (result)
          setCharacters(result);
     });
  }, [] );
  return (
    <div className="container">
      <Table characterData={characters} 
        removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}

export default MyApp;