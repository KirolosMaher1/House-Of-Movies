import React, { useEffect,useState} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';


export default function Home() {
  const [tvArray, setTvArray] = useState(null)
  const [movies, setMovies] = useState(null);


  useEffect( ()=>{
    async function movieAPI(){
      let {data} = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=f21f685cf2528d71843fad817e66c925')
      setMovies (data.results)
    }
    async function tvShows(){
      let {data} = await axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=f21f685cf2528d71843fad817e66c925')
      setTvArray (data.results);
    }
     movieAPI();
     tvShows();

  } , [] );
   
  
  return <>

  {movies&&tvArray? <>
  
    <div className="container mt-5">
    <div className="row">
      <div className="col-md-4 d-flex jusitfy-content-center align-items-center">
        <div className='title'>
          <h3>Trending Movies To Watch Now</h3>
          <p className='text-muted'>Most Watched Movies By Week</p>

        </div>
      </div>
      
        {movies.map( (movies,idx)=><>
        
        <div key={idx} className="col-md-2">
        <Link to={`/moviedetails/${movies.id}`}>
            <div className="movie">
              <img className='w-100' src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`} alt="" />
              <h5 className='p-1'>{movies.title}</h5>
            </div>
        
            </Link>
          </div>
        
        </>
         )}
      
    </div>
    <div className="row mt-3">
      <div className="col-md-4 d-flex jusitfy-content-center align-items-center ">
        <div className='title'>
        <h3>Trending Tv To Watch Now</h3>
        <p className='text-muted'>Most Watched Movies By Week</p>
        </div>
      </div>
      {tvArray.map( (tv , idx) => <div key={idx} className="col-md-2">

      <div key={idx} className='"col-md-2"'>
      <Link to={`/TvDetails/${tv.id}`}>
        <div key={idx} className='tv "col-md-2"'>
          <img className='w-100' src={`https://image.tmdb.org/t/p/original/${tv.poster_path}`} alt="" />
          <h5 className='p-1'>{tv.name}</h5>
        </div>
        </Link>
        </div>


      </div> )}
    </div>
  </div>
  </> : <>
  <div class="spinner"></div>
  </>}


  
  
  
  </>
}
