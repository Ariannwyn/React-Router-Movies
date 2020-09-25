import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

const App = () => {
  const [saved, setSaved] = useState([{ }]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);
  
  

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = (id) => {
  
    if (saved[saved.length-1] === id){
      console.log("cannot save movie twice")
    }
    else {
    setSaved([...saved, id])
    console.log(saved)
    }
    // This is stretch. Prevent the same movie from being "saved" more than once
  };

  return (
    <Router>
      <div>
      <SavedList list={[saved]} />
      <Route exact path="/">
        <MovieList movies={movieList}/>
      </Route>
      <Route exact path="/movies/:itemID">
        <Movie addToSavedList={addToSavedList}/>
      </Route>
    </div>
    </Router>
  );
};

export default App;
