import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-default border-bottom border-2 border-dark">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Golf Swing Simulator</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
