import { NextPage } from 'next'
import Image from 'next/image';
import Title from '../components/title'
import aboutUsImage from '../public/images/about-us.png';
import dancersImg from '..//public/images/dancers.png';
import styles from '../styles/aboutUs.module.scss';
import { Card } from 'antd';

const { Meta } = Card;

const AboutUs: NextPage<{}> = () => {
  return (
    <>
      <Title title="About Us" />
      <div>
        <div className= {styles["customImage"]}>
          <Image src={aboutUsImage} height='500' alt="About us page" />
          <h1 className={styles["heading"]}>About Us</h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className='text-success'>Welcome!</h1>
            <h2>Know More About Us</h2>
            <hr></hr>
            <p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore etae magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
        <div className="row" style={{ paddingTop: '2rem' }}>
          <div className="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3" style={{ padding: '1rem' }}>
            <Card hoverable style={{ height: '100%' }} cover={<Image src={dancersImg} alt="cards" />}>
              <Meta title="Dancers" />
            </Card>
          </div>
          <div className="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3" style={{ padding: '1rem' }}>
            <Card hoverable style={{ height: '100%' }} cover={<Image src={dancersImg} alt="cards" />}>
              <Meta title="Dancers" />
            </Card>
          </div>
          <div className="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3" style={{ padding: '1rem' }}>
            <Card hoverable style={{ height: '100%' }} cover={<Image src={dancersImg} alt="cards" />}>
              <Meta title="Dancers" />
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutUs