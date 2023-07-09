import { MovieCard } from "./MovieCard";
import { useState, useEffect } from "react";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useContext } from "react";
import { AppContext } from "../../App";

export function RenderMovieList() {
  //Spinner States
  const styleX = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "z-index": "999",
  };
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#FFD700");
  //Movie states
  const [movieData, setMovieData] = useState([]);
  const { pageNo, setPageNo } = useContext(AppContext);
  const [totalPages, setTotalPages] = useState(1);

  //Jump to page
  const [jumpTo, setJumpTo] = useState(1);

  const fetchMovies = async (page) => {
    //Run spinner
    setLoading(true);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzYyMDQ2YjA3ZDJjYjgzNmI4ZjA5OTdiNjRlMTI5ZCIsInN1YiI6IjY0OWFlY2EyYTZkZGNiMDEwMGE4MDNmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RLa7RM7bNKgX_SSSwz-0motGY7oCdyyZh9F7SwTllc8",
      },
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
        options
      );
      const data = await response.json();
      setPageNo(data.page);
      setTotalPages(data.total_pages);
      setMovieData(data.results);
      console.log(data);
      //Stop or hide spinner
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies(pageNo);
  }, [pageNo]);

  const gotoNextPage = () => {
    const nextPage = pageNo + 1;
    if (nextPage <= totalPages) {
      setPageNo(nextPage);
    }
  };

  const gotoPrevPage = () => {
    const prevPage = pageNo - 1;
    if (prevPage >= 1) {
      setPageNo(prevPage);
    }
  };

  const HandlejumpToPage = () => {
    setPageNo(jumpTo);
  };

  return (
    <div className="ui">
      <div className="showing">
        <h1 className="latest">Latest Movies</h1>
        <h3 className="page-no">
          <div className="jump-to-page">
            <input
              type="text"
              placeholder="Page No"
              id="jumpTxt"
              onChange={(e) => {
                setJumpTo(parseInt(e.target.value));
              }}
            />
            <button id="jmpBtn" onClick={HandlejumpToPage}>
              Jump to a Page
            </button>
          </div>
          Showing Page {pageNo} of {totalPages}
        </h3>
      </div>
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

      <div className="Movies">
        {movieData.map((movie) => {
          const {
            id: movie_id,
            original_title,
            poster_path,
            release_date,
            vote_average,
            overview,
          } = movie;
          const completeIMGPath = `https://image.tmdb.org/t/p/w500/${poster_path}`;
          const completeOverview = overview.substring(0, 110) + "...";
          const completeTitle = original_title.substring(0, 40);
          const onlyYear = release_date.substring(0, 4);
          return (
            <MovieCard
              title_={completeTitle}
              poster_={completeIMGPath}
              release_={onlyYear}
              vote_={vote_average}
              overviews={completeOverview}
              id={movie_id}
              pageNo={pageNo}
            />
          );
        })}

        <div className="pagination">
          <div className="pageNo">
            <div className="previous-page">
              <button onClick={gotoPrevPage}>Previous</button>
            </div>
            <div className="next-page">
              <button onClick={gotoNextPage}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
