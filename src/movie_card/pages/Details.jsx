import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../App";
import "./details.css";
import ClipLoader from "react-spinners/ClipLoader";

const Details = () => {
  //Spinner things
  const styleX = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "999",
  };
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#FFD700");

  //Data objects
  const [dataObject, setDataObject] = useState({});
  const location = useLocation();
  let dummy = {};
  const fetchDetails = async (movie_id) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzYyMDQ2YjA3ZDJjYjgzNmI4ZjA5OTdiNjRlMTI5ZCIsInN1YiI6IjY0OWFlY2EyYTZkZGNiMDEwMGE4MDNmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RLa7RM7bNKgX_SSSwz-0motGY7oCdyyZh9F7SwTllc8",
      },
    };

    const req = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`,
      options
    );
    const response = await req.json();

    dummy.poster = `https://image.tmdb.org/t/p/w500/${response["poster_path"]}`;
    dummy.name = response["original_title"];
    dummy.budget = response["budget"];
    dummy.release = response["release_date"];
    dummy.backdrop = `https://image.tmdb.org/t/p/w1280/${response["backdrop_path"]}`;
    dummy.genres = response["genres"].map((genre, i) => {
      return `${genre["name"]} ${i === 1 ? "" : " - "}`;
    });
    dummy.rating = response["vote_average"];
    dummy.overview = response["overview"];
    dummy.homepage = response["homepage"];

    setDataObject(dummy);
  };

  useEffect(() => {
    const fetchData = async () => {
      const movie_id = ShowParam();
      await fetchDetails(movie_id);
      setLoading(false); // Move setLoading here to hide the spinner after fetching data
    };
    fetchData();
  }, []);

  //grab the values of page
  const { setPageNo } = useContext(AppContext);

  const ShowParam = () => {
    const getMovieID = new URLSearchParams(location.search).get("id");
    return parseInt(getMovieID);
  };
  const ShowPage = () => {
    const getPage = new URLSearchParams(location.search).get("page");
    setPageNo(getPage);
  };
  function formatNumber(number) {
    const suffixes = ["", "Thousand", "Million", "Billion", "Trillion"];
    let suffixIndex = 0;
    let formattedNumber = number;

    while (formattedNumber >= 1000 && suffixIndex < suffixes.length - 1) {
      formattedNumber /= 1000;
      suffixIndex++;
    }

    const decimalPlaces = formattedNumber % 1 === 0 ? 0 : 2;
    return `${formattedNumber.toFixed(decimalPlaces)} ${suffixes[suffixIndex]}`;
  }

  return (
    <div className="details-container">
      {loading ? (
        <div className="spin" style={styleX}>
          <ClipLoader
            color={color}
            loading={loading}
            size={150}
            speedMultiplier={0.6}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div>
          <div className="back-btn">
            {ShowPage()}
            <Link to="/">
              <i className="fas fa-arrow-circle-left"></i>
            </Link>
          </div>
          <div
            className="details-card"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url('${dataObject["backdrop"]}')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="details-content">
              <div className="movie-poster">
                {dataObject["poster"] && (
                  <img src={dataObject.poster} alt="movie-poster" />
                )}
              </div>
              <div className="movie-details">
                <h1 className="movie-name">{dataObject["name"]}</h1>
                <h3 className="movie-release">
                  <span>Released:</span>&nbsp;
                  <h3 style={{ display: "inline-block", fontSize: "17px" }}>
                    {dataObject["release"]}
                  </h3>
                </h3>
                <h4 className="movie-genre">
                  <span>Genre:</span>&nbsp;
                  {dataObject["genres"] === ""
                    ? "No Data available"
                    : dataObject["genres"]}
                </h4>
                <h4 className="movie-budget">
                  <span>Budget:</span>&nbsp;
                  {dataObject["budget"] === 0
                    ? "No Data available!"
                    : formatNumber(parseInt(dataObject["budget"])) + " $"}
                </h4>
                <p className="movie-overview">
                  <span>Overview:</span>&nbsp;
                  {dataObject["overview"]}
                </p>
                <h4 className="movie-rating">
                  <span>Rating:</span>&nbsp;
                  {dataObject["rating"] === 0
                    ? "No Data available!"
                    : dataObject["rating"]}
                </h4>
                <div className="cta">
                  <button className="btn-cta">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={dataObject["homepage"]}
                      style={{
                        textDecoration: "none",
                        color: "rgb(53, 52, 52)",
                      }}
                    >
                      Official Site
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Details;
