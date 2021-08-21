import Title from '../../components/title';
import Image from 'next/image';
import avatar from '../../public/images/avatar.png'
import React from 'react';

/**
 * @description On Click tab active the window
 * @param evt 
 * @param actionName 
 */
const toggleTab = (actionName) => {
  let i;
  let tabcontent;
  let tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(actionName).style.display = "block";
  document.getElementById(`${actionName}_1`).classList.add('active');;

};

const ArtistProfile = () => {

  return (
    <>
      <Title title="Artist Profile" />
      <div className="artist-profile-page container">
        <div className="row">
          <div className="col-xl-12 col-md-12 col-sm-12">
            <div className="avtr">
              <Image src={avatar} alt="Landing page" className="rounded mx-auto d-block" />
            </div>
          </div>
          <div className="col-xl-12 col-md-12 col-sm-12">
            <div className="_artist">
              <span className="f-20">Rahul Gupta</span>
              <span className="f-12">painter, Singer</span>
            </div>
          </div>
          <div className="col-xl-12 col-md-12 col-sm-12">
            <div className="_connect">
              <span className="">
                <a href="javascript:void(0)">Follow</a>
              </span>
              <span className="">
                <a href="javascript:void(0)">Message</a>
              </span>
            </div>
          </div>
          <div className="col-xl-12 col-md-12 col-sm-12 _tab-p">
            <div className="col-xl-4 col-md-4 col-sm-4">
              <div className="tab">
                <button id="about_1" className="tablinks active about" onClick={() => toggleTab( 'about')}>About</button>
                <button id="sample_1" className="tablinks sample" onClick={() => toggleTab('sample')}>My sample work</button>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 col-sm-4">
              <div id="about" className="tabcontent" style={{ display: 'block' }}>
                <p className="f-w-b">Description</p>
                <p>My name is rahul gupta and i like to paint, sing, write etc and etc. How about you are doing and let me do what i need to do so fuck off.</p>
                <p className="f-w-b">My SKills</p>
                <p>Painter, Singer, Song Writing </p>
              </div>

              <div id="sample" className="tabcontent">
                <p className="f-w-b">Sample</p>
                <p>Sample 1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ArtistProfile;