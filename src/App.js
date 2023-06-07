import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourite from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

const getMOvieRequest = async (searchValue) => {
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=73acfc8e`;

  const response = await fetch(url);
  const responseJson = await response.json();

if (responseJson.Search) {
  setMovies(responseJson.Search);
}
};

useEffect(()=>{
  getMOvieRequest(searchValue);
}, [searchValue]);

useEffect(()=> {
  const movieFavourites = JSON.parse(
    localStorage.getItem('react-movie-app-favourites')
    );
    setFavourites(movieFavourites);
});
  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  }

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie]
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movies) => {
    const newFavouriteList = favourites.filter(
      (favourites) => favourites.imbID  !== movies.imbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };


  return(
  <div className="container-fluid movie-app">
    <div className="row d-flex align-items-center mt-4 mb-4">
      <MovieListHeading heading='movies' /> 
      <SearchBox searchValue={searchValue} setSearchValue={searchValue} />
    </div>    
    <div className="row">
    <MovieList movies={movies}  
     handleFavouritesClick={addFavouriteMovie} 
     favouriteComponent = {AddFavourite} 
    />
    </div>
    <div className="row d-flex align-items-center mt-4 mb-4">
      <MovieListHeading heading='Favourites' /> 
    </div> 
    <div className="row">
    <MovieList movies={favourites}  
     handleFavouritesClick={addFavouriteMovie} 
     favouriteComponent = {RemoveFavourites} 
    />
    </div>
  </div>
  );
};

export default App;