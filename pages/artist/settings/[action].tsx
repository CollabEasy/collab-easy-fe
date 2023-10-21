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
  UserOutlined,
  DollarOutlined,
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
  const { action, tab } = router.query;

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

  if (
    typeof window !== "undefined" &&
    action !== "profile" &&
    action !== "account"
  ) {
    router.push("/artist/settings/profile?tab=basic-information");
  }

  function handleClick(e: any) {
    activeTabKey.current = e.key;
    redirect(e.key);
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
      router.push("/artist/profile/" + user.slug);
      return;
    }
    router.push("/artist/settings/" + action + "?tab=" + tab);
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

  const getMenu = (mobile) => {
    return (
      <Menu
        theme="dark"
        mode={mobile ? "horizontal" : "inline"}
        selectedKeys={[activeTabKey.current]}
        onClick={handleClick}
        style={{ justifyContent: "flex-end" }}
      >
        <Menu.Item key="0">
          {!mobile && <HomeOutlined />}
          <span>Home</span>
        </Menu.Item>
        <Menu.Item key="9">
          {!mobile && <UserOutlined />}
          <span>Profile</span>
        </Menu.Item>
        <Menu.Item key="1">
          {!mobile && <ProfileOutlined />}
          <span>Basic Information</span>
        </Menu.Item>
        <Menu.Item key="2">
          {!mobile && <CheckCircleOutlined />}
          <span>Preferences</span>
        </Menu.Item>
        <Menu.Item key="3">
          {!mobile && <PictureOutlined />}
          <span>Samples</span>
        </Menu.Item>
        <Menu.Item key="4">
          {!mobile && <InstagramOutlined />}
          <span>Social Prospectus</span>
        </Menu.Item>
        <Menu.Item key="5">
          {!mobile && <EditOutlined />}
          <span>Scratchpad</span>
        </Menu.Item>
        <Menu.Item key="6">
          {!mobile && <CalendarOutlined />}
          <span>Collab Requests</span>
        </Menu.Item>
        <Menu.Item key="7">
          {!mobile && <DollarOutlined />}
          <span>Rewards</span>
        </Menu.Item>
        <Menu.Item key="8" danger>
          {!mobile && <LogoutOutlined />}
          <span>Log out</span>
        </Menu.Item>
      </Menu>
    );
  }

  return (
    <>
      {loginModalDetails.openModal && !user.new_user && <LoginModal />}
      {showProfileModal && <NewUserModal />}
      {!isLoggedIn ? (
        <>
          <Navbar />
          <NotAuthorised
            error={"Please, login to access your account details."}
          />
        </>
      ) : (
        <div>
          <Layout style={{ minHeight: "100vh", overflow: "auto" }} >
            {window.innerWidth < 500 ? (
              <Header>
                <div style={{
                  float: "left",
                  paddingTop: "12px",
                  cursor: "pointer"
                }}
                >
                  <Image src={titleMobileImg} alt="logo" height="30px" width="30px" />
                </div>
                {getMenu(true)}
              </Header>
            ) : (
              <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
              >
                <Link href={routeToHref(toDiscover())} passHref>
                  <div className="logo" style={{ cursor: "pointer" }}>
                    {!collapsed ? (
                      <Image src={titleDesktopImg} alt="Landing page" />
                    ) : (
                      <Image src={titleMobileImg} alt="Landing page" />
                    )}
                  </div>
                </Link>
                {getMenu(false)}
              </Sider>
            )}
            <Layout>
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
          </Layout>
        </div>
      )}
    </>
  );
};

export default connector(EditProfile);
