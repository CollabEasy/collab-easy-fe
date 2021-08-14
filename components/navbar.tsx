import Link from "next/link";
import { useRoutesContext } from "./routeContext";
import { connect } from "react-redux";
import styles from '../public/styles/navbar.module.scss';
import React from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import { routeToHref } from "config/routes";
import { openLoginModalAction } from "../state/action";
import { useSelector } from "react-redux";
import { AppState, UserState } from "types/core";

const NavBar = (props) => {
  const { toLogin, toSignup, toDiscover, toProfile, toWondorHome } = useRoutesContext();

  const openLoginModal = () => {
    props.openLoginModalAction();
  };

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
          {/* <Link href={routeToHref((toLogin()))} passHref>
            <Nav.Link id="myNavItem">Log in</Nav.Link>
          </Link> */}
          <div className="nav-link" id="myNavItem" onClick={openLoginModal}>Log in</div>
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

const mapStateToProps = (state) => {
  return {
    homeReducer: state.homeReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  openLoginModalAction: data => dispatch(openLoginModalAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);