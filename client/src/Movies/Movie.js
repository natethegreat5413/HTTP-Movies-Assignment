import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom"
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setRefresh }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const handleDelete = e => {
    e.preventDefault()
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
    .then(res => {
      setRefresh(true)
      push('/')
    })
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <button onClick={() => {push(`/update-movie/${params.id}`)}}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      
      
      
    </div>
  );
}

export default Movie;

