import "./style.css";
import React from "react";
import { Link } from "react-router-dom";
export function MovieCard(props) {
  return (
    <div className="movie-card">
      <span data-id={props.id}></span>
      <div className="movie-image">
        <img alt="movie-img" src={`${props.poster_}`}></img>
        <i className="fa fa-play play-icon"></i>
      </div>
      <div className="content">
        <h1 id="title">{props.title_}</h1>
        <div className="movie-meta-info">
          <h4>Released: {props.release_}</h4>
          <h4>Rating: {props.vote_}</h4>
        </div>
        <div className="movie-info">
          <p>{props.overviews}</p>
          <span>
            <Link
              to={`/details?page=${props.pageNo}&id=${props.id}`}
              className="read-more"
            >
              Read More...
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
