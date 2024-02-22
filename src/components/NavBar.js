import React from 'react';
import logo from '../logo.png';

export default function NavBar() {
  return (
    <>
      <div class="sticky-top">
        <nav className="navbar navbar-expand-lg bg-dark">
          <div className="container-fluid justify-content-center">
            <a className="navbar-brand" href="/">
              <img src={logo} alt="Bootstrap" width="80" height="50"  />
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
