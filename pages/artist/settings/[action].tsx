import { CollabRequestData, User } from "types/model";
import moment from "moment";
import Image from 'next/image';
import titleDesktopImg from '../../../public/images/Wondor.svg';
import titleMobileImg from '../../../public/images/logo.svg';
import { InputNumber, message, Tabs, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { ProspectusEntry, SearchCollab } from "types/model";
import CollabRequestTab from "../../../components/collabRequestTab";
import Icon from '@ant-design/icons'
import NotAuthorised from "@/components/error/notAuthorised";
import {
  Upload,
  Form,
  Input,
  Button,
  Select,
  Space,
  DatePicker,
  Switch,
  Table,
} from "antd";
import { Layout, Menu } from 'antd';
import {
  SearchOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  EditOutlined,
  InstagramOutlined,
  PictureOutlined,
  LogoutOutlined,
  MinusCircleOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  openLoginModalAction,
  updateArtistPreference,
  resetUserLoggedIn,
} from "state/action";
import SamplePage from "@/components/samplePage";
import ScratchpadPage from "@/components/scratchpad";
import { COUNTRIES, GENDERS, SOCIAL_PLATFORMS } from "config/constants";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { AppState } from "types/states";
import { Dispatch } from "redux";
import { useRoutesContext } from "components/routeContext";
import State from "state";
import * as actions from "state/action";
import { useRouter } from "next/router";
import { LoginModalDetails } from 'types/model';
import { useCallback } from "react";
import { getAllCategories } from "api/category";
import Loader from "@/components/loader";
import ArtistSocialProspectusModal from "@/components/modal/socialProspectusModal";
import LoginModal from '@/components/loginModal';
import NewUserModal from '@/components/modal/newUserModal';
import { GetSocialPlatformId, GetSocialPlatformName, GetCountryName } from '../../../helpers/artistSettingPageHelper';
import ProfilePicture from "@/components/profilePicture";
import { CategoryEntry } from "types/states/category";
import CategoryModal from "@/components/modal/categoryModal";
import EditBasicInformation from "@/components/editBasicInformation";
import EditPreferences from "@/components/editPreferences";

const { TabPane } = Tabs;

const { Header, Sider, Content, Footer } = Layout;

type SizeType = Parameters<typeof Form>[0]["size"];

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const openLoginModal = () => {
  openLoginModalAction();
};

const mapStateToProps = (state: AppState) => {
  return {
    collab: state.collab,
    isFetchingCollabs: state.collab.isFetchingCollabDetails,
    user: state.user.user,
    preferences: state.user.preferences,
    samples: state.sample.samples,
    categories: state.category.categories,
    socialProspectus: state.socialProspectus,
    loginModalDetails: state.home.loginModalDetails,
    isLoggedIn: state.user.isLoggedIn,

    isFetchingSamples: state.sample.isFetchingSamples,
    isFetchingSocialProspectus: state.socialProspectus?.isFetchingProspectus,
    isUpdatingProfile: state.user.isUpdatingProfile,
    isUpdatingPrefs: state.user.isUpdatingPrefs,

    isUpdatingProspectus: state.socialProspectus?.isUpdatingProspectus,
    isDeletingProspectus: state.socialProspectus?.isDeletingProspectus,
    hasDeletedProspectus: state.socialProspectus?.hasDeletedProspectus,

    showSocialProspectusModal: state.socialProspectus?.showSocialProspectusModal,
    showCategoryModal: state.category.showCategoryModal,
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchArtistSamples: (slug: string) =>
    dispatch(actions.fetchArtistSamples(slug)),
  fetchArtistSocialProspectus: (slug: string) =>
    dispatch(actions.fetchArtistSocialProspectus(slug)),
  updateArtistSocialProspectus: (data: any[]) =>
    dispatch(actions.updateArtistSocialProspectus(data)),
  setShowSocialProspectusModal: (show: boolean) =>
    dispatch(actions.setShowSocialProspectusModal(show)),
  deleteArtistSocialProspectus: (data: number) =>
    dispatch(actions.deleteArtistSocialProspectus(data)),
  getCollabRequestsAction: (data: SearchCollab) => dispatch(actions.getCollabRequestsAction(data)),

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
  samples,
  collab,
  preferences,
  categories,
  socialProspectus,
  isUpdatingProfile,
  isUpdatingPrefs,
  loginModalDetails,
  isLoggedIn,
  isUpdatingProspectus,
  isFetchingSamples,
  isFetchingSocialProspectus,
  isDeletingProspectus,
  hasDeletedProspectus,
  showSocialProspectusModal,
  fetchArtistSamples,
  fetchArtistSocialProspectus,
  setShowSocialProspectusModal,
  deleteArtistSocialProspectus,
  getCollabRequestsAction,
  resetUserLoggedIn,
}: Props) => {
  const emptyProspectusEntryDetails: ProspectusEntry = {
    name: "",
    handle: "",
    description: "",
    upForCollab: "",
  };

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


  const [collapsed, setCollapsed] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [userSocialProspectus, setUserSocialProspectus] = useState([]);
  const [upForCollaboration, setUpForCollaboration] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const [showSkillValidationError, setShowSkillValidationError] =
    useState(false);
  const [prospectusEntryRequestDetails, setProspectusEntryDetails] = useState(
    emptyProspectusEntryDetails
  );
  const [collabRequestDetails, setCollabRequestDetails] = useState(emptyCollabDetails);
  const [hasPendingCollab, setHasPendingCollab] = useState(false);
  

  const { Option } = Select;

  useEffect(() => {
    if (categories.length === 0) {
      getAllCategories();
    }
    fetchArtistSamples(user.slug);
    fetchArtistSocialProspectus(user.slug);
    getCollabRequestsAction({
    })
  }, [getCollabRequestsAction]);

  useEffect(() => {
    if (
      preferences["upForCollaboration"] === "true" ||
      preferences["upForCollaboration"] === true
    )
    setUpForCollaboration(true);

    setSelectedCategories(user.skills);
    setUserSocialProspectus(socialProspectus.socialProspectus);
  }, [preferences, user, socialProspectus]);

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

  const router = useRouter();
  const { action, tab } = router.query;

  if (
    typeof window !== "undefined" &&
    action !== "profile" &&
    action !== "account"
  ) {
    router.push("/artist/settings/profile?tab=basic-information");
  }


  function handleChange(value: string[]) {
    if (value.length <= 5) {
      setSelectedCategories(value);
    }
  }

  function handleClick(e: any) {
    setActiveTabKey(e.key);
    redirect(e.key);
  }

  const redirect = (tabIndex: string) => {
    let action = "profile";
    let tab = "";
    // 0 is for discover and 7 is for logout.
    if (tabIndex === "0") {
      router.push("/");
      return;
    } else if (tabIndex === "7") {
      logoutUser();
      return;
    }

    else if (tabIndex === "1") {
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
    }
    router.push("/artist/settings/" + action + "?tab=" + tab);
  };

  const getActiveTab = () => {
    return activeTabKey;
  }

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const [isViewMode, setViewMode] = useState(false);

  const ShowProspectusEntryModal = () => {
    setProspectusEntryDetails(emptyProspectusEntryDetails);
    setShowSocialProspectusModal(true);
  };

  const updateUserProspectus = (entry: React.SetStateAction<ProspectusEntry>) => {
    setProspectusEntryDetails(entry);
    setShowSocialProspectusModal(true);
  };
  const deleteUserProspectus = (entry: { name: any; }) => {
    deleteArtistSocialProspectus(GetSocialPlatformId(entry.name));
  };

  const HideProspectusEntryModal = () => {
    setShowSocialProspectusModal(false);
  };


  const columns = [
    { title: "Platform", dataIndex: "name", key: "name" },
    { title: "Handle", dataIndex: "handle", key: "handle" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Up for collab", dataIndex: "upForCollab", key: "upForCollab" },
    {
      title: "Action",
      key: "key",
      dataIndex: "key",
      // eslint-disable-next-line react/display-name
      render: (_text: any, record: any) => (
        <>
          <Button type="primary" onClick={() => updateUserProspectus(record)}>
            Update
          </Button>
          <Button onClick={() => deleteUserProspectus(record)}>Delete</Button>
        </>
      ),
    },
  ];

  const logoutUser = () => {
    localStorage.removeItem('token');
    resetUserLoggedIn();
    router.push("/");
  }

  const getCurrentSocialProspectus = () => {
    let data =
      userSocialProspectus.length != 0 ? userSocialProspectus[0].data : [];
    let updatedData = [];
    data.forEach((element: { socialPlatformId: any; handle: any; description: any; upForCollab: any; }) => {
      let obj = {
        name: GetSocialPlatformName(element.socialPlatformId),
        handle: element.handle,
        description: element.description,
        upForCollab: element.upForCollab,
      };
      updatedData.push(obj);
    });
    return <Table columns={columns} dataSource={updatedData} />;
  };

  const currentDate = moment(new Date());
  if (user && Object.keys(user).length === 0 && collab.isFetchingCollabDetails) return <Loader />;

  return (
    <>
      {loginModalDetails.openModal && !user.new_user && (
        <LoginModal />
      )
      }
      {showProfileModal && (
        <NewUserModal />
      )
      }
      {!isLoggedIn ? (
        <>
          <NotAuthorised />
        </>
      ) : (
        <div>
          <Layout style={{ minHeight: "100vh", overflow: "auto" }} hasSider>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
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
                defaultSelectedKeys={['1']}
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
                <Menu.Item key="7" danger >
                  <LogoutOutlined />
                  <span>Log out</span>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <>
                {getActiveTab() === "1" && (
                  <Content
                    style={{ padding: 24, background: '#fff', minHeight: 280 }}
                  >
                    <div className="settings__basicProfileCard">
                      <h2 className="f-20 ">Your basic personal information</h2>
                      <EditBasicInformation/>
                    </div>
                  </Content>
                )}

                {getActiveTab() === "2" && (
                  <Content
                    style={{ padding: 24, background: '#fff', minHeight: 280 }}
                  >
                    <div className="settings__basicProfileCardSecond">
                      <h2 className="f-20 ">Your preferences</h2>
                      <EditPreferences/>
                    </div>
                  </Content>
                )}

                {getActiveTab() === "3" && (
                  <Content
                    style={{ padding: 24, background: '#fff', minHeight: 280 }}
                  >
                    <div className="settings__basicProfileCardThird">
                      <h2 className="f-20 ">Work Samples</h2>
                      <p>
                        You can upload 6 of them now and flaunt your best work to
                        others!
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
                    style={{ padding: 24, background: '#fff', minHeight: 280 }}
                  >
                    <div className="settings__basicProfileCardFourth">
                      <h2 className="f-20 ">Your social media accounts</h2>
                      <div>
                        {!isFetchingSocialProspectus && (
                          <div>{getCurrentSocialProspectus()}</div>
                        )}
                      </div>
                      <div className="socialProspectus__buttonContainer">
                        <Button type="primary" onClick={ShowProspectusEntryModal}>
                          Add
                        </Button>
                      </div>
                    </div>
                  </Content>
                )}

                {getActiveTab() === "5" && (
                  <Content
                    style={{ padding: 24, background: '#fff', minHeight: 280 }}
                  >
                    <div className="settings__basicProfileCardThird">
                      <h2 className="f-20 ">Your space to take notes <Tooltip placement="topLeft" title="Please, do not write any personal information."><InfoCircleOutlined /></Tooltip></h2>
                      <ScratchpadPage />
                    </div>
                  </Content>
                )}

                {getActiveTab() === "6" && (
                  <Content
                    style={{ padding: 24, background: '#fff', minHeight: 280 }}
                  >
                    <div className="settings__basicProfileCardThird">
                      <h2 className="f-20 ">Your collab requests</h2>
                      <CollabRequestTab
                        otherUser={user.artist_id}
                        collabRequests={collab.collabDetails}
                        onClickCollabRequest={(collabDetails: CollabRequestData) => {
                          setCollabRequestDetails(collabDetails);
                        }}
                      />
                    </div>
                  </Content>
                )}
              </>
            </Layout>
          </Layout>
          <div>
            {showSocialProspectusModal && (
              <ArtistSocialProspectusModal
                onCancel={() => {
                  HideProspectusEntryModal();
                }}
                isViewMode={true}
                prospectusEntryDetails={prospectusEntryRequestDetails}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default connector(EditProfile);
