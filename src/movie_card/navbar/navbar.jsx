import { useState } from "react";
import "./navbar.css";
import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";
import { useContext } from "react";

export function NavBar() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function handleMenuToggle() {
    setMenuIsOpen((prevMenuIsOpen) => !prevMenuIsOpen);
  }

  // grab the setPage using context
  const { setPageNo } = useContext(AppContext);

  return (
    <nav className="navbar">
      <div className="brand">
        <h1>toastify.</h1>
      </div>
      <div className={`nav-items ${menuIsOpen ? "active" : ""}`}>
        <ul className="nav-list">
          <li>
            <a
              href="#"
              onClick={() => {
                setPageNo(1);
                setMenuIsOpen(false); // Close the menu after clicking a link
              }}
            ></a>
            <Link to="/"> Home </Link>
          </li>
          <li>
            <a href="#">
              <Link to="/login">Login &nbsp;</Link>
              <i className="fa fa-sign-in"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className={`drawer ${menuIsOpen ? "active" : ""}`}>
        <ul className="drawer-nav-list">
          <li>
            <a
              href="#"
              className="active"
              onClick={() => {
                setPageNo(1);
                setMenuIsOpen(false); // Close the menu after clicking a link
              }}
            >
              <Link to="/"> Home </Link>
            </a>
          </li>
          <li>
            <a href="#">
              <Link to="/login">Login</Link>
            </a>
          </li>
          <li id="credit">
            <span>
              Made with &nbsp;
              <i class="fa-solid fa-heart"></i>&nbsp; with &nbsp;by Asad
            </span>
          </li>
        </ul>
      </div>
      <div className="burger-menu" onClick={handleMenuToggle}>
        <div className={`bar ${menuIsOpen ? "active" : ""}`}></div>
        <div className={`bar ${menuIsOpen ? "active" : ""}`}></div>
        <div className={`bar ${menuIsOpen ? "active" : ""}`}></div>
      </div>
    </nav>
  );
}
