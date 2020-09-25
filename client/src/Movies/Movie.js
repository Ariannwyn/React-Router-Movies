import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Route, 
  useParams, 
  Link, 
  useRouteMatch
} from 'react-router-dom';
import axios from 'axios';



const Movie = (props) => {
  const { itemID } = useParams();
  const [movie, setMovie] = useState();
  const { path, url } = useRouteMatch();


  useEffect(() => {
    // const id = 1;
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook

       axios
        .get(`http://localhost:5000/api/movies/${itemID}`)
        .then(response => {
          setMovie(response.data);
        })
        .catch(error => {
          console.error(error);
        });

  },[]);
  
  // Uncomment this only when you have moved on to the stretch goals
  const saveMovie = evt => {
    props.addToSavedList(movie.id)
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;
  return (
    <div className="save-wrapper">
      <div className="movie-card" >
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
      <div className="save-button" onClick={saveMovie} style={{cursor: "pointer"}}>Save</div>
    </div>
  );
}

export default Movie;
