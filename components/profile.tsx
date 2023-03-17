import Image from "next/image";
import Link from "next/link";
import avatar from "../public/images/avatar.png";
import React, { useEffect, useState } from "react";
import { Card, Button, Avatar, Pagination, Space, Tabs } from "antd";
import CollabRequestTab from "./collabRequestTab";
import SamplePage from "./samplePage";
import SocialProspectusPage from "./socialProspectus";
import { AppState } from "state";
import { connect, ConnectedProps, useStore } from "react-redux";
import router, { useRouter } from "next/router";
import { Dispatch } from "redux";
import { CollabRequestData, SearchCollab, User } from "types/model";
import Title from "./title";
import * as action from "../state/action";
import Loader from "./loader";
import { getCurrentUserId } from "helpers/helper";
import SendCollabRequestModal from "./modal/sendCollabRequestModal";
import CollabRequest from "./collabRequestSend";
import { routeToHref } from "config/routes";
import {
  StarFilled,
  CloseOutlined,
  CheckOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { useRoutesContext } from "components/routeContext";
import avatarImage from '../public/images/avatar.png';

const { Meta } = Card;
const { TabPane } = Tabs;

const mapStateToProps = (state: AppState) => {
  const collab = state.collab;
  // const isFetchingCollabs = state.collab.isFetchingCollabDetails;
  const userSamples = state.sample.samples;
  // const isFetchingSamples = state.sample.isFetchingSamples;
  const showCollabModal = state.collab.showCollabModal;
  return { showCollabModal, userSamples, collab, /*isFetchingSamples*/ };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // fetchArtistSamples: (slug: string) =>
  //   dispatch(action.fetchArtistSamples(slug)),
  // getCollabRequestsAction: (data: SearchCollab) => dispatch(action.getCollabRequestsAction(data)),
  setShowCollabModalState: (show: boolean) => dispatch(action.setShowCollabModalState(show)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {
  isSelf: boolean;
  upForCollab: boolean;
  user: User;
} & ConnectedProps<typeof connector>;

const Profile = ({
  user,
  isSelf,
  upForCollab,
  userSamples,
  collab,
  showCollabModal,
  /*isFetchingSamples,*/
  setShowCollabModalState,
  /*fetchArtistSamples,*/
  /*getCollabRequestsAction,*/
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

  const { toEditProfile } = useRoutesContext();

  useEffect(() => {
    /* fetchArtistSamples(user.slug);
    if (isSelf) {
      getCollabRequestsAction({
      })
    } else {
      getCollabRequestsAction({
        otherUserId: user.artist_id,
      });
    } */
  }, [/*fetchArtistSamples, getCollabRequestsAction,*/ isSelf, user.slug, user.artist_id]);

  useEffect(() => {
    if (collab.collabDetails.sent.pending.length > 0 || collab.collabDetails.sent.active.length > 0) {
      setCollabRequestDetails(collab.collabDetails.sent.pending[0]);
      setHasPendingCollab(true);
    } else if (collab.collabDetails.received.pending.length > 0 || collab.collabDetails.received.active.length > 0) {
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
  // if (!isSelf && collab.isFetchingCollabDetails) {
  //   return <Loader />
  // }

  const ShowIncompleteProfileBanner = (user: User) => {
    if (!user.bio || user.bio.length === 0) {
      return true;
    } else if (!user.skills || user.skills.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  // data from prismic.io returns the image src as an absolute url, so no need to set up the full url on loader....
  const prismicLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <>
      <Title title={user.first_name + " " + user.last_name} />
      <div
        className="artistProfile__profileContainer"
      >

        {isSelf &&
          <>
            {ShowIncompleteProfileBanner(user) ?
              (
                <div style={{ backgroundColor: "#FBF0C4", paddingBottom: '.5px', paddingTop: '1%', textAlign: 'center' }}>
                  <p><b>{user.first_name}</b>, looks like your profile is not complete. For maximum reach, please complete it
                    <Link href={routeToHref(toEditProfile("profile", "profile"))} passHref> here.</Link></p></div>
              ) : (
                <div style={{ backgroundColor: "#E2F0CB", paddingBottom: '.5px', paddingTop: '1%', textAlign: 'center' }}>
                  <p><b>{user.first_name}</b> well done, your profile is complete!</p></div>
              )

            } </>}

        <div className="container">
          <div className="artistProfile__profileCoverContainer">
            <div className="graph"></div>
          </div>
          <div className="artistProfile__profileDpContainer">
            <Image
              loader={prismicLoader}
              src={user?.profile_pic_url}
              alt="profile picture"
              height={150}
              width={150}
              priority
            />
          </div>
        </div>
        <div className="artistProfile__artistDetailContainer common-text-style">
          <h2 className="f-20 common-h2-style">{user.first_name + " " + user.last_name}</h2>
          <h3 className="f-15 common-h3-style">{getUserSkills(false)}</h3>
          {isSelf ? (<Button
            type="primary"
            className="common-medium-btn"
            style={{ height: 'auto', marginTop: '10px' }}
            onClick={() => {
              router.push("/artist/settings/edit");
            }}
          > Edit profile</Button>

          ) : (
            <>
              {hasPendingCollab ? (
                <>
                  <Button
                    type="primary"
                    className="common-medium-btn"
                    style={{ height: 'auto', marginTop: '10px' }}
                  // onClick={() => {
                  //   setShowCollabModalState(true);
                  //   setCollabRequestDetails(collab.collabDetails.sent.pending[0] ?? collab.collabDetails.sent.active[0]);
                  // }}
                  >
                    <Link
                      href={routeToHref(toEditProfile("profile", "collab-request"))}
                      passHref
                    >Show pending requests</Link>

                  </Button>
                  <span className="common-text-style"><StarFilled style={{ color: 'orange', margin: '5px' }} />You have a pending collab request with {user.first_name}. </span>
                </>
              ) : (
                <>
                  <Button
                    type="primary"
                    className="common-medium-btn"
                    style={{ height: 'auto', marginTop: '10px' }}
                    disabled={!upForCollab}
                    onClick={() => {
                      setShowCollabModalState(true);
                    }}
                  >  Let&apos;s collaborate</Button>
                  {!upForCollab ? (
                    <span className="common-text-style"><CloseOutlined style={{ color: 'red', marginTop: '20px' }} />{user.first_name} is not available to collab! </span>
                  ) : (
                    <span className="common-text-style"><CheckOutlined style={{ color: 'green', marginTop: '20px' }} />{user.first_name} is available to collab! </span>
                  )}
                </>
              )}

            </>

          )}
        </div>
        <div className="artistProfile__tabsContainer common-text-style">
          <Tabs defaultActiveKey="1" type="card" size={"large"} centered>
            <TabPane tab="About" key="1">
              <div className="artistProfile__tabContainer">
                <b className="f-16 mb4 common-text-style">
                  Bio
                </b>
                <p className="mt4 artistProfile__bioContainer common-p-style">{user.bio}</p>
                <b className="f-16 mb4 f-w-b common-text-style">Skills</b>
                <p className="mt4 common-p-style">{getUserSkills(true)} </p>
              </div>
            </TabPane>
            {/* <TabPane tab="Samples" key="2">
              <div className="artistProfile__tabContainer">
                {userSamples.length == 0 ? (
                  <div
                    className="samplePage__container"
                  >
                    <div className="samplePage__nosample">
                      {!isSelf ? (
                        <p className="common-p-style">Oops, looks like {user.first_name} has not uploaded any samples.</p>
                      ) : (
                        <>
                          <p className="common-p-style">You have not uploaded any samples. You can upload 6 of them now and flaunt your best work to others!</p>
                          <Button className="common-medium-btn" type="primary">
                            <Link
                              href={routeToHref(toEditProfile("profile", "samples"))}
                              passHref
                            >Upload Samples</Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>) : (
                  <>
                    <SamplePage isSelf={isSelf} user={user} samples={userSamples} showLoader={isFetchingSamples} />
                  </>
                )}
              </div>
            </TabPane> */}
            {/* <TabPane tab="Collab Requests" key="3">
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
            </TabPane> */}
            <TabPane tab="Social prospectus" key="4">
              <div className="artistProfile__tabContainer">
                <SocialProspectusPage
                  isSelf={isSelf}
                  user={user}
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
