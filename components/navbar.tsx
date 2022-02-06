// import Link from "next/link";
import { connect, ConnectedProps } from "react-redux";
import Link from "next/link";
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import Search from './search';
import { Dispatch } from "redux";
import { /* Menu, Dropdown, */ Button  } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AppState } from "types/states";
import Image from 'next/image';
import titleDesktopImg from '../public/images/title-desktop.svg';
import titleMobileImg from '../public/images/logo.svg';
import { useRoutesContext } from "../components/routeContext";
import { routeToHref } from "config/routes";

import { openLoginModalAction, resetUserLoggedIn } from "state/action";
// import { UserOutlined, SettingOutlined } from '@ant-design/icons';

/* const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer">
        <div className={styles["menu__items"]}> 
          <UserOutlined /> <span>Profile</span>  
        </div>
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer">
        <div> <SettingOutlined /> <span>Settings</span>  </div>
      </a>
    </Menu.Item>
   { <Menu.Item>
      <a target="_blank" rel="noopener noreferrer">
        Logout
      </a>
    </Menu.Item>}
  </Menu>
); */

const mapStateToProps = (state: AppState) => {
  const isLoggedIn = state.user.isLoggedIn;
  const user =  state.user.user;
  return { isLoggedIn, user }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openLoginModalAction: () => dispatch(openLoginModalAction()),
  resetUserLoggedIn: () => dispatch(resetUserLoggedIn())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
} & ConnectedProps<typeof connector>;

const NavBar = ({ 
  openLoginModalAction, 
  isLoggedIn,
  user,
  resetUserLoggedIn
} : Props) => {
  const [ref, inView, entry] = useInView({
    root: null,
    rootMargin: '-20px 0px 0px 0px',
  });

  const [hideSignUp, setHideSignUp] = useState(false);
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  // const [isMobileVersion, setIsMobileVersion] = useState(false);
  

  const openLoginModal = () => {
    openLoginModalAction()
  };

  const checkDevice = () => {
    return window.matchMedia("only screen and (max-width: 767px)").matches;
  }
  

  const { toWondorHome, toArtistProfile, toEditProfile } = useRoutesContext();

  useEffect(() => {
    const navBarElement = document.querySelector('#p-h');
    if(!inView && entry !== undefined) {
      navBarElement.classList.add('scroll-effect');
      navBarElement.classList.add('animate__fadeInDown');
    }

    if(inView && entry !== undefined) {
      navBarElement.classList.remove('scroll-effect');
      navBarElement.classList.remove('animate__fadeInDown');
    }
  }, [inView, entry])

  useEffect(() => {
    if( isLoggedIn ){
      setHideSignUp(true);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if( user?.profile_pic_url ) setProfilePic(user.profile_pic_url);
  }, [user]);

  const logoutUser = () => {
    localStorage.removeItem('token');
    resetUserLoggedIn();
    setHideSignUp(false);
    setShowLoginOptions(false);
  }

  return (
    <div className="row">
      <div id="p-h" className="col-lg-12 col-md-12 col-sm-12 nv-f-t animate__animated">
        <div id="app-logo-desktop">
          <Link  href={routeToHref(toWondorHome())} passHref>
            <Image src={titleDesktopImg}  alt="Landing page" onClick={() => setShowLoginOptions(false)} />   
          </Link>
        </div>
        <div id="app-logo-mobile">
          <Link  href={routeToHref(toWondorHome())} passHref>
            <Image src={titleMobileImg}  alt="Landing page" onClick={() => setShowLoginOptions(false)} /> 
          </Link>
        </div>

        <div className="navbar-search">
          <Search></Search>
        </div>
        { !hideSignUp ? (
            <Button id="sign-up-desktop" type="primary" onClick={openLoginModal}>Sign Up</Button>
          ) : (
            <div className="login-menu-container">
              <div className={`menu-icon ${showLoginOptions ? 'hide-icon' : ''}`}
                   onClick={() => setShowLoginOptions(!showLoginOptions)}
              >
                { user?.profile_pic_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profilePic} alt="profile-pic"/>
                  ) : (
                    <div className="default-profile">
                      <UserOutlined className="user-icon" />
                    </div>
                  )
                }
              </div>
              { checkDevice() && showLoginOptions && (
                  <div className="sidebar-mask" onClick={() => setShowLoginOptions(false)}></div>
                )
              }
              { showLoginOptions && (
                  <div className={`login-options-container ${checkDevice() ? 'animate__animated animate__slideInRight' : ''}`}>
                    <Link href={routeToHref(toEditProfile("edit"))} passHref>
                      <div className="common-login-option settings-option" onClick={() => setShowLoginOptions(false)}>
                        <span className="f-14">Settings</span>
                      </div>
                    </Link>
                    <Link href={routeToHref(toArtistProfile(user.slug))} passHref>
                      <div className="common-login-option profile-option" onClick={() => setShowLoginOptions(false)}>
                        <span className="f-14">Profile</span>
                      </div>
                    </Link>
                    <div className="common-login-option logout-option" onClick={logoutUser}>
                      <span className="f-14">Logout</span>
                    </div>                 
                  </div>
                )
              }
            </div>
          )
        }

        {/* <div className={styles["navbar-menu"]}>
          <Dropdown 
            overlay={menu} 
            overlayStyle={{width:'100px', borderRadius:'10px'}}
            placement="topCenter"
          >
            <button>
              <svg x="0px" y="0px" width="36" height="36" viewBox="0 0 24 24" style={{fill: "#000000"}}>
                <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"></path>
              </svg>
            </button>
          </Dropdown>
        </div> */}
      </div>
      <div ref={ref} className="dummy-div">
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
