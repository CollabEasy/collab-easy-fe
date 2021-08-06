import Title from '../components/title'
import Link from "next/link";
import { useSelector } from 'react-redux'
import { AppState } from '../types/core';
import Image from 'next/image';
import landingPageImg from '../public/images/landing.png';
import musiciansImg from '../public/images/musicians.png';
import singersImg from '../public/images/singers.png';
import paintersImg from '../public/images/painters.png';
import dancersImg from '../public/images/dancers.png';
import inspireImg from '../public/images/inspire.png';
import styles from '../public/styles/index.module.scss';
import { Card } from 'antd';
import { useRoutesContext } from "../components/routeContext";
import { data } from 'copy';

const { Meta } = Card;

const Home = () => {
  const myState = useSelector((state: AppState) => state.home);

  const { toArtist } = useRoutesContext();
  console.log(toArtist().href, '<-- toArtist().href');
  return (
    <>
      <Title title="Wondor | meet the artists" />
      <div className="row">
        <div className="col-md-12 m-0 p-0">
          <Image src={landingPageImg} alt="Landing page" />
        </div>
        <div className="col-md-12 col-sm-12 src-prnt">
          <div className="form-floating mb-3 col-md-4 col-sm-6 src-box">
            <input type="text" className="form-control" id="floatingInput" placeholder="" />
            <label className="label-search" htmlFor="floatingInput">Search Category, users, etc.</label>
            <span className="fa-cion"><em className="fa fa-search" aria-hidden="true"></em></span>
          </div>
        </div>
      </div>

      <div className={"row " + styles.card_rw}>
        <div className="container">
          <h2 className={styles.padding}>Popular categories</h2>
          <div className={"row text-center flex-row flex-nowrap mt-4 pb-4 pt-2 " + styles['scrolling-wrapper']}>
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
          <div className={"row text-center flex-row flex-nowrap mt-4 pb-4 pt-2 " + styles['scrolling-wrapper']}>
            <div className="col-12">
              <Image className={styles.searchbox + styles['padding']} src={inspireImg} alt="Landing page" />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12" >
          <h2 className={styles.padding}>Featured artists</h2>
        </div>
      </div>

      {/* look at gallery options here: https://freefrontend.com/bootstrap-galleries/ , https://thetuteur.com/react-image-gallery-with-masonry-js/, https://codepen.io/rperry1886/pen/KKwbQNP*/}
      <div className={styles["grid-container"]}>
        {data.map((image) => (
          // eslint-disable-next-line react/jsx-key
          <div>
            <Image className={`grid-item grid-item-${image}`} src={image.src} alt={image.alt} width='500' height='500' placeholder='blur' blurDataURL={image.src} />
            <p>{image.description}</p>
          </div>
        ))}
      </div>

      {/* footer code from here https://bootsnipp.com/snippets/2eMK5 */}
      <footer className={styles["footer"]} style={{ background: "#F9F9F9" }}>
        <div className="container">
          <div className="row row-30">
            <div className="col-md-4 col-xl-5">
              <div className="pr-xl-4">
                <h2 className={'navbar-brand f-30 ' + styles.appLogo}>Wondor</h2>
                <p>We are an award-winning creative agency, dedicated to the best result in web design, promotion, business consulting, and marketing.</p>
                <p className="rights"><span>©  </span><span className="copyright-year">2018</span><span> </span><span>Waves</span><span>. </span><span>All Rights Reserved.</span></p>
                <dl className={styles["contact-list"]}>
                  <dd><a href="mailto:#">dkstudioin@gmail.com</a></dd>
                </dl>
                <dl className={styles["contact-list"]}>
                  <dd><a href="tel:#">https://karosearch.com</a> <span>or</span> <a href="tel:#">https://karosearch.com</a>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="col-md-4 col-xl-3">
              <ul className={styles["nav-list"]}>
                <li><a href="#">Sign up</a></li>
                <li><a href="#">Sign in</a></li>
                <li><a href="#">Get Inspired</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">About Us</a></li>
              </ul>
            </div>
            <div className="col-md-4 col-xl-3">
              <ul className={styles["nav-list"]}>
                <li><a href="#">Terms & Policy</a></li>
                <li><a href="#">Tutorial</a></li>
                <li><a href="#">privacy</a></li>
                <li><a href="#">Contacts</a></li>
              </ul>
            </div>
          </div>
          {/* <div className="container">
            <ul>
                <li><a target="_blank" href="https://www.facebook.com/Nous-Care-109397770411017/"> <i className="fa fa-facebook fa-lg" area-hidden="true"></i></a></li>
                <li><a target="_blank" href="https://twitter.com/CareNous"> <i className="fa fa-twitter fa-lg" area-hidden="true"></i></a></li>
                <li><a target="_blank" href="https://www.youtube.com/channel/UCWXgFHh9jduTtB7fbdOXcqA"> <i className="fa fa-youtube-play fa-lg" area-hidden="true"></i></a></li>
                <li><a target="_blank" href="https://www.instagram.com/nous_care/"> <i className="fa fa-instagram fa-lg" area-hidden="true"></i></a></li>
                <li><a target="_blank" href="https://www.pinterest.com/nouscare/"> <i className="fa fa-pinterest fa-lg" area-hidden="true"></i></a></li>
                <li><a target="_blank" href="https://nous-care.tumblr.com/"> <i className="fa fa-tumblr fa-lg" area-hidden="true"></i></a></li>
                <div style={{clear: "both"}}></div>
            </ul>
          </div> */}
        </div>
      </footer>
    </>
  )
}

export default Home