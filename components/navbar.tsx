// import Link from "next/link";
// import { useRoutesContext } from "./routeContext";
import { connect } from "react-redux";
import styles from '../styles/navbar.module.scss';
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';
// import { routeToHref } from "config/routes";
import Search from './search';
import { openLoginModalAction } from "../state/action";
import { Dispatch } from "redux";
import { AppState } from "types/core";

export interface NavBarProps {
  openLoginModalAction: () => void
}

const NavBar: React.FC<NavBarProps> = ({ 
  openLoginModalAction, 
}) => {
  const [ref, inView, entry] = useInView({
    root: null,
    rootMargin: '-20px 0px 0px 0px',
  });

  const openLoginModal = () => {
    openLoginModalAction()
  };

  useEffect(() => {
    const navBarElement = document.querySelector('#p-h');
    if(!inView && entry !== undefined) {
      navBarElement.classList.add(styles['scroll-effect'])
    }

    if(inView && entry !== undefined) {
      navBarElement.classList.remove(styles['scroll-effect'])
    }
  }, [inView, entry])

  return (
    <div className="row">
      <div id="p-h" className={"col-lg-12 col-md-12 col-sm-12 " + styles['nv-f-t']}>
        <div className="col-lg-2 col-md-2 col-sm-2">
          <h2 className={'' + styles.appLogo}>Wondor</h2>
        </div>
          <div className={styles["nav-bar-items"]}>
            <Search></Search>
            {/* <Search placeholder="input search text" size="large" style={{ width: 500}} /> */}
          </div>
      </div>
      <div id="r-h" ref={ref} className={styles['dummy-div']}>
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
