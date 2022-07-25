import React, {useEffect , useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';

export default function MovieDetails() {
let {id} =  useParams();
const [movieObject, setMovieDetails] = useState(null);
async function getMovieDetails(){
 let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=f21f685cf2528d71843fad817e66c925&language=en-US`)
 setMovieDetails(data)
}
useEffect( ()=>{

    getMovieDetails();

},[] );
 
 
 return <>

{movieObject? <>
  <div className="container mt-5">
    <div className="row">
      <div className="col-md-4">
        <div className="myimg">
        <img className='w-100' src={`https://image.tmdb.org/t/p/original/${movieObject.poster_path}`} alt="" />
        </div>
      </div>
      <div className="col-md-8">
        <h3>{movieObject.original_title}</h3>
        <p className='text-muted lead'>{movieObject.tagline}</p>
        { movieObject.genres?.map (( genre, idx)=> <span key={idx} className='me-2 px-2 bg-info text-dark fw-bold'>
            {genre.name}
        </span>) }
        <p className='mt-4'>Vote : { movieObject.vote_average }</p>
        <p className='mt-4'>Release Date : {movieObject.release_date}</p>
        <p className='mt-4'>Vote Count : {movieObject.vote_count}</p>
        <p className='mt-4 text-muted'>{movieObject.overview}</p>
      </div>
    </div>


  </div>
</> : <>
<div class="spinner"></div>
</>}

  
  
  </>
}