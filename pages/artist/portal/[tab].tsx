import { CollabRequestData, User } from "types/model";
import Image from "next/image";
import titleDesktopImg from "../../../public/images/Wondor.svg";
import titleMobileImg from "../../../public/images/logo.svg";
import { Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { SearchCollab } from "types/model";
import CollabRequestTab from "../../../components/collabRequestTab";
import NotAuthorised from "@/components/error/notAuthorised";
import { Select } from "antd";
import { Layout, Menu } from "antd";
import { routeToHref } from "config/routes";
import { Breadcrumb } from 'antd';
import PageLayout from "../../../components/layout";
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

const { Sider, Content } = Layout;

const mapStateToProps = (state: AppState) => {
  return {
    user: state.user.user,
    loginModalDetails: state.home.loginModalDetails,
    collab: state.collab,
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

const EditProfile = ({
  user,
  isLoggedIn,
  loginModalDetails,
  collab,
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

  useEffect(() => {
    activeTabKey.current = "1";
    if (tab === "basic-information") {
      activeTabKey.current = "1";
    } else if (tab === "preferences") {
      activeTabKey.current = "2";
    } else if (tab === "samples") {
      activeTabKey.current = "3";
    } else if (tab === "social-prospectus") {
      activeTabKey.current = "4";
    } else if (tab === "scratchpad") {
      activeTabKey.current = "5";
    } else if (tab === "collab-request") {
      activeTabKey.current = "6";
    } else if (tab === "rewards") {
      activeTabKey.current = "7";
    }
  }, [tab]);

  // if (
  //   typeof window !== "undefined"
  // ) {
  //   router.push("/artist/settings?tab=basic-information");
  // }

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
    } else if (tabIndex === "3") {
      tab = "samples";
    } else if (tabIndex === "4") {
      tab = "social-prospectus";
    } else if (tabIndex === "5") {
      tab = "scratchpad";
    } else if (tabIndex === "6") {
      tab = "collab-request";
    } else if (tabIndex === "7") {
      tab = "rewards";
    } else if (tabIndex === "9") {
      router.push("/artist/" + user.slug);
      return;
    }
    router.push("/artist/portal/" + tab);
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
        <div className="tab" onClick={() => { handleMobileNavClick("1") }}>
          {activeTabKey.current === "1" ? (
            <>
              <ProfileOutlined style={{ color: "black" }} />
              <span className="f-12" style={{ display: "block", color: "black" }}>Basic Information</span>
            </>
          ) : (
            <>
              <ProfileOutlined style={{ color: "grey" }} />
              <span className="f-12" style={{ display: "block", color: "grey" }}>Basic Information</span>
            </>
          )}
        </div>
        <div className="tab" onClick={() => { handleMobileNavClick("2") }}>
          {activeTabKey.current === "2" ? (
            <>
              <CheckCircleOutlined style={{ color: "black" }} />
              <span className="f-12" style={{ display: "block", color: "black" }}>Preferences</span>
            </>
          ) : (
            <>
              <CheckCircleOutlined style={{ color: "grey" }} />
              <span className="f-12" style={{ display: "block", color: "grey" }}>Preferences</span>
            </>
          )}
        </div>
        <div className="tab" onClick={() => { handleMobileNavClick("3") }}>
          {activeTabKey.current === "3" ? (
            <>
              <PictureOutlined style={{ color: "black" }} />
              <span className="f-12" style={{ display: "block", color: "black" }}>Samples</span>
            </>
          ) : (
            <>
              <PictureOutlined style={{ color: "grey" }} />
              <span className="f-12" style={{ display: "block", color: "grey" }}>Samples</span>
            </>
          )}
        </div>
        <div className="tab" onClick={() => { handleMobileNavClick("4") }}>
          {activeTabKey.current === "4" ? (
            <>
              <InstagramOutlined style={{ color: "black" }} />
              <span className="f-12" style={{ display: "block", color: "black" }}>Social Prospectus</span>
            </>
          ) : (
            <>
              <InstagramOutlined style={{ color: "grey" }} />
              <span className="f-12" style={{ display: "block", color: "grey" }}>Social Prospectus</span>
            </>
          )}
        </div>
        <div className="tab" onClick={() => { handleMobileNavClick("5") }}>
          {activeTabKey.current === "5" ? (
            <>
              <EditOutlined style={{ color: "black" }} />
              <span className="f-12" style={{ display: "block", color: "black" }}>Scratchpad</span>
            </>
          ) : (
            <>
              <EditOutlined style={{ color: "grey" }} />
              <span className="f-12" style={{ display: "block", color: "grey" }}>Scratchpad</span>
            </>
          )}
        </div>
        <div className="tab" onClick={() => { handleMobileNavClick("6") }}>
          {activeTabKey.current === "6" ? (
            <>
              <CalendarOutlined style={{ color: "black" }} />
              <span className="f-12" style={{ display: "block", color: "black" }}>Collab Requests</span>
            </>
          ) : (
            <>
              <CalendarOutlined style={{ color: "grey" }} />
              <span className="f-12" style={{ display: "block", color: "grey" }}>Collab Requests</span>
            </>
          )}
        </div>
        <div className="tab" onClick={() => { handleMobileNavClick("7") }}>
          {activeTabKey.current === "7" ? (
            <>
              <DollarCircleOutlined style={{ color: "black" }} />
              <span className="f-12" style={{ display: "block", color: "black" }}>Rewards</span>
            </>
          ) : (
            <>
              <DollarCircleOutlined style={{ color: "grey" }} />
              <span className="f-12" style={{ display: "block", color: "grey" }}>Rewards</span>
            </>
          )}
        </div>
        <div className="tab" onClick={() => { handleMobileNavClick("8") }}>
          <LogoutOutlined style={{ color: "red" }} />
          <span className="f-12" style={{ display: "block" }}>Log Out</span>
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
        <Menu.Item key="3">
          <PictureOutlined />
          <span className="f-12 ">Samples</span>
        </Menu.Item>
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

  const getPageMetadata = () => {
    
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

                  {getActiveTab() === "3" && (
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
                  )}

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
                </>
              </Layout>
          </div>
        )}
      </PageLayout>
    </>
  );
};

export default connector(EditProfile);