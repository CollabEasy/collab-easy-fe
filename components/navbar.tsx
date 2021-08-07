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
 // const id = useSelector((state: UserState) => state.user.userId) 
  return (
    <Navbar expand="lg">
      <Navbar.Brand href={routeToHref(toWondorHome())}>
        <h2 className={'navbar-brand f-30 ' + styles.appLogo}>Wondor</h2>
        {/* <Link href={toWondorHome().href} passHref>
          <span className={'navbar-brand f-30 ' + styles.appLogo}>Wondor</span>
        </Link> */}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end px-2" id="basic-navbar-nav">
        <Nav className="ml-auto" id="myNavItem">
          <Nav.Link className="active" href={toDiscover().href} id="myNavItem">Discover</Nav.Link>
          <Nav.Link href={routeToHref(toDiscover())} id="myNavItem">About us</Nav.Link>
          <Nav.Link href={routeToHref((toLogin()))} id="myNavItem">Log in</Nav.Link>
          <Nav.Link href={routeToHref((toSignup()))} id="myNavItem">Sign up</Nav.Link>
          <Nav.Link href={routeToHref(toProfile({ id: '1234' }))}>Profile</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar;