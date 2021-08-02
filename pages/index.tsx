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
          <div>
            <img className="grid-item grid-item-1" src='https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='' />
            <p>"I'm so happy today!"</p>
          </div>
          <div>
            <img className='grid-item grid-item-2' src='https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='' />
            <p>"I see those nugs."</p>
          </div>
          <div>
            <img className='grid-item grid-item-3' src='https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='' />
            <p>"I love you so much!"</p>
          </div>
          <div>
            <img className='grid-item grid-item-4' src='https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='' />
            <p>"I'm the baby of the house!"</p>
          </div>
          <div>
            <img className='grid-item grid-item-5' src='https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='/' />
            <p>"Are you gunna throw the ball?"</p>
          </div>
          <div>
            <img className='grid-item grid-item-6' src='https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='' />
            <p>"C'mon friend!"</p>
          </div>

          <div>
            <img className='grid-item grid-item-7' src='https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='' />
            <p>"A rose for mommy!"</p>
          </div>
          <div>
            <img className='grid-item grid-item-8' src='https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='' />
            <p>"You gunna finish that?"</p>
          </div>
          <div>
            <img className='grid-item grid-item-9' src='https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='' />
            <p>"We can't afford a cat!"</p>
          </div>
          <div>
            <img className='grid-item grid-item-10' src='https://images.unsplash.com/photo-1504595403659-9088ce801e29?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='' />
            <p>"Dis my fren!"</p>
          </div>
        </div>
      </div>

    </>
  )
}

export default Home