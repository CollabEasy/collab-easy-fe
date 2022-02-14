import Image from "next/image";
import avatar from "../public/images/avatar.png";
import React, { useEffect, useState } from "react";
import { Card, Avatar, Pagination, Space, Tabs } from "antd";
import CollabRequestTab from "./collabRequestTab";
import SamplePage from "./samplePage";
import { AppState } from "state";
import { connect, ConnectedProps, useStore } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { fetchArtistSkills } from "state/action";
import { User } from "types/model";
import Title from "./title";
import landingDesktopImg from '../public/images/landing-desktop.png';

const { Meta } = Card;
const { TabPane } = Tabs;

const mapStateToProps = (state: AppState) => { };

const mapDispatchToProps = (dispatch: Dispatch) => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  isSelf: boolean;
  user: User;
} & ConnectedProps<typeof connector>;

const Profile = ({ user, isSelf }: Props) => {
  const router = useRouter();
  const [userSamples, setUserSamples] = useState([]);
  const [showCollabModal, setShowCollabModal] = useState(false);

  useEffect(() => {
    // TODO : get artist samples
  })

  const getUserSkills = (all: boolean) => {
    var skills = "";
    if (user.skills) {
      user.skills.forEach((skill: string, index: number) => {
        if (!all && index == 2) return skills;
        if (index > 0) skills = skills + ", ";
        skills = skills + skill;
      });
    }
    return skills;
  };

  return (
    <>
      <Title title={user.first_name + " " + user.last_name} />
      <div className="artistProfile__profileContainer" style={{ marginTop: "10%", marginBottom: "5%" }}>
        <div className="container">
          <div className="artistProfile__profileCoverContainer">
            <div className="graph"></div>
          </div>
          <div className="artistProfile__profileDpContainer">
            <Image
              src={user.profile_pic_url ? user.profile_pic_url : avatar}
              width="150px"
              height="150px"
              alt="Landing page"
            />
          </div>
        </div>
        <div className="artistProfile__artistDetailContainer">
          <h2 className="f-20">{user.first_name + " " + user.last_name}</h2>
          <h3 className="f-12">{getUserSkills(false)}</h3>
          <button
            className="artistProfile__editCollabButton"
            onClick={() => {
              if (isSelf) {
                router.push("/artist/settings/edit");
              } else {
                setShowCollabModal(true);
              }
            }}
          >
            {isSelf ? "Edit Profile" : "Collaborate"}
          </button>
        </div>
        <div className="artistProfile__tabsContainer">
          <Tabs defaultActiveKey="1" type="card" size={"large"} centered>
            <TabPane tab="About" key="1">
              <div className="artistProfile__tabContainer">
                <b className="f-16 mb4 artistId__descriptionText">
                  Description
                </b>
                <p className="mt4 artistProfile__bioContainer">{user.bio}</p>
                <p className="f-16 mb4 f-w-b">My Skills</p>
                <p className="mt4">{getUserSkills(true)} </p>
              </div>
            </TabPane>
            <TabPane tab="Samples" key="2">
              <div className="artistProfile__tabContainer">
                <SamplePage user={user} samples={userSamples}/>
              </div>
            </TabPane>
            {isSelf && (
              <TabPane tab="Collab Requests" key="3">
                <div className="artistProfile__tabContainer">
                  <CollabRequestTab />
                </div>
              </TabPane>
            )}
            <TabPane tab="Social Prospectus" key="4">
              <div className="artistProfile__tabContainer"></div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default connector(Profile);
