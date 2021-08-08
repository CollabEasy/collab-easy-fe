import Title from '../components/title'
import ProfileModal from '../components/profilePage';
import { useSelector } from 'react-redux'
import { AppState } from '../types/core';
import Image from 'next/image';
import landingPageImg from '../public/images/landing-1.png';
import musiciansImg from '../public/images/musicians.png';
import singersImg from '../public/images/singers.png';
import paintersImg from '../public/images/painter.png';
import dancersImg from '../public/images/dancers.png';
import inspireImg from '../public/images/inspire.png';
import styles from '../public/styles/index.module.scss';


const Home = () => {
  const myState = useSelector((state: AppState) => state.home);

  console.log(myState, '<==== ');
  return (
    <>
      <Title title="Collab Easy ..." />
      <ProfileModal/>
      <div>
        <div className="container fluid">
          <div className="container box">
            <div className='container-fluid m-0'>
              <div className="row">
                <div className="col-md-12 m-0 p-0">
                  <Image className={'container-fluid' + styles.searchbox} src={landingPageImg} alt="Landing page" />
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
          </div>
        </div>

        <div className={'container fluid'}>
          <div className="row welcome text-left">
            <div className="col-12">
              <h2 className={styles['padding']}>Popular categories</h2>
            </div>
          </div>
        </div>

        {/* took the code from here: http://jsfiddle.net/abhitalks/o3mxb4x9/1/ */}
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

        <div className={'container fluid'}>
          <div className="row welcome text-left">
            <div className="col-12">
              <h2 className={styles['padding']}>Featured art</h2>
            </div>
          </div>
        </div>

        {/* look at gallery options here: https://freefrontend.com/bootstrap-galleries/ */}

        <div className="container fluid">
          {/* "add gallery code" */}
        </div >
        
        <div className="container-fluid">
          <div className="container box">
            <div className='container-fluid m-0'>
              <div className="row">
                <div className="col-md-12 m-0 p-0">
                  <Image className={'container-fluid' + styles.searchbox} src={inspireImg} alt="Landing page" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home