import Title from '../components/title'
import { useSelector } from 'react-redux'
import { AppState } from '../types/core';
import Image from 'next/image';
import profilePic from '../public/images/landing-1.png';
const Home = () => {
  const myState = useSelector((state: AppState) => state.home);

  console.log(myState, '<==== ');
  return (
    <>
      <Title title="Collab Easy ..." />
      <div className='container-fluid m-0'>
        <div className="row">
          <div className="col-md-12 m-0 p-0">
            <Image src={profilePic} alt="Picture of the author" />
          </div>
          <div className="col-md-12 col-sm-12 src-prnt">
            <div className="form-floating mb-3 col-md-4 col-sm-6 src-box">
              <input type="text" className="form-control" id="floatingInput" placeholder="" />
              <label className="label-search" htmlFor="floatingInput">Search Category, users, etc.</label>
              <span className="fa-cion"><em className="fa fa-search" aria-hidden="true"></em></span>
            </div>
          </div>
        </div>
        <div className="row p-t-10 row-sec">
          <div className="col-md-12 m-0 p-0">
            <Image src={profilePic} alt="Picture of the author" />
          </div>
        </div>
      </div>
    </>

  )
}

export default Home