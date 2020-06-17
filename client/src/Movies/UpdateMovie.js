import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    
}

const UpdateMovie = () => {
    const {push} = useHistory();
    const {id} = useParams();

    const [movie, setMovie] = useState({
        title: '',
        director: '',
        metascore: '',
        star: []
        })

const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${id}`, movie);
    push(`/movies/${movie.id}`)
}
    

const handleChanges = e => {
    e.persist();
    let value = e.target.value;
    if(e.target.name === 'starts') {
        value = value.split(',');
    }
    if(e.target.name === 'metascore') {
        value = parseInt(value, 10);
    }

    setMovie({
        ...movie,
        [e.target.name]: value,
    })
}



useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/itemById/${id}`)
    .then(res => {
        setMovie(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}, [id])


    return(
        <div className="update-movie">
            <form onSubmit={handleSubmit}>
                
                <input
                placeholder='Title'
                type='text'
                value={movie.title}
                onChange={handleChanges}
                name='title'
                /><br/>

                <input
                placeholder='Director'
                type='text'
                value={movie.director}
                onChange={handleChanges}
                name='director'
                /><br/>

                <input
                placeholder='Metascore'
                type='text'
                value={movie.metascore}
                onChange={handleChanges}
                name='metascore'
                /><br/>

                <input
                placeholder='Stars'
                type='text'
                value={movie.stars}
                onCange={handleChanges}
                name='star'
                /><br/>
              <button type='submit'>Update</button>
            </form>
            
        </div>
    )
    };


export default UpdateMovie