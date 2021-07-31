import Title from '../components/title'
import { useSelector } from 'react-redux'
import { AppState } from '../types/core';
import Image from 'next/image';
import landingPageImg from '../public/images/landing-1.png';
import styles from '../public/styles/landing-page.module.scss';


const Home = () => {
  const myState = useSelector((state: AppState) => state.home);

  console.log(myState, '<==== ');
  return (
    <>
      <Title title="Collab Easy ..." />
      <div>
        <div className="container-fluid">
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

        <div className="container-fluid" style={{ padding: '20px' }}>
          <div className="row welcome text-left">
            <div className="col-12">
              <h2>Popular Categories.</h2>
            </div>
          </div>
        </div>


        <div className="container fluid">
          <div className="row text-center padding">
            <div className='col-xs-12 col-sm-6 col-md-3 speciality'>
              <Image src={landingPageImg} alt="Listing of online prescription treatment options for erectile dysfunction and premature ejaculation." />
              <h6>Women's Health</h6>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3 speciality">
              <Image src={landingPageImg} alt="Listing of online prescription treatment options for erectile dysfunction and premature ejaculation." />
              <h6>Skin Care</h6>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3 speciality">
              <Image src={landingPageImg} alt="Listing of online prescription treatment options for erectile dysfunction and premature ejaculation." />
              <h6>Men's Health</h6>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3 speciality">
              <Image src={landingPageImg} alt="Listing of online prescription treatment options for erectile dysfunction and premature ejaculation." />
              <h6>Hair Fall</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home