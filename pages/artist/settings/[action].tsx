import { CollabRequestData, User } from "types/model";
import Image from "next/image";
import titleDesktopImg from "../../../public/images/Wondor.svg";
import titleMobileImg from "../../../public/images/logo.svg";
import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { SearchCollab } from "types/model";
import CollabRequestTab from "../../../components/collabRequestTab";
import { default as DefaultLayout } from "../../../components/layout";
import NotAuthorised from "@/components/error/notAuthorised";
import { Select } from "antd";
import { Layout, Menu } from "antd";
import {
  SearchOutlined,
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

const { Sider, Content } = Layout;

const mapStateToProps = (state: AppState) => {
  return {
    user: state.user.user,
    loginModalDetails: state.home.loginModalDetails,
    collab: state.collab,
    samples: state.sample.samples,
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

  resetUserLoggedIn: () => dispatch(resetUserLoggedIn()),
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
  samples,
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
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [collabRequestDetails, setCollabRequestDetails] =
    useState(emptyCollabDetails);
  const [hasPendingCollab, setHasPendingCollab] = useState(false);

  const { Option } = Select;

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
  }, [
    collab.collabDetails.received.pending,
    collab.collabDetails.sent.pending,
  ]);

  const router = useRouter();
  const { action, tab } = router.query;

  if (
    typeof window !== "undefined" &&
    action !== "profile" &&
    action !== "account"
  ) {
    router.push("/artist/settings/profile?tab=basic-information");
  }

  function handleClick(e: any) {
    setActiveTabKey(e.key);
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
    }
    router.push("/artist/settings/" + action + "?tab=" + tab);
  };

  const getActiveTab = () => {
    return activeTabKey;
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    resetUserLoggedIn();
    router.push("/");
  };

  if (user && Object.keys(user).length === 0 && collab.isFetchingCollabDetails)
    return <Loader />;

  return (
    <DefaultLayout
      title="Settings"
      name={"description"}
      content={
        "Manage your basic information, prefernces, collab schedule, linked social media accounts, notes etc all in one place."
      }
    >
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
          <Layout style={{ minHeight: "100vh", overflow: "auto" }} hasSider>
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
            >
              <div className="logo">
                {!collapsed ? (
                  <Image src={titleDesktopImg} alt="Landing page" />
                ) : (
                  <Image src={titleMobileImg} alt="Landing page" />
                )}
              </div>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                onClick={handleClick}
              >
                <Menu.Item key="0">
                  <SearchOutlined />
                  <span>Discover</span>
                </Menu.Item>

                <Menu.Item key="1">
                  <UserOutlined />
                  <span>Basic Information</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <CheckCircleOutlined />
                  <span>Preferences</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <PictureOutlined />
                  <span>Samples</span>
                </Menu.Item>
                <Menu.Item key="4">
                  <InstagramOutlined />
                  <span>Social Prospectus</span>
                </Menu.Item>
                <Menu.Item key="5">
                  <EditOutlined />
                  <span>Scratchpad</span>
                </Menu.Item>
                <Menu.Item key="6">
                  <CalendarOutlined />
                  <span>Collab Requests</span>
                </Menu.Item>
                <Menu.Item key="7">
                  <DollarOutlined />
                  <span>Rewards</span>
                </Menu.Item>
                <Menu.Item key="8" danger>
                  <LogoutOutlined />
                  <span>Log out</span>
                </Menu.Item>
              </Menu>
            </Sider>
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
                    <div className="settings__basicProfileCard">
                      <h2 className="f-20 ">Your basic personal information</h2>
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
                    <div className="settings__basicProfileCardSecond">
                      <h2 className="f-20 ">Your preferences</h2>
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
                    <div className="settings__basicProfileCardThird">
                      <h2 className="f-20 ">You work samples</h2>
                      <p>
                        You can upload 6 of them now and flaunt your best work
                        to others!
                      </p>
                      <SamplePage
                        isSelf
                        samples={samples}
                        user={user}
                        showLoader={isFetchingSamples}
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
                    <div className="settings__basicProfileCardFourth">
                      <h2 className="f-20 ">Your social media accounts</h2>
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
                    <div className="settings__basicProfileCardThird">
                      <h2 className="f-20 ">
                        Your space to take notes{" "}
                        <Tooltip
                          placement="topLeft"
                          title="Please, do not write any personal information."
                        >
                          <InfoCircleOutlined />
                        </Tooltip>
                      </h2>
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
                    <div className="settings__basicProfileCardThird">
                      <h2 className="f-20 ">Your collab requests</h2>
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
                    <div className="settings__basicProfileCardThird">
                      <h2 className="f-20 ">Your rewards</h2>
                      <Rewards/>
                    </div>
                  </Content>
                )}
              </>
            </Layout>
          </Layout>
        </div>
      )}
    </DefaultLayout>
  );
};

export default connector(EditProfile);
