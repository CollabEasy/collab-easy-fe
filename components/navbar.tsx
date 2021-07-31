import Link from "next/link";
import Title from "./title";
import { useRoutesContext } from "./routeContext";
import styles from '../public/styles/navbar.module.scss';
import React from 'react'
import { Nav, Button } from 'react-bootstrap';

// I took the code from here https://www.gyanblog.com/javascript/next-js-bootstrap-template-navbar-header/

const Navbar = () => {
  const { toLogin, toSignup, toDiscover, toWondorHome } = useRoutesContext()
  return (
    <Nav className="navbar navbar-expand-lg navbar-light hdr-clr " style={{padding: '20px'}}>
      <div className="container-xl">
      <Link href={toWondorHome().href}>
          <a className={'navbar-brand ' + styles.appLogo}>Wondor</a>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07XL" aria-controls="navbarsExample07XL" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="justify-content-end collapse navbar-collapse" id="navbarsExample07XL">
          <ul className="nav">
            <li className="nav-item active">
              <Link href={toDiscover().href}>
                <a className="nav-link">Discover</a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href={toDiscover().href}>
              <a className="nav-link" aria-current="page">About</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href={toLogin().href}>
                <a className="nav-link">Login</a>
              </Link>
            </li>
            <li className="nav-item text-nowrap">
              <Link href={toSignup().href}>
                <a className="nav-link">Sign up</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Nav>
  )
}

export default Navbar