import Title from "@/components/title";
import Image from "next/image";
import avatar from "../../../public/images/avatar.png";
import React, { useEffect, useState } from "react";
import { Pagination, Space } from "antd";
import { Button, Card, Avatar } from "antd";
import Link from "next/link";
import { routeToHref } from "config/routes";
import { useRoutesContext } from "components/routeContext";
import CollabRequest from "components/collabRequestSend";
import CollabRequestTab from "components/collabRequestTab";
import { AppState } from "state";
import { connect, ConnectedProps, useStore } from "react-redux";
import { route } from "next/dist/next-server/server/router";
import router from "next/router";
import { Dispatch } from "redux";
import { fetchArtistSkills } from "state/action";

// https://ant.design/components/card/
const { Meta } = Card;

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});
  
const connector = connect(mapStateToProps, mapDispatchToProps);
  
type Props = {
} & ConnectedProps<typeof connector>;

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
  document.getElementById(`${actionName}_1`).classList.add("active");
};

const ArtistProfile = ({ user } : Props) => {
  const { toEditProfile } = useRoutesContext();
  const [isSelf, setIsSelf] = useState(false);

  useEffect(() => {
    const { id: slug } = router.query;
    if (user.slug === slug) setIsSelf(true);
  }, [user.slug])

  if (Object.keys(user).length === 0)
    return <p className="artist-profile-page-empty">Redirecting</p>;
  return (
    <>
      <Title title="Artist Profile" />
      <div className="artist-profile-page container">
        {!isSelf && (
          <div className="absolute-div">
            <div className="col-xl-5 col-md-5 col-sm-5">
              <CollabRequest />
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-xl-12 col-md-12 col-sm-12">
            <div className="artistID_userContainer">
              <div className="artistID_profilePicContainer">
                <Image
                  src={user.profile_pic_url ? user.profile_pic_url : avatar}
                  width="150px"
                  height="150px"
                  alt="Landing page"
                  className="artistID_profilePicContainer"
                />
              </div>

              <div className="col-xl-12 col-md-12 col-sm-12">
                <div className="artistID_artistDetailContainer">
                  <span className="f-20">
                    {user.first_name + " " + user.last_name}
                  </span>
                  <span className="f-12">{user.skills && user.skills.length > 0 ? user.skills[0] : ""}</span>
                </div>
              </div>
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
                  <Link href={routeToHref(toEditProfile())} passHref>
                    <a>Edit</a>
                  </Link>
                </>
              </span>
            </div>
          </div>
          <div className="col-xl-12 col-md-12 col-sm-12 _tab-p">
            <div className="col-xl-4 col-md-4 col-sm-4">
              <div className="tab">
                <button
                  id="about_1"
                  className="tablinks active about"
                  onClick={() => toggleTab("about")}
                >
                  About
                </button>
                <button
                  id="sample_1"
                  className="tablinks sample"
                  onClick={() => toggleTab("sample")}
                >
                  My sample work
                </button>
                <button
                  id="collab_1"
                  className="tablinks collab"
                  onClick={() => toggleTab("collab")}
                >
                  Collab Requests
                </button>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 col-sm-4">
              <div
                id="about"
                className="tabcontent"
                style={{ display: "block" }}
              >
                <b className="artistId__descriptionText">Description</b>
                <form className="flex flex-col">
                  <p className="artistID_bioContainer">{user.bio}</p>
                </form>
                <p className="f-w-b">My Skills</p>
                <p>{user.skills ? user.skills.toString() : ""} </p>
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
  );
};

export default connector(ArtistProfile);
