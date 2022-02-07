import Image from "next/image";
import avatar from "../public/images/avatar.png";
import React, { useEffect, useState } from "react";
import { Pagination, Space, Tabs } from "antd";
import { Button, Card, Avatar } from "antd";
import Link from "next/link";
import { routeToHref } from "config/routes";
import { useRoutesContext } from "components/routeContext";
import CollabRequest from "components/collabRequestSend";
import CollabRequestTab from "components/collabRequestTab";
import { AppState } from "state";
import { connect, ConnectedProps, useStore } from "react-redux";
import { route } from "next/dist/next-server/server/router";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { fetchArtistSkills } from "state/action";
import { User } from "types/model";

// https://ant.design/components/card/
const { Meta } = Card;
const { TabPane } = Tabs;

const mapStateToProps = (state: AppState) => {
};

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
    isSelf: boolean,
    user: User
} & ConnectedProps<typeof connector>;

const Profile = ({ user, isSelf }: Props) => {
  const router = useRouter();
  const [showCollabModal, setShowCollabModal] = useState(false);

  const getUserSkills = (all: boolean) => {
    var skills = "";
    if (user.skills) {
      user.skills.forEach((skill: string, index: number) => {
        if (!all && index == 2) return skills
        if (index > 0) skills = skills + ", "
        skills = skills + skill;
      })
    }
    return skills;
  }

  return (
    <>
      <div className="artistProfile__profileContainer">
        <div className="artistProfile__userContainer">
          <div className="artistProfile__profilePicContainer">
            <Image
              src={user.profile_pic_url ? user.profile_pic_url : avatar}
              width="150px"
              height="150px"
              alt="Landing page"
              className="artistProfile__profilePicContainer"
            />
          </div>
          <div className="artistProfile__artistDetailContainer">
            <h2 className="f-20">{user.first_name + " " + user.last_name}</h2>
            <h3 className="f-12">
              {getUserSkills(false)}
            </h3>
          </div>
          <Button
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
          </Button>
        </div>

        <Tabs className="artistProfile__tabs" defaultActiveKey="1" type="card" size={"large"}>
          <TabPane className="artistProfile__tabPane" tab="About" key="1">
            <div className="artistProfile__tabContainer">
              <b className="f-16 mb4 artistId__descriptionText">Description</b>
              <p className="mt4 artistProfile__bioContainer">{user.bio}</p>
              <p className="f-16 mb4 f-w-b">My Skills</p>
              <p className="mt4">{getUserSkills(true)} </p>
            </div>
          </TabPane>
          <TabPane className="artistProfile__tabPane" tab="Samples" key="2">
            <div className="artistProfile__tabContainer"></div>
          </TabPane>
          {isSelf && (
            <TabPane className="artistProfile__tabPane" tab="Collab Requests" key="3">
              <div className="artistProfile__tabContainer">
                <CollabRequestTab />
              </div>
            </TabPane>
          )}
          <TabPane className="artistProfile__tabPane" tab="Social Prospectus" key="2">
            <div className="artistProfile__tabContainer"></div>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default connector(Profile);
