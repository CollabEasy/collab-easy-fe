import { CollabRequestData, User } from "types/model";
import moment from "moment";
import { InputNumber, message, Tabs, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { ProspectusEntry, SearchCollab } from "types/model";
import CollabRequestTab from "../../../components/collabRequestTab";
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
import {
  UploadOutlined,
  MinusCircleOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  openLoginModalAction,
  updateArtistProfile,
  updateArtistPreference,
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
import { GetSocialPlatformId, GetSocialPlatformName, GetCountryName} from '../../../helpers/artistSettingPageHelper';

const { TabPane } = Tabs;

type SizeType = Parameters<typeof Form>[0]["size"];

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const openLoginModal = () => {
  openLoginModalAction();
};

const mapStateToProps = (state: AppState) => {
  console.log("state in settings : ", state.collab);
  return {
  collab: state.collab,
  isFetchingCollabs: state.collab.isFetchingCollabDetails,
  user: state.user.user,
  preferences: state.user.preferences,
  /*samples: state.sample.samples,*/
  categories: state.category.categories,
  socialProspectus: state.socialProspectus,
  loginModalDetails: state.home.loginModalDetails,
  isLoggedIn: state.user.isLoggedIn,

  /*isFetchingSamples: state.sample.isFetchingSamples,*/
  isFetchingSocialProspectus: state.socialProspectus?.isFetchingProspectus,
  isUpdatingProfile: state.user.isUpdatingProfile,
  isUpdatingPrefs: state.user.isUpdatingPrefs,

  isUpdatingProspectus: state.socialProspectus?.isUpdatingProspectus,
  isDeletingProspectus: state.socialProspectus?.isDeletingProspectus,
  hasDeletedProspectus: state.socialProspectus?.hasDeletedProspectus,

  showSocialProspectusModal: state.socialProspectus?.showSocialProspectusModal,
}};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // fetchArtistSamples: (slug: string) =>
  //   dispatch(actions.fetchArtistSamples(slug)),
  getAllCategories: () => dispatch(actions.getAllCategories()),
  fetchArtistSkills: () => dispatch(actions.fetchArtistSkills("")),
  fetchArtistSocialProspectus: (slug: string) =>
    dispatch(actions.fetchArtistSocialProspectus(slug)),
  fetchArtistPreferences: () => dispatch(actions.fetchArtistPreferences()),

  updateArtistSkills: (data: any) => dispatch(actions.updateArtistArt(data)),
  updateArtistProfile: (user: any) => dispatch(updateArtistProfile(user)),
  updateArtistPreference: (key: string, value: any) =>
    dispatch(updateArtistPreference(key, value)),
  updateArtistSocialProspectus: (data: any[]) =>
    dispatch(actions.updateArtistSocialProspectus(data)),

  setShowSocialProspectusModal: (show: boolean) =>
    dispatch(actions.setShowSocialProspectusModal(show)),
  deleteArtistSocialProspectus: (data: number) =>
    dispatch(actions.deleteArtistSocialProspectus(data)),
  getCollabRequestsAction: (data: SearchCollab) => dispatch(actions.getCollabRequestsAction(data)),
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
  /*samples,*/
  collab,
  preferences,
  categories,
  socialProspectus,
  isUpdatingProfile,
  isUpdatingPrefs,
  loginModalDetails,
  isLoggedIn,
  isUpdatingProspectus,
  /*isFetchingSamples,*/
  isFetchingSocialProspectus,
  isDeletingProspectus,
  hasDeletedProspectus,
  showSocialProspectusModal,
  getAllCategories,
  fetchArtistSkills,
  /*fetchArtistSamples,*/
  fetchArtistPreferences,
  fetchArtistSocialProspectus,
  updateArtistPreference,
  updateArtistSkills,
  updateArtistProfile,
  setShowSocialProspectusModal,
  deleteArtistSocialProspectus,
  getCollabRequestsAction,
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

  const [activeTabKey, setActiveTabKey] = useState("1");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [userSocialProspectus, setUserSocialProspectus] = useState([]);
  const [upForCollaboration, setUpForCollaboration] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userDataCached, setUserDataCached] = useState<User>(user);
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

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        value={userDataCached.country}
        style={{ width: 150 }}
        onChange={(e) => {
          let selectecCountry = GetCountryName(e);
          setUserDataCached((prevState) => ({
            ...prevState,
            country_dial: e,
            country_name: selectecCountry["Name"],
            country_iso: selectecCountry["Iso2"],
          }));
        }}
      >
        {COUNTRIES.map((country) => (
          <Select.Option key={country.Iso2} value={country.Dial}>
            {country.Unicode} {country.Name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );

  useEffect(() => {
    if (categories.length === 0) {
      getAllCategories();
    }
    //fetchArtistSamples(user.slug);
    fetchArtistPreferences();
    fetchArtistSkills();
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

    setUserDataCached(user);
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
    router.push("/artist/settings/profile?tab=personal-information");
  }

  function handleChange(value: string[]) {
    if (value.length <= 5) {
      setSelectedCategories(value);
    }
  }

  const getActiveTab = () => {
    let active = "1.1";

    if (action === "profile" && tab === "profile") {
      active = "1.1";
    }
    if (action === "profile" && tab === "preferences") {
      active = "1.2";
    } else if (action === "profile" && tab === "samples") {
      active = "1.3";
    } else if (action === "profile" && tab === "social-prospectus") {
      active = "1.4";
    } else if (action === "profile" && tab === "scratchpad") {
      active = "1.5";
    } else if (action === "profile" && tab === "collab-request") {
      active = "1.6";
    }
    // else if (action === "account" && tab === "communication") {
    //   active = "2";
    // }
    // else if (action === "account" && tab === "account-management") {
    //   active = "2.2";
    // }
    // if (action === "account") active = "2";
    return active;
  };

  const redirect = (tabIndex: string) => {
    let action = "profile";
    let tab = "personal-information";
    if (tabIndex == "1.1") {
      // do nothing
    }
    if (tabIndex === "1.2") {
      action = "profile";
      tab = "preferences";
    } else if (tabIndex === "1.3") {
      action = "profile";
      tab = "samples";
    } else if (tabIndex === "1.4") {
      action = "profile";
      tab = "social-prospectus";
    } else if (tabIndex === "1.5") {
      action = "profile";
      tab = "scratchpad";
    } else if (tabIndex === "1.6") {
      action = "profile";
      tab = "collab-request";
    }
    // else if (tabIndex === "2") {
    //   action = "account";
    //   tab = "communicaton"
    // }
    // else if (tabIndex === "2.1") {
    //   action = "account";
    //   tab = "communicaton";
    // }
    // else if (tabIndex === "2.2") {
    //   action = "account";
    //   tab = "account-management";
    // }

    router.push("/artist/settings/" + action + "?tab=" + tab);
  };

  const resetData = () => { };

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const submitForm = () => {
    updateArtistProfile(userDataCached);
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

  const saveArtistSkills = () => {
    if (selectedCategories.length === 0) {
      message.error("You need to select atleast one art style.");
    } else {
      updateArtistSkills({ artNames: selectedCategories });
    }
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

        <div className="edit-profile">
          <>
            {/* <Tabs
          tabPosition={"left"}
          onChange={(key: string) => {
            redirect(key);
          }}
          activeKey={getActiveTab()}
        >
          <TabPane tab="Artist's Information" key="1"> */}
            <Tabs
              type="card"
              centered
              onChange={(key: string) => {
                redirect(key);
              }}
              activeKey={getActiveTab()}
            >
              <TabPane tab="Profile" key="1.1">
                <div className="settings__basicProfileCard">
                  <h2 className="f-20 ">Your basic personal information</h2>
                  <Form
                    className="settings__basicProfileForm"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    initialValues={{ size: componentSize }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize as SizeType}
                    onFinish={submitForm}
                  >
                    <Form.Item label="First name">
                      <Input
                        value={userDataCached ? userDataCached.first_name : ""}
                        onChange={(e) => {
                          setUserDataCached((prevState) => ({
                            ...prevState,
                            first_name: e.target.value,
                          }));
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="Last name">
                      <Input
                        value={userDataCached ? userDataCached.last_name : ""}
                        onChange={(e) => {
                          setUserDataCached((prevState) => ({
                            ...prevState,
                            last_name: e.target.value,
                          }));
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="Email">
                      <Input
                        value={userDataCached ? userDataCached.email : ""}
                        disabled={true}
                        onChange={(e) => {
                          setUserDataCached((prevState) => ({
                            ...prevState,
                            email: e.target.value,
                          }));
                        }}
                      />
                    </Form.Item>
                    {/* <Form.Item label="Phone Number">
                      <Input
                        addonBefore={prefixSelector}
                        style={{ width: "100%" }}
                        value={
                          userDataCached.phone_number
                            ? userDataCached.phone_number
                            : ""
                        }
                        onChange={(e) => {
                          setUserDataCached((prevState) => ({
                            ...prevState,
                            phone_number: e.target.value as unknown as number,
                          }));
                        }}
                      />
                    </Form.Item> */}
                    <Form.Item label="Date of birth">
                      <DatePicker
                        clearIcon={null}
                        disabledDate={(d) =>
                          !d ||
                          d.isAfter(currentDate) ||
                          currentDate >= moment().endOf("day")
                        }
                        format="DD/MM/YYYY"
                        value={moment(
                          userDataCached.date_of_birth
                            ? userDataCached.date_of_birth
                            : currentDate
                        )}
                        onChange={(e) => {
                          setUserDataCached((prevState) => ({
                            ...prevState,
                            date_of_birth: e.toDate(),
                          }));
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="Gender">
                      <Select
                        value={userDataCached ? userDataCached.gender : ""}
                        onChange={(e) => {
                          setUserDataCached((prevState) => ({
                            ...prevState,
                            gender: e,
                          }));
                        }}
                      >
                        {GENDERS.map((gen) => (
                          <Select.Option key={gen} value={gen}>
                            {gen}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Country">
                      <Select
                        showSearch
                        value={userDataCached ? userDataCached.country : ""}
                        onChange={(e) => {
                          setUserDataCached((prevState) => ({
                            ...prevState,
                            country: e,
                          }));
                        }}
                      >
                        {COUNTRIES.map((country) => (
                          <Select.Option key={country.Iso2} value={country.Name}>
                            {country.Unicode} {country.Name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Bio">
                      <Input.TextArea
                        value={userDataCached ? userDataCached.bio : ""}
                        maxLength={300}
                        showCount
                        onChange={(e) => {
                          setUserDataCached((prevState) => ({
                            ...prevState,
                            bio: e.target.value,
                          }));
                        }}
                      />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                      <div className="settings__basicProfileSubmitContainer">
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={submitForm}
                          loading={isUpdatingProfile}
                        >
                          {isUpdatingProfile ? "Saving..." : "Save"}
                        </Button>
                        {/* <Button htmlType="button" onClick={resetData}>
                      Reset
                    </Button> */}
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </TabPane>
              <TabPane tab="Preferences" key="1.2">
                <div className="settings__basicProfileCardSecond">
                  <h2 className="f-20 ">Your preferences</h2>
                  <Form
                    className="settings__basicProfileForm"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    initialValues={{ size: componentSize }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize as SizeType}
                  >
                    <Form.Item
                      label="Available to collab"
                      valuePropName="checked"
                    >
                      <Switch
                        onChange={() => {
                          updateArtistPreference(
                            "upForCollaboration",
                            !upForCollaboration
                          );
                          setUpForCollaboration(!upForCollaboration);
                        }}
                        loading={isUpdatingPrefs === "upForCollaboration"}
                        checked={upForCollaboration}
                        checkedChildren="active"
                        unCheckedChildren="inactive"
                      />
                    </Form.Item>

                    <Form.Item
                      // name="art"
                      label="Art styles"
                      rules={[
                        {
                          validator(_, value) {
                            if (value === undefined) {
                              return Promise.reject();
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Select atleast one art style"
                        onChange={(value) => {
                          if (value?.length > 5) {
                            value.pop();
                            message.error("You can select maximum 5 art styles");
                          } else {
                            handleChange(value);
                          }
                        }}
                        optionLabelProp="label"
                        value={selectedCategories}
                        defaultValue={user.skills}
                      >
                        {categories.length > 0 &&
                          categories.map((category, index) => (
                            <Option
                              value={category}
                              label={category}
                              key={category}
                            >
                              <div className="demo-option-label-item">
                                {category}
                              </div>
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                      <div className="settings__basicProfileSubmitContainer">
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={saveArtistSkills}
                          loading={isUpdatingProfile}
                        >
                          {isUpdatingProfile ? "Saving..." : "Save"}
                        </Button>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </TabPane>
              {/* <TabPane tab="Samples" key="1.3">
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
          </TabPane> */}
              <TabPane tab="Social prospectus" key="1.4">
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
              </TabPane>
              <TabPane tab="Scratchpad" key="1.5">
                <div className="settings__basicProfileCardThird">
                    <h2 className="f-20 ">Your space to take notes <Tooltip placement="topLeft" title="Please, do not write any personal information."><InfoCircleOutlined/></Tooltip></h2>
                  <ScratchpadPage />
                </div>
              </TabPane>
              <TabPane tab="Collab request" key="1.6">
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
              </TabPane>
            </Tabs>
            {/* </TabPane> */}
            {/* <TabPane tab="Account Settings" key="2">
            <Tabs
              type="card"
              onChange={(key: string) => {
                redirect(key);
              }}
            >
              <TabPane tab="Communication" key="2.1">
                <div className="settings__basicProfileCard">
                  <h2 className="f-20 ">Communication</h2>
                  <Form
                    className="settings__basicProfileForm"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    initialValues={{ size: componentSize }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize as SizeType}
                  >
                    <Form.Item label="Notification Emails" valuePropName="checked">
                      <Switch
                        checkedChildren="enabled"
                        unCheckedChildren="disabled"
                      />
                    </Form.Item>
                  </Form>
                </div>
              </TabPane>
              <TabPane tab="Account management" key="2.2">
                <div className="settings__basicProfileCardSecond">
                  <h2 className="f-20 ">Account Management</h2>
                  <Form
                    className="settings__basicProfileForm"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    initialValues={{ size: componentSize }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize as SizeType}
                  >
                    <Form.Item label="Disable Account" valuePropName="checked">
                      <Switch
                        checkedChildren="enabled"
                        unCheckedChildren="disabled"
                      />
                    </Form.Item>
                    <Form.Item label="Delete Account" valuePropName="checked">
                      <Switch
                        checkedChildren="enabled"
                        unCheckedChildren="disabled"
                      />
                    </Form.Item>
                  </Form>
                </div>
              </TabPane>
            </Tabs>
          </TabPane> */}
            {/* </Tabs> */}
          </>
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
