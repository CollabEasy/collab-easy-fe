import Image from "next/image";
import avatar from "../public/images/avatar.png";
import React, { useEffect, useState } from "react";
import { Card, Avatar, Pagination, Space, Tabs } from "antd";
import CollabRequestTab from "./collabRequestTab";
import SamplePage from "./samplePage";
import SocialProspectusPage from "./socialProspectusPage";
import { AppState } from "state";
import { connect, ConnectedProps, useStore } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { CollabRequestData, SearchCollab, User } from "types/model";
import Title from "./title";
import * as action from "../state/action";
import Loader from "./loader";
import { getCurrentUserId } from "helpers/helper";
import SendCollabRequestModal from "./sendCollabRequestModal";
import CollabRequest from "./collabRequestSend";

const { Meta } = Card;
const { TabPane } = Tabs;

const mapStateToProps = (state: AppState) => {
  const collab = state.collab;
  const isFetchingCollabs = state.collab.isFetchingCollabDetails;
  const userSamples = state.sample.samples;
  const isFetchingSamples = state.sample.isFetchingSamples;
  const showCollabModal = state.collab.showCollabModal;
  return { showCollabModal, userSamples, collab, isFetchingSamples };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchArtistSamples: (slug: string) =>
    dispatch(action.fetchArtistSamples(slug)),
    getCollabRequestsAction: (data: SearchCollab) => dispatch(action.getCollabRequestsAction(data)),
   setShowCollabModalState: (show: boolean) => dispatch(action.setShowCollabModalState(show)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  isSelf: boolean;
  user: User;
} & ConnectedProps<typeof connector>;

const Profile = ({
  user,
  isSelf,
  userSamples,
  collab,
  showCollabModal,
  isFetchingSamples,
  setShowCollabModalState,
  fetchArtistSamples,
  getCollabRequestsAction,
}: Props) => {
  const router = useRouter();
  const emptyCollabDetails: CollabRequestData = {
    id: "",
    senderId: "",
    receiverId: "",
    collabDate: undefined,
    requestData: {
      message: "",
      collabTheme: ""
    },
    status: "",
    createdAt: undefined,
    updatedAt: undefined
  };
  const [userSocialProspectus, setUserSocialProspectus] = useState([]);
  const [collabRequestDetails, setCollabRequestDetails] = useState(emptyCollabDetails);
  const [hasPendingCollab, setHasPendingCollab] = useState(false);

  useEffect(() => {
    fetchArtistSamples(user.slug);
    if (isSelf) {
      getCollabRequestsAction({
      })
    } else {
      getCollabRequestsAction({
        otherUserId: user.artist_id,
      });
    }
  }, [fetchArtistSamples, getCollabRequestsAction, isSelf, user.slug, user.artist_id]);

  useEffect(() => {
    if (collab.collabDetails.sent.pending.length > 0 || collab.collabDetails.sent.active.length > 0) {
      setCollabRequestDetails(collab.collabDetails.sent.pending[0]);
      setHasPendingCollab(true);
    } else if (collab.collabDetails.received.pending.length > 0 || collab.collabDetails.received.pending.length > 0) {
      setHasPendingCollab(true);
      setCollabRequestDetails(collab.collabDetails.received.active[0]);
    } else {
      setHasPendingCollab(false);
      setCollabRequestDetails(emptyCollabDetails);
    }
  }, [collab.collabDetails.received.pending, collab.collabDetails.sent.pending])

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

  // show loader till the collab requests of other user is fetched (for Collaborate button status)
  if (!isSelf && collab.isFetchingCollabDetails) {
    return <Loader />
  }

  return (
    <>
      <Title title={user.first_name + " " + user.last_name} />
      <div
        className="artistProfile__profileContainer"
        style={{ marginTop: "10%", marginBottom: "5%" }}
      >
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
                setShowCollabModalState(true);
              }
            }}
          >
            {isSelf ? "Edit Profile" : (hasPendingCollab ? "Show Pending Request" : "Collaborate")}
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
                <SamplePage isSelf={isSelf} user={user} samples={userSamples} showLoader={isFetchingSamples} />
              </div>
            </TabPane>
            {/* {isSelf && ( */}
              <TabPane tab="Collab Requests" key="3">
                <div className="artistProfile__tabContainer">
                  <CollabRequestTab 
                    otherUser={user.artist_id}
                    collabRequests={collab.collabDetails}
                    onClickCollabRequest={(collabDetails: CollabRequestData) => {
                      setCollabRequestDetails(collabDetails);
                      setShowCollabModalState(true);
                    }}
                  />
                </div>
              </TabPane>
            {/* )} */}
            <TabPane tab="Social Prospectus" key="4">
              <div className="artistProfile__tabContainer">
                <SocialProspectusPage
                  isSelf={isSelf}
                  user={user}
                  socialProspectus={userSocialProspectus}
                />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
      {showCollabModal && (
        <SendCollabRequestModal 
          otherUser={user.artist_id} 
          onCancel={() => {
            setShowCollabModalState(false);
          }}
          collabDetails={collabRequestDetails} 
        />
      )}
    </>
  );
};

export default connector(Profile);
