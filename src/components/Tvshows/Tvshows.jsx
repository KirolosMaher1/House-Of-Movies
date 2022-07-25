import React, { useEffect,useState} from 'react';
import axios from 'axios'


export default function Home() {
  const [tvArray, setTvArray] = useState(null)
  

  useEffect( ()=>{
    async function tvShows(){
      let {data} = await axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=f21f685cf2528d71843fad817e66c925')
      setTvArray (data.results);
    }
     tvShows();

  } , [] );
   
  
  return <>

{tvArray? <>
  <div className="container mt-5"> 
    <div className="row">
      <div className="col-md-4 d-flex jusitfy-content-center align-items-center ">
        <div className='title'>
        <h3>Trending Tv To Watch Now</h3>
        <p className='text-muted'>Most Watched Movies By Week</p>
        </div>
      </div>
      {tvArray.map( (tv , idx) => <div key={idx} className="col-md-2">

        <div className='tv'>
          <img className='w-100' src={`https://image.tmdb.org/t/p/original/${tv.poster_path}`} alt="" />
          <h5>{tv.name}</h5>
        </div>



      </div> )}
    </div>
  </div>
</> : <>
<div class="spinner"></div>
</>}

  
  
  
  
  </>
}
