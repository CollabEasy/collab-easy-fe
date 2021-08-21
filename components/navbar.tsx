// import Link from "next/link";
import { connect } from "react-redux";
import styles from '../styles/navbar.scss';
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';
import Search from './search';
import { openLoginModalAction } from "../state/action";
import { Dispatch } from "redux";
import { AppState } from "types/core";
import { /* Menu, Dropdown, */ Button } from 'antd';
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
      navBarElement.classList.add('scroll-effect')
    }

    if(inView && entry !== undefined) {
      navBarElement.classList.remove('scroll-effect')
    }
  }, [inView, entry])

  return (
    <div className="row">
      <div id="p-h" className="col-lg-12 col-md-12 col-sm-12 nv-f-t">
        <div className="app-logo">
          <h2>Wondor</h2>
        </div>
        <div className="navbar-search">
          <Search></Search>
        </div>
        <Button type="primary" size="large">Sign Up</Button>
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

const mapStateToProps = (state: AppState) => {
  return {
    homeReducer: state.home,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openLoginModalAction: () => dispatch(openLoginModalAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
