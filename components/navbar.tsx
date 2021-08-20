import Link from "next/link";
import { useRoutesContext } from "./routeContext";
import { connect } from "react-redux";
import styles from '../styles/navbar.module.scss';
import React, { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { routeToHref } from "config/routes";
import { openLoginModalAction } from "../state/action";
import { Dispatch } from "redux";
import { AppState } from "types/core";

export interface NavBarProps {
  openLoginModalAction: () => void
  scrollY: number
}

// I took the code from here https://stackoverflow.com/questions/62609559/navbar-collapse-button-does-not-show-items-for-bootstrap-4-5-0-and-nextjs-9-4-4
const NavBar: React.FC<NavBarProps> = ({ 
  openLoginModalAction,
  scrollY 
}) => {
  const { toSignup, toDiscover, toProfile } = useRoutesContext();
  const { user, error } = useUser();
  // console.log(scrollY, '<-')
  const openLoginModal = () => {
    openLoginModalAction()
  };

  useEffect(() => {
    const _hdr_s = document.querySelector('#_hdr-id');
    if (scrollY >= 470) {
      _hdr_s['style'].setProperty('display', 'block');
    } else {
      _hdr_s['style'].setProperty('display', 'none');
    }
  }, [scrollY])
  return (
    <div className="row">
      <div id="p-h" className={"col-lg-12 col-md-12 col-sm-12 " + styles['nv-f-t']}>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <h2 className={'' + styles.appLogo}>Wondor</h2>
        </div>
        <div className="col-lg-10 col-md-10 col-sm-10">
          <div id="_hdr-id" style={{ display: "none" }} className="col-lg-7 col-md-2 col-sm-2 clearfix">
            <input type="text" className="form-control" id="floatingInput" placeholder="Search Category, users, etc." />
            {/* <span className="fa-cion"><em className="fa fa-search" aria-hidden="true"></em></span> */}
          </div>
          <div className={"col-lg-1 col-md-2 col-sm-2 " + styles['c-p']}>
            <Link href={toDiscover().href} passHref>
              Discover
            </Link>
          </div>
          <div className={"col-sm-2 col-lg-1 col-md-2  " + styles['c-p']}>
            <Link href={routeToHref(toDiscover())} passHref>
              About us
            </Link>
          </div>
          { !user && (
              <div className={"col-lg-1 col-md-2 col-sm-2 " + styles['c-p']}>
                <div id="myNavItem" onClick={openLoginModal}>
                  <span className="f-15 md-c000 csr-pnt">Log in</span>
                </div>
              </div>
            )
          }
          { user && (
              <div className={"col-lg-1 col-md-2 col-sm-2 " + styles['c-p']}>
                <div id="myNavItem">
                  <a className="f-15 csr-pnt" href="/api/auth/logout" style={{color: '#000'}}>Logout</a>
                </div>
              </div>
            )
          }
          {/* <div className={"col-lg-1 col-md-2 col-sm-2 " + styles['c-p']}>
            <Link href={routeToHref((toSignup()))} passHref>
              Sign up
            </Link>
          </div> */}
          <div className={"col-lg-1 col-md-2 col-sm-2 " + styles['c-p']}>
            <Link href={routeToHref(toProfile({ id: '1234' }))} passHref>
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    homeReducer: state.home,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openLoginModalAction: () => dispatch(openLoginModalAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
