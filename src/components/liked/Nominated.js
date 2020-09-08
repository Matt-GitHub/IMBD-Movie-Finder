import React from 'react';
import editString from '../../utils/EditString';
const Nominated = ({ nominated, setNominated }) => {
  let nominationsLeft = 5 - nominated.length;
  return (
    <div>
      {nominationsLeft === 0 ? (
        <h1>Submit Nominations</h1>
      ) : nominationsLeft === 1 ? (
        <h1>{nominationsLeft} Nomination Left</h1>
      ) : (
        <h1>{nominationsLeft} Nominations Left</h1>
      )}
      <div className="movieContainer">
        {nominated.length > 0 ? (
          nominated.map(movie => {
            let genre = editString(movie.Genre);
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
                    onClick={() => {
                      let removeMovie = nominated.filter(
                        data => data.imdbID !== movie.imdbID
                      );
                      setNominated(removeMovie);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="noMovie">You currently have 0 nominated movies</p>
        )}
      </div>
    </div>
  );
};

export default Nominated;
