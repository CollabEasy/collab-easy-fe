import Title from '../components/title'
import { useSelector } from 'react-redux'
import { AppState } from '../types/core';
import Image from 'next/image';
import landingPageImg from '../public/images/landing-1.png';
import musiciansImg from '../public/images/musicians.png';
import singersImg from '../public/images/singers.png';
import paintersImg from '../public/images/painter.png';
import dancersImg from '../public/images/dancers.png';
import inspireImg from '../public/images/inspire.png';
import galleryImg1 from '../public/images/gallery1.jpg';
import galleryImg2 from '../public/images/gallery2.jpg';

import styles from '../public/styles/index.module.scss';
import { Card } from 'antd';

const { Meta } = Card;

const Home = () => {
  const myState = useSelector((state: AppState) => state.home);

  console.log(myState, '<==== ');
  return (
    <>
      <Title title="Collab Easy ..." />
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Image className={styles.searchbox} src={landingPageImg} alt="Landing page" />
            </div>
            <div className="col-md-12 col-sm-12 src-prnt">
              <div className="form-floating mb-3 col-md-4 col-sm-6 src-box">
                <input type="text" className="form-control" id="floatingInput" placeholder="" />
                <label className="label-search" htmlFor="floatingInput">Search Category, users, etc.</label>
                <span className="fa-cion"><em className="fa fa-search" aria-hidden="true"></em></span>
              </div>
            </div>
          </div>
        </div>

        <div className={'container fluid'}>
          <div className="row col-12 text-left">
            <h2 className={styles['padding']}>Popular categories</h2>
          </div>
        </div>

        <div className="container fluid">
          <div className={"row flex-row flex-nowrap mt-4 pb-4 pt-2" + styles['scrolling-wrapper']}>
            <div className={"col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3"}>
              <Card hoverable bordered={false} style={{ height: '100%' }} cover={<Image src={musiciansImg} alt="cards" />}>
                {/* <Meta title="Musicians" /> */}
              </Card>
            </div>
            <div className={"col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3"}>
              <Card hoverable bordered={false} style={{ height: '100%' }} cover={<Image src={singersImg} alt="cards" />}>
                {/* <Meta title="Musicians" /> */}
              </Card>
            </div>
            <div className={"col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3"}>
              <Card hoverable bordered={false} style={{ height: '100%' }} cover={<Image src={paintersImg} alt="cards" />}></Card>
            </div>
            <div className={"col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3"}>
              <Card hoverable bordered={false} style={{ height: '100%' }} cover={<Image src={dancersImg} alt="cards" />}></Card>
            </div>
            {/* <div className={"col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3" }>
              <Card hoverable bordered={false} style={{ height: '100%' }} cover={<Image src={dancersImg} alt="cards" />}></Card>
            </div> */}
            {/* <div className={"col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3" }>
              <Card hoverable bordered={false} style={{ height: '100%' }} cover={<Image src={dancersImg} alt="cards" />}></Card>
            </div> */}
          </div>
        </div>

        <div className={'container fluid'}>
          <div className="row col-12 text-left">
            <h2 className={styles['padding']}>Featured artwork</h2>
          </div>
        </div>

        {/* look at gallery options here: https://freefrontend.com/bootstrap-galleries/ */}

        <div className="container fluid">
          <div className="row">
            <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
              <Image
                src={galleryImg1}
                className="w-100 shadow-1-strong rounded mb-4"
                alt=""
              />
              <Image
                 src={galleryImg2}
                className="w-100 shadow-1-strong rounded mb-4"
                alt=""
              />
            </div>
            <div className="col-lg-4 mb-4 mb-lg-0">
              <Image
                 src={galleryImg2}
                className="w-100 shadow-1-strong rounded mb-4"
                alt=""
              />
              <Image
                src={galleryImg1}
                className="w-100 shadow-1-strong rounded mb-4"
                alt=""
              />
            </div>
            <div className="col-lg-4 mb-4 mb-lg-0">
              <Image
                 src={galleryImg2}
                className="w-100 shadow-1-strong rounded mb-4"
                alt=""
              />
              <Image
                src={galleryImg1}
                className="w-100 shadow-1-strong rounded mb-4"
                alt=""
              />
            </div>
          </div>
        </div >
        <div className="container fluid">
          <div className="row">
            <div className="col-md-12">
              <Image className={styles.searchbox + styles['padding']} src={inspireImg} alt="Landing page" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home