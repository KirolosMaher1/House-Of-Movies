import React, {useEffect , useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';

export default function TvDetails() {
let {id} =  useParams();
const [tvDetails, setTvDetails] = useState({});
async function getTvDetails(){
 let {data} = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=f21f685cf2528d71843fad817e66c925&language=en-US`)
 setTvDetails(data)
}
useEffect( ()=>{

    getTvDetails();

},[] );
 
 
 return <>

  <div className="container mt-5">
    <div className="row">
      <div className="col-md-4">
        <div className="myimg">
        <img className='w-100' src={`https://image.tmdb.org/t/p/original/${tvDetails.poster_path}`} alt="" />
        </div>
      </div>
      <div className="col-md-8">
        <h3>{tvDetails.original_name}</h3>
        <p className='text-muted lead'>{tvDetails.tagline}</p>
        { tvDetails.genres?.map (( genre, idx)=> <span key={idx} className='me-2 px-2 bg-info text-dark fw-bold'>
            {genre.name}
        </span>) }
        <p className='mt-4'>Vote : { tvDetails.vote_average }</p>
        <p className='mt-4'>Release Date : {tvDetails.release_date}</p>
        <p className='mt-4'>Vote Count : {tvDetails.vote_count}</p>
        <p className='mt-4 text-muted'>{tvDetails.overview}</p>
      </div>
    </div>


  </div>
  
  
  </>
}