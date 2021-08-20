import Title from '../components/title'
import ProfileModal from '../components/profilePage';
import Link from "next/link";
import { connect } from "react-redux";
// import { useSelector } from 'react-redux'
// import { AppState } from '../types/core';
import Image from 'next/image';
import landingPageImg from '../public/images/landing.png';
import musiciansImg from '../public/images/musicians.png';
import singersImg from '../public/images/singers.png';
import paintersImg from '../public/images/painters.png';
import dancersImg from '../public/images/dancers.png';
import inspireImg from '../public/images/inspire.png';
import styles from '../styles/discover.scss';
import { Card } from 'antd';
import { useRoutesContext } from "../components/routeContext";
import { data } from 'copy';
import React, { useEffect, useState } from 'react';
import Navbar from "../components/navbar";
import { AppState, LoginModalDetails } from 'types/core';

const { Meta } = Card;

export interface HomeProps {
  homeDetails: any
  loginModalDetails: LoginModalDetails
}

const Home: React.FC<HomeProps> = ({ loginModalDetails }) => {
  const [showModal, setShowModal] = useState(false);
  const { toArtist } = useRoutesContext();

  const [scrolled, setScrolled] = React.useState<boolean>(false);
  const [scrollY, setScrollY] = React.useState<number>(0);
  const handleScroll = () => {
    const offset = window.scrollY;
    console.log("Your screen resolution is: " + window.screen.width * window.devicePixelRatio + "x" + window.screen.height * window.devicePixelRatio)
    console.log("Your screen width is: " + window.screen.width)
    setScrollY(() => offset);
    console.log(offset)
    if (offset > 200) {
      setScrolled(true);
    }
    else {
      setScrolled(false);
    }
  }

  useEffect(() => {
    if (false) setShowModal(true);
  }, [loginModalDetails]);


  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  })
  useEffect(() => {
    const elem = document.querySelector('#p-h');
    const _srcElem = document.querySelector('#_src-i');

    if (scrolled) {
      elem['style'].setProperty('position', 'fixed');
      elem['style'].setProperty('background', 'white');
    } else {
      elem['style'].setProperty('position', 'absolute');
      elem['style'].setProperty('background', 'transparent');
    }

    if (scrollY >= 470) {
      _srcElem['style'].setProperty('display', 'none');
    } else {
      _srcElem['style'].removeProperty('display');
    }

  }, [scrolled, scrollY])
  return (
    <>
      <Title title="Wondor | meet the artists" />
      {showModal && (
        <ProfileModal></ProfileModal>
      )
      }
      <div className="row">
        <Navbar scrollY={scrollY} />
        <div className="col-md-12 m-0 p-0">
          <Image src={landingPageImg} alt="Landing page" />
        </div>
        <div id="_src-i" className="col-md-12 col-sm-12 src-prnt">
          <div className="mb-3 col-md-4 col-sm-6 src-box">
            <input type="text" className="form-control" id="floatingInput" placeholder="Search Category, users, etc." />
            <span className="fa-cion"><em className="fa fa-search" aria-hidden="true"></em></span>
          </div>
        </div>
      </div>

      <div className={"row card_rw"}>
        <div className="container">
          <h2 className="custom_padding">Popular categories</h2>
          <div className={"row text-center flex-row flex-nowrap mt-4 pb-4 pt-2 scrolling-wrapper"}>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Link href={toArtist().href + 'musician'} passHref>
                <Card hoverable style={{ width: '100%', borderRadius: '20px' }} cover={<Image src={musiciansImg} alt="cards" />}>
                  <Meta title="Musicians" />
                </Card>
              </Link>
            </div>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Link href={toArtist().href + 'singer'} passHref>
                <Card hoverable style={{ height: '100%' }} cover={<Image src={singersImg} alt="cards" />}>
                  <Meta title="Singers" />
                </Card>
              </Link>
            </div>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Link href={toArtist().href + 'painter'} passHref>
                <Card hoverable style={{ height: '100%' }} cover={<Image src={paintersImg} alt="cards" />}>
                  <Meta title="Painters" />
                </Card>
              </Link>
            </div>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Link href={toArtist().href + 'dancer'} passHref>
                <Card hoverable style={{ height: '100%' }} cover={<Image src={dancersImg} alt="cards" />}>
                  <Meta title="Dancers" />
                </Card>
              </Link>
            </div>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Link href={toArtist().href + 'dancer'} passHref>
                <Card hoverable style={{ height: '100%' }} cover={<Image src={dancersImg} alt="cards" />}>
                  <Meta title="Dancers" />
                </Card>
              </Link>
            </div>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Link href={toArtist().href + 'dancer'} passHref>
                <Card hoverable style={{ height: '100%' }} cover={<Image src={dancersImg} alt="cards" />}>
                  <Meta title="Dancers" />
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="container">
          <div className={"row text-center flex-row flex-nowrap mt-4 pb-4 pt-2 scrolling-wrapper"}>
            <div className="col-12">
              <Image className="searchbox custom_padding" src={inspireImg} alt="Landing page" />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12" >
          <h2 className="custom_padding">Featured artists</h2>
        </div>
      </div>

      {/* look at gallery options here: https://freefrontend.com/bootstrap-galleries/ , https://thetuteur.com/react-image-gallery-with-masonry-js/, https://codepen.io/rperry1886/pen/KKwbQNP*/}
      <div className="grid-container">
        {data.map((image) => (
          // eslint-disable-next-line react/jsx-key
          <div key={image.id}>
            <Image className={`grid-item grid-item-${image}`} src={image.src} alt={image.alt} width='500' height='500' placeholder='blur' blurDataURL={image.src} />
            <p>{image.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}

const mapStateToProps = (state: AppState) => ({
  loginModalDetails: state.home.loginModalDetails
})

export default connect(mapStateToProps, null)(Home);
