import Link from "next/link";
import { useRoutesContext } from "./routeContext";
import styles from '../public/styles/navbar.module.scss';
import React from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import { routeToHref } from "config/routes";
import { useSelector } from "react-redux";
import { AppState, UserState } from "types/core";


// I took the code from here https://stackoverflow.com/questions/62609559/navbar-collapse-button-does-not-show-items-for-bootstrap-4-5-0-and-nextjs-9-4-4
const NavBar = () => {
  const { toLogin, toSignup, toDiscover, toProfile, toWondorHome } = useRoutesContext();
  return (
    <Navbar expand="lg">
      <Link href={routeToHref(toWondorHome())} passHref>
        <Navbar.Brand>
          <h2 className={'navbar-brand f-30 ' + styles.appLogo}>Wondor</h2>
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end px-2" id="basic-navbar-nav">
        <Nav className="ml-auto" id="myNavItem">
          <Link href={toDiscover().href} passHref>
            <Nav.Link className="active" id="myNavItem">
              Discover
            </Nav.Link>
          </Link>
          <Link href={routeToHref(toDiscover())} passHref>
            <Nav.Link id="myNavItem">
              About us
            </Nav.Link>
          </Link>
              <Link href={routeToHref((toLogin()))} passHref>
                <Nav.Link id="myNavItem">Log in</Nav.Link>
              </Link>
              <Link href={routeToHref((toSignup()))} passHref>
                <Nav.Link id="myNavItem">
                  Sign up
                </Nav.Link>
              </Link>
          <Link href={routeToHref(toProfile({ id: '1234' }))} passHref>
            <Nav.Link>Profile</Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar;