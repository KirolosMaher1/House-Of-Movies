import {Routes,Route,useNavigate ,Navigate} from 'react-router-dom';
import Mynav from './components/Mynav/Mynav';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Movies from './components/Movies/Movies'
import Tvshows from './components/Tvshows/Tvshows';
import MovieDetails from './components/MovieDetails/MovieDetails';
import TvDetails from './components/TvDetails/TvDetails';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';




function App() {
   
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
   
   function decodeToken(){
   let user = jwtDecode( localStorage.getItem('tkn') );
   setCurrentUser(user);
   }
   function clearUserData(){
    localStorage.removeItem('tkn');
    setCurrentUser(null);
    navigate('/login');
   }
   function TestingRoute(props){
    if(localStorage.getItem('tkn') == null){
      return <Navigate to="/login" />
    }
    else{
      return props.children;
    }
    
   }
   useEffect ( ()=>{

    if(localStorage.getItem('tkn') != null){
      decodeToken();
    }
  
   },[] );

  return <>

  <Mynav crrUser={currentUser} clrUser={clearUserData} />

  <Routes>
  <Route path='' element={<TestingRoute> <Home /> </TestingRoute> } />


  <Route path='moviedetails' element={ <TestingRoute> <MovieDetails/> </TestingRoute> }>
    <Route path=':id' element={ <MovieDetails /> } />
  </Route>
  <Route path='tvdetails' element={ <TvDetails/> }>
    <Route path=':id' element={ <TvDetails /> } />
  </Route>



    <Route path='home' element={ <TestingRoute> <Home /> </TestingRoute> } />
    <Route path='Login' element={ <Login decodeToken={decodeToken} /> } />
    <Route path='Register' element={ <Register /> } />
    <Route path='Tvshows' element={ <TestingRoute> <Tvshows /> </TestingRoute> } />
    <Route path='Movies' element={ <TestingRoute> <Movies /> </TestingRoute> } />
    <Route path='*' element={ <div className='vh-100 d-flex justify-content-center align-items-center'>
     <h1>4 0 4</h1> 
    </div> } />


  </Routes>

  </>
}

export default App;
