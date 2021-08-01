import Link from "next/link";
import Title from "./title";
import { useRoutesContext } from "./routeContext";
import styles from '../public/styles/navbar.module.scss';
import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav, Button, Navbar, NavDropdown } from 'react-bootstrap';


// I took the code from here https://stackoverflow.com/questions/62609559/navbar-collapse-button-does-not-show-items-for-bootstrap-4-5-0-and-nextjs-9-4-4

const Navbarr = () => {
  const { toLogin, toSignup, toDiscover, toWondorHome } = useRoutesContext()
  return (
    <Navbar expand="lg" id="myNavbar" className="container-xl">

      <Navbar.Brand href="#home">
        <Link href={toWondorHome().href}>
           <a className={'navbar-brand ' + styles.appLogo}>Wondor</a>
         </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav className="ml-auto" id="myNavItem">
          <Nav.Link href={toDiscover().href} id="myNavItem">Discover</Nav.Link>
          <Nav.Link href={toDiscover().href} id="myNavItem">About</Nav.Link>
          <Nav.Link href={toLogin().href} id= "myNavItem">Log in</Nav.Link>
          <Nav.Link href={toSignup().href} id= "myNavItem">Sign up</Nav.Link>
        </Nav>
      </Navbar.Collapse>

    </Navbar>
  )
}

export default Navbarr