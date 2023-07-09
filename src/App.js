import "./App.css";
import React, { createContext } from "react";
import { NavBar } from "./movie_card/navbar/navbar";
import { RenderMovieList } from "./movie_card/components/MovieList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./movie_card/pages/Login";
import { useState } from "react";
import Details from "./movie_card/pages/Details";
import Error from "./movie_card/pages/Error";

export const AppContext = createContext();

function App() {
  const [pageNo, setPageNo] = useState(1);

  return (
    <div className="App">
      <Router>
        <AppContext.Provider value={{ pageNo, setPageNo }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<RenderMovieList />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/details" element={<Details />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </AppContext.Provider>
      </Router>
    </div>
  );
}

export default App;
