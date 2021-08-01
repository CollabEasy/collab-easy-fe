import Title from '../components/title'
import { useSelector } from 'react-redux'
import { AppState } from '../types/core';
import Image from 'next/image';
import landingPageImg from '../public/images/landing-page.png';
import musiciansImg from '../public/images/musicians.png';
import singersImg from '../public/images/singers.png';
import paintersImg from '../public/images/painters.png';
import dancersImg from '../public/images/dancers.png';
import inspireImg from '../public/images/inspire.png';
import styles from '../public/styles/index.module.scss';
import { Card } from 'antd';

const { Meta } = Card;
// const array1 =  Array(4).fill(inspireImg)
// const array2 =  Array(3).fill(inspireImg)
// const array3 =  Array(2).fill(inspireImg)
// const array4 =  Array(2).fill(inspireImg)

const Home = () => {
  const myState = useSelector((state: AppState) => state.home);
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
          <h2 className="px-4">Popular categories</h2>
          <div className={"row text-center flex-row flex-nowrap mt-4 pb-4 pt-2 " + styles['scrolling-wrapper']}>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Card hoverable style={{ width: '100%', borderRadius: '20px' }} cover={<Image src={musiciansImg} alt="cards" />}>
                <Meta title="Musicians" />
              </Card>
            </div>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Card hoverable style={{ height: '100%' }} cover={<Image src={singersImg} alt="cards" />}>
                <Meta title="Singers" />
              </Card>
            </div>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Card hoverable style={{ height: '100%' }} cover={<Image src={paintersImg} alt="cards" />}>
                <Meta title="Painters" />
              </Card>
            </div>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Card hoverable style={{ height: '100%' }} cover={<Image src={dancersImg} alt="cards" />}>
                <Meta title="Dancers" />
              </Card>
            </div>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Card hoverable style={{ height: '100%' }} cover={<Image src={dancersImg} alt="cards" />}>
                <Meta title="Dancers" />
              </Card>
            </div>
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2">
              <Card hoverable style={{ height: '100%' }} cover={<Image src={dancersImg} alt="cards" />}>
                <Meta title="Dancers" />
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="row " style={{ paddingTop: '2vmin' }}>
        <div className="col-12">
          <h2 className="px-4">Featured artists</h2>
        </div>
      </div>

      {/* look at gallery options here: https://freefrontend.com/bootstrap-galleries/ , https://thetuteur.com/react-image-gallery-with-masonry-js/*/}

      {/* <div className="container">
        <div className="row">
          <div style={{margin:"2%"}}>
            <div className="row">
                <div className="col-md-3" style={{ marginBottom: '7%' }}>
                {array1.map(_=><Image  src={paintersImg} className="img-fluid img-thumbnail rounded float-left"/>)}
                </div>
                <div className="col-md-3" style={{ marginBottom: '7%' }}>
                {array2.map(_=><Image src={paintersImg} className="img-fluid img-thumbnail rounded float-left"/>)}
                </div>
                <div className="col-md-3" style={{ marginBottom: '7%' }}>
                {array3.map(_=><Image src={paintersImg} className="img-fluid img-thumbnail rounded float-left"/>)}
                </div>
                <div className="col-md-3" style={{ marginBottom: '7%' }}>
                {array4.map(_=><Image  src={paintersImg} className="img-fluid img-thumbnail rounded float-left"/>)}
                </div>
            </div>
          </div>
        </div>
      </div> */}



      <div className={"row" + styles.card_rw}>
        <div className="col-md-12 m-0 p-0">
          <Image src={inspireImg} alt="Landing page" />
        </div>
      </div>
    </>
  )
}

export default Home