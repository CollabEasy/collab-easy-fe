import { CollabRequestData, User } from "types/model";
import Image from "next/image";
import titleDesktopImg from "../../../public/images/Wondor.svg";
import titleMobileImg from "../../../public/images/logo.svg";
import { Alert, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { SearchCollab } from "types/model";
import CollabRequestTab from "../../components/collabRequestTab";
import NotAuthorised from "@/components/error/notAuthorised";
import { Select } from "antd";
import { Layout, Menu } from "antd";
import { routeToHref } from "config/routes";
import { Breadcrumb } from 'antd';
import PageLayout from "../../components/layout";
import {
  SearchOutlined,
  HomeOutlined,
  ProfileOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  EditOutlined,
  InstagramOutlined,
  PictureOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
  DollarCircleOutlined,
  SmileOutlined,
  FileTextOutlined,
  UserOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { resetUserLoggedIn } from "state/action";
import SamplePage from "@/components/samplePage";
import ScratchpadPage from "@/components/scratchpad";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "types/states";
import { Dispatch } from "redux";
import * as actions from "state/action";
import { useRouter } from "next/router";
import Loader from "@/components/loader";
import LoginModal from "@/components/modal/loginModal";
import NewUserModal from "@/components/modal/newUserModal";
import EditBasicInformation from "@/components/editBasicInformation";
import EditPreferences from "@/components/editPreferences";
import EditSocialProspectus from "@/components/editSocialProspectus";
import Navbar from "@/components/navbar";
import Rewards from "@/components/rewards";
import Link from "next/link";
import { useRoutesContext } from "components/routeContext";
import { Header } from "antd/lib/layout/layout";
import ManageProposals from "@/components/manageProposals";
import Profile from "@/components/profile";

const { Sider, Content } = Layout;

const mapStateToProps = (state: AppState) => {
  return {
    user: state.user.user,
    loginModalDetails: state.home.loginModalDetails,
    collab: state.collab,
    preferences: state.user.preferences,
    isLoggedIn: state.user.isLoggedIn,
    isFetchingSamples: state.sample.isFetchingSamples,
    isFetchingCollabs: state.collab.isFetchingCollabDetails,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchArtistSamples: (slug: string) =>
    dispatch(actions.fetchArtistSamples(slug)),

  getCollabRequestsAction: (data: SearchCollab) =>
    dispatch(actions.getCollabRequestsAction(data)),

  resetUserLoggedIn: () => dispatch(resetUserLoggedIn())
});

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const ArtistPortal = ({
  user,
  isLoggedIn,
  loginModalDetails,
  collab,
  preferences,
  isFetchingSamples,
  fetchArtistSamples,
  getCollabRequestsAction,
  resetUserLoggedIn,
}: Props) => {
  const emptyCollabDetails: CollabRequestData = {
    id: "",
    senderId: "",
    receiverId: "",
    collabDate: undefined,
    requestData: {
      message: "",
      collabTheme: "",
    },
    status: "",
    createdAt: undefined,
    updatedAt: undefined,
    proposalId: undefined,
  };

  const [collapsed, setCollapsed] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [collabRequestDetails, setCollabRequestDetails] =
    useState(emptyCollabDetails);
  const [hasPendingCollab, setHasPendingCollab] = useState(false);

  const { Option } = Select;

  const activeTabKey = useRef("1");
  const { toDiscover, toArtistProfile } = useRoutesContext();

  useEffect(() => {
    fetchArtistSamples(user.slug);
    getCollabRequestsAction({});
  }, [getCollabRequestsAction]);

  useEffect(() => {
    if (
      collab.collabDetails.sent.pending.length > 0 ||
      collab.collabDetails.sent.active.length > 0
    ) {
      setCollabRequestDetails(collab.collabDetails.sent.pending[0]);
      setHasPendingCollab(true);
    } else if (
      collab.collabDetails.received.pending.length > 0 ||
      collab.collabDetails.received.active.length > 0
    ) {
      setHasPendingCollab(true);
      setCollabRequestDetails(collab.collabDetails.received.active[0]);
    } else {
      setHasPendingCollab(false);
      setCollabRequestDetails(emptyCollabDetails);
    }

    if (window.innerWidth < 500) {
      setCollapsed(true);
    }

  }, [
    collab.collabDetails.received.pending,
    collab.collabDetails.sent.pending,
  ]);

  const router = useRouter();
  const { tab } = router.query;
  const [upForCollaboration, setUpForCollaboration] = useState(false);

  useEffect(() => {
    if (
      preferences["upForCollaboration"] === "true" ||
      preferences["upForCollaboration"] === true
    )
      setUpForCollaboration(true);
  }, [preferences, user]);

  useEffect(() => {
    activeTabKey.current = "1";
    if (tab === "basic-information") {
      activeTabKey.current = "1";
    } else if (tab === "preferences") {
      activeTabKey.current = "2";
    }
    // else if (tab === "samples") {
    //   activeTabKey.current = "3";
    // } 

    else if (tab === "social-prospectus") {
      activeTabKey.current = "4";
    } else if (tab === "scratchpad") {
      activeTabKey.current = "5";
    } else if (tab === "collab-request") {
      activeTabKey.current = "6";
    } else if (tab === "rewards") {
      activeTabKey.current = "7";
    } else if (tab === "proposals") {
      activeTabKey.current = "10";
    } else if (tab === "profile") {
      activeTabKey.current = "9";
    }
  }, [tab]);

  function handleWebNavClick(e: any) {
    activeTabKey.current = e.key;
    redirect(e.key);
  }

  function handleMobileNavClick(tab) {
    activeTabKey.current = tab;
    redirect(tab);
  }

  const redirect = (tabIndex: string) => {
    let action = "profile";
    let tab = "";
    // 0 is for discover and 8 is for logout.
    if (tabIndex === "0") {
      router.push("/");
      return;
    } else if (tabIndex === "8") {
      logoutUser();
      return;
    } else if (tabIndex === "1") {
      tab = "basic-information";
    } else if (tabIndex === "2") {
      tab = "preferences";
    }

    // else if (tabIndex === "3") {
    //   tab = "samples";
    // } 

    else if (tabIndex === "4") {
      tab = "social-prospectus";
    } else if (tabIndex === "5") {
      tab = "scratchpad";
    } else if (tabIndex === "6") {
      tab = "collab-request";
    } else if (tabIndex === "7") {
      tab = "rewards";
    } else if (tabIndex === "9") {
      tab = "profile";
    } else if (tabIndex === "10") {
      tab = "proposals";
    }
    router.push("/portal/" + tab);
  };

  const getActiveTab = () => {
    return activeTabKey.current;
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    resetUserLoggedIn();
    router.push("/");
  };

  const getBreadcrum = (page: string) => {
    return (
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href={toDiscover().href}>Home</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href={toArtistProfile(user.slug).as}>{user.first_name + " " + user.last_name}</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {page}
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  }

  if (user && Object.keys(user).length === 0 && collab.isFetchingCollabDetails)
    return <Loader />;

  const getMobileMenu = () => {
    return (
      <div className="scrollmenu">
        <div tabIndex={1} className="tab" onClick={() => { handleMobileNavClick("1") }}>
          <ProfileOutlined />
          <span className="f-12" style={{ display: "block" }}>Basic Information</span>
        </div>
        <div tabIndex={2} className="tab" onClick={() => { handleMobileNavClick("2") }}>
          <CheckCircleOutlined />
          <span className="f-12" style={{ display: "block" }}>Preferences</span>
        </div>
        {/* <div tabIndex={3} className="tab" onClick={() => { handleMobileNavClick("3") }}>
          <PictureOutlined />
          <span className="f-12" style={{ display: "block" }}>Samples</span>
        </div> */}
        <div tabIndex={4} className="tab" onClick={() => { handleMobileNavClick("4") }}>
          <InstagramOutlined />
          <span className="f-12" style={{ display: "block" }}>Social Prospectus</span>
        </div>
        <div tabIndex={5} className="tab" onClick={() => { handleMobileNavClick("5") }}>
          <EditOutlined />
          <span className="f-12" style={{ display: "block" }}>Scratchpad</span>
        </div>
        <div tabIndex={6} className="tab" onClick={() => { handleMobileNavClick("6") }}>
          <CalendarOutlined />
          <span className="f-12" style={{ display: "block" }}>Collab Requests</span>
        </div>
        <div tabIndex={10} className="tab" onClick={() => { handleMobileNavClick("10") }}>
          <FileTextOutlined />
          <span className="f-12" style={{ display: "block" }}>Proposals</span>
        </div>
        <div tabIndex={7} className="tab" onClick={() => { handleMobileNavClick("7") }}>
          <DollarCircleOutlined />
          <span className="f-12" style={{ display: "block" }}>Rewards</span>
        </div>
        <div className="tab" onClick={() => { handleMobileNavClick("8") }}>
          <LogoutOutlined style={{ color: "red" }} />
          <span className="f-12" style={{ display: "block" }} >Log Out</span>
        </div>
      </div>
    );
  }

  const getWebMenu = () => {
    return (
      <Menu
        theme="dark"
        mode={"horizontal"}
        selectedKeys={[activeTabKey.current]}
        onClick={handleWebNavClick}
      >
        <Menu.Item key="0">
          <HomeOutlined />
          <span>Home</span>
        </Menu.Item>
        <Menu.Item key="9">
          <UserOutlined />
          <span>Profile</span>
        </Menu.Item>
        <Menu.Item key="1">
          <ProfileOutlined />
          <span className="f-12 ">Basic Information</span>
        </Menu.Item>
        <Menu.Item key="2">
          <CheckCircleOutlined />
          <span className="f-12 ">Preferences</span>
        </Menu.Item>
        {/* <Menu.Item key="3">
          <PictureOutlined />
          <span className="f-12 ">Samples</span>
        </Menu.Item> */}
        <Menu.Item key="4">
          <InstagramOutlined />
          <span className="f-12">Social Prospectus</span>
        </Menu.Item>
        <Menu.Item key="5">
          <EditOutlined />
          <span className="f-12">Scratchpad</span>
        </Menu.Item>
        <Menu.Item key="6">
          <CalendarOutlined />
          <span className="f-12">Collab Requests</span>
        </Menu.Item>
        <Menu.Item key="10">
          <FileTextOutlined />
          <span className="f-12"> Proposals</span>
        </Menu.Item>
        <Menu.Item key="7">
          <DollarCircleOutlined />
          <span className="f-12"> Rewards</span>
        </Menu.Item>
        <Menu.Item key="8" danger>
          <LogoutOutlined />
          <span className="f-12">Log out</span>
        </Menu.Item>
      </Menu>
    );
  }

  return (
    <>
      <PageLayout
        title={
          "Artist Portal | Wondor"
        }
        name={"description"}
        content={
          "Portal for artists to manage their information at one place. Update your basic information, collab readiness etc here. Join Wondor now!"
        }
      >
        {loginModalDetails.openModal && !user.new_user && <LoginModal />}
        {showProfileModal && <NewUserModal />}
        {!isLoggedIn ? (
          <>
            <NotAuthorised
              error={"Please, login to access your account details."}
            />
          </>
        ) : (
          <div>
            <div id="mobile-portal-menu">
              {getMobileMenu()}
            </div>
            <div id="web-portal-menu" className="web-portal-fixed-menu">
              <Header>
                {/* <Link href={routeToHref(toDiscover())} passHref>
                  <div className="logo" style={{ cursor: "pointer" }}>
                    {!collapsed ? (
                      <Image src={titleDesktopImg} alt="Landing page" />
                    ) : (
                      <Image src={titleMobileImg} alt="Landing page" />
                    )}
                  </div>
                </Link> */}
                {getWebMenu()}
              </Header>
            </div>
            <Layout className="portal-layout">
              <>
                {getActiveTab() === "1" && (
                  <Content
                    style={{
                      padding: 24,
                      background: "#fff",
                      minHeight: 280,
                    }}
                  >
                    {window.innerWidth > 500 &&
                      <>
                        {getBreadcrum("Basic Information")}
                      </>
                    }
                    <div className="settings__basicProfileCard">
                      <EditBasicInformation />
                    </div>
                  </Content>
                )}

                {getActiveTab() === "2" && (
                  <Content
                    style={{
                      padding: 24,
                      background: "#fff",
                      minHeight: 280,
                    }}
                  >
                    {window.innerWidth > 500 &&
                      <>
                        {getBreadcrum("Preferences")}
                      </>
                    }
                    <div className="settings__basicProfileCard">
                      <EditPreferences />
                    </div>
                  </Content>
                )}

                {/* {getActiveTab() === "3" && (
                  <Content
                    style={{
                      padding: 24,
                      background: "#fff",
                      minHeight: 280,
                    }}
                  >
                    {window.innerWidth > 500 &&
                      <>
                        {getBreadcrum("Work Samples")}
                      </>
                    }
                    <div className="settings__basicProfileCard">

                      <p>
                        You can upload 6 of them now and flaunt your best work
                        to others!
                      </p>
                      <SamplePage
                        isSelf
                        user={user}
                        showLoader={isFetchingSamples}
                        editSamplesfromPortal={true}
                      />
                    </div>
                  </Content>
                )} */}

                {getActiveTab() === "4" && (
                  <Content
                    style={{
                      padding: 24,
                      background: "#fff",
                      minHeight: 280,
                    }}
                  >
                    {window.innerWidth > 500 &&
                      <>
                        {getBreadcrum("Social Prospectus")}
                      </>
                    }
                    <div className="settings__basicProfileCard">

                      <EditSocialProspectus />
                    </div>
                  </Content>
                )}

                {getActiveTab() === "5" && (
                  <Content
                    style={{
                      padding: 24,
                      background: "#fff",
                      minHeight: 280,
                    }}
                  >
                    {window.innerWidth > 500 &&
                      <>
                        {getBreadcrum("Scratchpad")}
                      </>
                    }
                    <div className="settings__basicProfileCard">
                      <ScratchpadPage />
                    </div>
                  </Content>
                )}

                {getActiveTab() === "6" && (
                  <Content
                    style={{
                      padding: 24,
                      background: "#fff",
                      minHeight: 280,
                    }}
                  >
                    {window.innerWidth > 500 &&
                      <>
                        {getBreadcrum("Collab Requests")}
                      </>
                    }
                    <div className="settings__basicProfileCard">
                      <CollabRequestTab
                        otherUser={user.artist_id}
                        collabRequests={collab.collabDetails}
                        onClickCollabRequest={(
                          collabDetails: CollabRequestData
                        ) => {
                          setCollabRequestDetails(collabDetails);
                        }}
                      />
                    </div>
                  </Content>
                )}

                {getActiveTab() === "7" && (
                  <Content
                    style={{
                      padding: 24,
                      background: "#fff",
                      minHeight: 280,
                    }}
                  >
                    {window.innerWidth > 500 &&
                      <>
                        {getBreadcrum("Rewards")}
                      </>
                    }
                    <div className="settings__basicProfileCard">
                      <Rewards />
                    </div>
                  </Content>
                )}

                {getActiveTab() === "9" && (
                  <Content
                    style={{
                      padding: 24,
                      background: "#fff",
                      minHeight: 280,
                    }}
                  >
                    {window.innerWidth > 500 &&
                      <>
                        {getBreadcrum("Profile")}
                      </>
                    }
                    <div className="settings__basicProfileCard">
                      <Alert
                        showIcon={false}
                        banner
                        style={{ textAlign: "center" }}
                        message={
                          <span>
                            This is how your profile appears to artists looking for collaboration; 
                            Enhance your profile visibility by keeping details up to date. <b>
                              A complete profiles makes a positive impression.
                            </b>
                          </span>
                        }
                      />
                      <Profile
                        isSelf={false}
                        upForCollab={upForCollaboration}
                        isLoggedIn={true}
                        loggedInUserId={user.artist_id}
                        user={user}
                        isProfileComplete={user.profile_complete}
                      />
                    </div>
                  </Content>
                )}
                {getActiveTab() === "10" && (
                  <Content
                    style={{
                      padding: 24,
                      background: "#fff",
                      minHeight: 280,
                    }}
                  >
                    {window.innerWidth > 500 &&
                      <>
                        {getBreadcrum("Proposals")}
                      </>
                    }
                    <div className="settings__basicProfileCard">
                      <ManageProposals />
                    </div>
                  </Content>
                )}
              </>
            </Layout>
          </div>
        )}
      </PageLayout>
    </>
  );
};

export default connector(ArtistPortal);