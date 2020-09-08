import React from 'react';
import './Movies.css';
import axios from 'axios';
import editString from '../../utils/EditString';
const Movies = ({
  movies,
  nominated,
  search,
  setSearch,
  setNominated,
  page,
  setPage,
  totalPages
}) => {
  const [details, setDetails] = React.useState([]);

  const likeMovie = id => {
    setNominated([...nominated, id]);
  };
  const loadNextPage = () => {
    if (page < totalPages) {
      return setPage(page + 1);
    }
  };

  const loadPreviousPage = () => {
    if (page > 0) {
      return setPage(page - 1);
    }
  };

  const updateSearch = e => {
    setSearch(e.target.value);
    setPage(1);
  };
  async function getMovies() {
    const promises = movies.map(movie =>
      axios.get(
        `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=c154daad&plot=short`
      )
    );
    const results = await Promise.all(promises);
    setDetails(results.map(r => r.data));
  }

  React.useEffect(() => {
    getMovies();
  }, [movies]);
  return (
    <>
      <label className="searchFunction">
        <span className="searchText">Search</span>
        <input
          type="search"
          value={search}
          placeholder="Search"
          onChange={updateSearch}
        />
      </label>
      <button disabled={page === 1} type="button" onClick={loadPreviousPage}>
        Previous
      </button>
      <button
        disabled={page === totalPages}
        type="button"
        onClick={loadNextPage}
      >
        Next
      </button>
      <div className="movieContainer">
        {details.length > 0 ? (
          details.map(movie => {
            let genre = editString(movie.Genre);
            let nominationTitles = nominated.map(data => data.imdbID);
            let disabled = () => {
              if (
                nominationTitles.includes(movie.imdbID) ||
                nominated.length >= 5
              ) {
                return true;
              }
              return false;
            };
            return (
              <div className="movieBox">
                <img
                  className="moviePoster"
                  src={
                    movie.Poster === 'N/A'
                      ? 'https://avatars1.githubusercontent.com/u/8085?s=200&v=4'
                      : movie.Poster
                  }
                  alt=""
                />
                <div className="movieDescription">
                  <p className="movieTitle">{movie.Title}</p>
                  <div className="movieFacts">
                    <p className="movieRuntime">{movie.Runtime}</p>
                    <p className="movieRated">{movie.Rated}</p>
                    <p className="movieYear">{movie.Year}</p>
                  </div>

                  <div className="movieGenreContainer">
                    {genre.map(genre => {
                      return <p className="movieGenre">{genre}</p>;
                    })}
                  </div>
                  <div className="movieRatingContainer">
                    {movie.Ratings.map(data => {
                      return (
                        <div className="ratingContainer">
                          {data.Source.includes('Rotten') ? (
                            <span role="img" aria-label="tomato">
                              🍅
                            </span>
                          ) : data.Source.includes('Movie') ? (
                            <span role="img" aria-label="gold star">
                              ⭐
                            </span>
                          ) : (
                            <span role="img" aria-label="green checkbox">
                              ✅
                            </span>
                          )}
                          <p className="rating">{data.Value}</p>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    className={
                      nominationTitles.includes(movie.imdbID)
                        ? 'nominateButton nominated'
                        : 'nominateButton'
                    }
                    type="button"
                    disabled={disabled()}
                    onClick={() => likeMovie(movie)}
                  >
                    {nominationTitles.includes(movie.imdbID)
                      ? 'NOMINATED'
                      : 'Nominate'}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="noMovie">Please update your search </p>
        )}
      </div>
    </>
  );
};

export default Movies;
