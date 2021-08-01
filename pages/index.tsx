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
import styles from '../public/styles/index.module.scss';
import { Card } from 'antd';

const { Meta } = Card;

const Home = () => {
  const myState = useSelector((state: AppState) => state.home);
  return (
    <>
      <Title title="Collab Easy ..." />
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
        
      <div className={"row " + styles.card_rw}>
        <div className="col-12">
          <h2 className="px-4">Popular categories</h2>
        </div>
        <div className="container fluid">
        <div className={"row flex-row flex-nowrap mt-4 pb-4 pt-2 " + styles['scrolling-wrapper']}>
          <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
            <Card hoverable bordered={false} style={{ height: '80%' }} cover={<Image src={musiciansImg} alt="cards" />}></Card>
          </div>
          <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
            <Card hoverable bordered={false} style={{ height: '80%' }} cover={<Image src={singersImg} alt="cards" />}></Card>
          </div>
          <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
            <Card hoverable bordered={false} style={{ height: '80%' }} cover={<Image src={paintersImg} alt="cards" />}></Card>
          </div>
          <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
            <Card hoverable bordered={false} style={{ height: '80%' }} cover={<Image src={dancersImg} alt="cards" />}></Card>
          </div>
          <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
            <Card hoverable bordered={false} style={{ height: '80%' }} cover={<Image src={dancersImg} alt="cards" />}></Card>
          </div>
          <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
            <Card hoverable bordered={false} style={{ height: '80%' }} cover={<Image src={dancersImg} alt="cards" />}></Card>
          </div>
        </div>
        </div>
      </div>

      <div className={"row " + styles.card_rw}>
          <div className="col-12">
          <h2 className="px-4">Featured artists</h2>
          </div>
      </div>


      {/* look at gallery options here: https://freefrontend.com/bootstrap-galleries/ */}

      <div className="container fluid">
        {/* "add gallery code" */}
      </div >


        <div className="container fluid">
            <div className={"row" + styles.card_rw}>
              <div className="col-12">
                <Image  src={inspireImg} alt="Landing page" />
              </div>
            </div>
        </div>
    </>
  )
}

export default Home