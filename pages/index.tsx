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
import { data } from 'copy';

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
          <div className="col-lg-12 col-sm-6 col-md-3">
            <div className={styles["cover-container"]}>
              <div className={styles['cover-item']}>
                <Image src={musiciansImg} />
              </div>
              <div className={styles['cover-item']}>
                <Image src={singersImg} />
              </div>
              <div className={styles['cover-item']}>
                <Image src={paintersImg} />
              </div>
              <div className={styles['cover-item']}>
                <Image src={dancersImg} />
              </div>
            </div>
          </div>
        </div>

        <div className="container fluid">
          <div className="row">
            <div className="col-md-12">
              <Image className={styles.searchbox + styles['padding']} src={inspireImg} alt="Landing page" />
            </div>
          </div>
        </div>
      </div>

      <div className={'container fluid'}>
        <div className="row col-12 text-left">
          <h2 className={styles['padding']}>Featured artwork</h2>
        </div>
      </div>

      <div className="container fluid">
        <div className={styles["grid-container"]}>
          {data.map((image) => (
            // eslint-disable-next-line react/jsx-key
            <div>
              <Image className={`grid-item grid-item-${image}`} src={image.src} alt={image.alt} width='500' height='500' placeholder='blur' blurDataURL={image.src}/>
                <p>{image.description}</p>
              </div>
            ))}
        </div>
      </div>

    </>
  )
}

export default Home