import Link from "next/link";
import { useRoutesContext } from "./routeContext";
import styles from '../public/styles/navbar.module.scss';
import React, { useEffect } from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import { routeToHref } from "config/routes";
import { useSelector } from "react-redux";
import { AppState, UserState } from "types/core";


// I took the code from here https://stackoverflow.com/questions/62609559/navbar-collapse-button-does-not-show-items-for-bootstrap-4-5-0-and-nextjs-9-4-4
const NavBar = () => {
  const { toLogin, toSignup, toDiscover, toProfile, toWondorHome } = useRoutesContext();

  const [scrolled, setScrolled] = React.useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    }
    else {
      setScrolled(false);
    }
  }


  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  })
  useEffect(() => {
    const elem = document.querySelector('#p-h');
    if (scrolled) {
      elem['style'].setProperty('position', 'fixed');
      elem['style'].setProperty('background', 'white');
    } else {
      elem['style'].setProperty('position', 'absolute');
      elem['style'].setProperty('background', 'transparent');
    }
  }, [scrolled])

  return (
    <div className="row">
      <div id="p-h" className={"col-lg-12 col-md-12 col-sm-12 " + styles['nv-f-t']}>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <h2 className={'' + styles.appLogo}>Wondor</h2>
        </div>
        <div className="col-lg-10 col-md-10 col-sm-10">
          <div className="col-lg-7 col-md-7 col-sm-7 clearfix"></div>
          <div className={"col-lg-1 col-md-1 col-sm-1 " + styles['c-p']}>
            <Link href={toDiscover().href} passHref>
              Discover
            </Link>
          </div>
          <div className={"col-lg-1 col-md-1 col-sm-1 " + styles['c-p']}>
            <Link href={routeToHref(toDiscover())} passHref>
              About us
            </Link>
          </div>
          <div className={"col-lg-1 col-md-1 col-sm-1 " + styles['c-p']}>
            <Link href={routeToHref((toLogin()))} passHref>
              Log in
            </Link>
          </div>
          <div className={"col-lg-1 col-md-1 col-sm-1 " + styles['c-p']}>
            <Link href={routeToHref((toSignup()))} passHref>
              Sign up
            </Link>
          </div>
          <div className={"col-lg-1 col-md-1 col-sm-1 " + styles['c-p']}>
            <Link href={routeToHref(toProfile({ id: '1234' }))} passHref>
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar;