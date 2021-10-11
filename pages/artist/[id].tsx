import Title from '../../components/title';
import Image from 'next/image';
import avatar from '../../public/images/avatar.png'
import React from 'react';
import { Card } from 'antd';
import Link from "next/link";
import { routeToHref } from "config/routes";
import { useRoutesContext } from "components/routeContext";
import CollabRequest from 'components/collabRequestSend';
import CollabRequestTab from 'components/collabRequestTab';
import { AppState } from 'state';
import { connect } from 'react-redux';

// https://ant.design/components/card/
const { Meta } = Card;

/**
 * @description On Click tab active the window
 * @param actionName contain the string from which button click
 */
const toggleTab = (actionName) => {
  let i;
  let tabContent;
  let tabLinks;
  tabContent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  tabLinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }
  document.getElementById(actionName).style.display = "block";
  document.getElementById(`${actionName}_1`).classList.add('active');
};

const ArtistProfile = ({ userLoginData }) => {
  console.log(userLoginData, 'login')
  const { toEditProfile } = useRoutesContext();
  return (
    <>
      <Title title="Artist Profile" />
      <div className="artist-profile-page container">
        <div className="absolute-div">
          <div className="col-xl-5 col-md-5 col-sm-5">
            <CollabRequest />
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12 col-md-12 col-sm-12">
            <div className="avtr">
              <Image src={userLoginData.profile_pic_url} alt="Landing page" className="rounded mx-auto d-block" width='100px' height='100px' />
            </div>
          </div>
          <div className="col-xl-12 col-md-12 col-sm-12">
            <div className="_artist">
              <span className="f-20">Rahul Gupta
              </span>
              <span className="f-12">painter, Singer</span>
            </div>
          </div>
          <div className="col-xl-12 col-md-12 col-sm-12">
            <div className="_connect">
              <span className="">
                <a>Follow</a>
              </span>
              <span className="">
                <a>Message</a>
              </span>
              <span>
                <>
                  <Link href={routeToHref(toEditProfile(userLoginData.artist_id, 'setting'))} passHref>
                    <a>Edit</a>
                  </Link>
                </>
              </span>
            </div>
          </div>
          <div className="col-xl-12 col-md-12 col-sm-12 _tab-p">
            <div className="col-xl-4 col-md-4 col-sm-4">
              <div className="tab">
                <button id="about_1" className="tablinks active about" onClick={() => toggleTab('about')}>About</button>
                <button id="sample_1" className="tablinks sample" onClick={() => toggleTab('sample')}>My sample work</button>
                <button id="collab_1" className="tablinks collab" onClick={() => toggleTab('collab')}>Collab Requests</button>
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
              <CollabRequestTab />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state: AppState) => ({
  userLoginData: state.user.userLoginData
})

export default connect(mapStateToProps, null)(ArtistProfile);