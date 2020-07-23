import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const initialMovie = {
    id:'',
    title: '',
    director: '',
    metascore: '',
    stars: []
}


const UpdateMovie = props => {
    const { id } = useParams();
    const { movie, setMovie } = useState(initialMovie)
    const { push } = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(res)
            setMovie(res.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    const handleChanges = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                setMovie(initialMovie)
                push('/')
                props.setRefresh(true)
            
      })      
            .catch(error => {
                console.log(error)
            })
    }


    
    return (
        <div className='update'>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                type='text'
                name='title'
                onChange={handleChanges}
                value={movie.title}
                />
                <input
                type='text'
                name='director'
                onChange={handleChanges}
                value={movie.director}
                />
                <input
                type='number'
                name='metascore'
                onChange={handleChanges}
                value={movie.metascore}
                />
                <input
                type='text'
                name='stars'
                onChange={handleChanges}
                value={movie.stars}
                />
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie

