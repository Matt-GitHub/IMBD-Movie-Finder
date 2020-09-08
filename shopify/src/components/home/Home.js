import React from 'react';
import './Home.css';
import { NavLink } from 'react-router-dom';
const Home = () => {
  return (
    <div className="introContainer">
      <h1 className="intro">
        Hey <span className="shopify">Shopify</span> Team!
      </h1>
      <p className="intoParagraph">
        Welcome and thank you for joining us this year at the{' '}
        <span className="shopify">Shoppies</span>. I wanted to give you a brief
        rundown on how everything works before you jump into testing the
        functionality.
      </p>

      <p className="intoParagraph">
        To get started, navigate to the{' '}
        <NavLink to="/search">Search Page</NavLink> and simply look for any
        movie in the search bar. When searching you will notice a few things:
      </p>
      <ul>
        <li>
          Queries are capped at 10 results. In order to view all of the movies
          for a query you will have to navigate using the{' '}
          <span className="introHighlight">next page button</span> next to the
          search bar.
        </li>
        <li>
          Some queries do not return any result or they return too many results.
          Continue to search for your movie and I promise it will show up.
        </li>
      </ul>
      <p className="intoParagraph">
        When you find the movie you are looking for, nominate it!
      </p>
      <ul>
        <li>
          All of your nominations will show up on the{' '}
          <NavLink to="/nominations">Nominations Page</NavLink>
        </li>
        <li>
          When you select a nomination the nomination button will now will
          update its text to reflect that this is a movie you have nominated
        </li>
        <li>
          If you made a mistake, no worries, just remove the movie from your
          nominations by navigating to the{' '}
          <NavLink to="/nominations">Nominations Page</NavLink> and selecting
          "remove nomination"
        </li>
        <li>Lastly, all of your nominations are persisted in local storage!</li>
      </ul>
    </div>
  );
};

export default Home;
