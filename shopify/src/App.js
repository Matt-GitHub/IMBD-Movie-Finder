import React from 'react';
import axios from 'axios';
import './App.css';
import Nominated from './components/liked/Nominated';
import UseLocalStorage from './hooks/UseLocalStorage';
import Movies from './components/movies/Movies';
import Navigation from './components/navigation/Navigation';
import { Route } from 'react-router-dom';
import Home from './components/home/Home';
function App() {
  const [movies, setMovies] = React.useState([]);
  const [nominated, setNominated] = UseLocalStorage([], 'nominated');
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(
        `http://www.omdbapi.com/?s=${search}&apikey=c154daad&type=movie&page=${page}`
      )
      .then(res => {
        if (res?.data?.Search) {
          setMovies(res.data.Search);
        } else {
          setMovies([]);
        }
        setTotalPages(Math.ceil(res.data.totalResults / 10));
      });
  }, [page, search]);

  return (
    <div className="App">
      <Navigation />

      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/search">
        {' '}
        <Movies
          movies={movies}
          search={search}
          setSearch={setSearch}
          nominated={nominated}
          setNominated={setNominated}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </Route>
      <Route path="/nominations">
        <Nominated nominated={nominated} setNominated={setNominated} />
      </Route>
    </div>
  );
}

export default App;
