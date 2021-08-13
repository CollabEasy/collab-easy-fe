import Title from '../components/title'
import { useSelector } from 'react-redux'
import { AppState } from '../types/core';
import { Modal, Button } from 'antd';
import React, { useState } from 'react';
import Image from 'next/image';
import leftImage from '../public/images/profile.png';
import styles from '../public/styles/profileModal.module.scss';
import loginStyle from '../public/styles/login.module.scss';
import Link from 'next/link';

const Login = () => {
  const myState = useSelector((state: AppState) => state.home);

  const [visibleLogin, setVisibleLogin] = useState(false);
  console.log(myState, '<==== ');
  const windowWidth = 1000;

  return (
    <>
      <Title title="Login" />
      <Button type="primary" onClick={() => setVisibleLogin(() => true)}>
        Open Modal of 1000px width
      </Button>
      <Modal
        centered
        visible={visibleLogin}
        onOk={() => setVisibleLogin(() => false)}
        onCancel={() => setVisibleLogin(() => false)}
        destroyOnClose={true}
        footer={null}
        width={windowWidth > 680 ? 900 : 450}
        bodyStyle={{ padding: 0 }}
      >
        <div className={styles["container"]}>
          <div className={styles["left-image"]}>
            <Image
              src={leftImage}
              alt="Profile left"
              layout="fill"
            />
          </div>
          <div className={styles["profile-form"]}>
            <div className={styles["profile-title"] + " " + loginStyle['login-h']}>
              <h1>Sign up to Wondor</h1>
              <p>a door to the world where artists collaborate</p>
            </div>
            <div className={"" + loginStyle['fb']}>
              <Link href="#" passHref>
                <span>
                  <em className="fa fa-facebook-square"></em>
                  <a>
                    Continue with Facebook
                  </a>
                </span>
              </Link>
            </div>
            <div className={"" + loginStyle['fb']}>
              <Link href="#" passHref>
                <span>
                  <em className="fa fa-google" aria-hidden="true"></em>
                  <a>
                    Continue with Google
                  </a>
                </span>
              </Link>
            </div>
            <div className={"" + loginStyle['rit_txt']}>
              <span>By continuing, you agree to WonDor’s <a href="#">Terms of Service</a> and acknowledge you've read our Privacy Policy.</span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Login