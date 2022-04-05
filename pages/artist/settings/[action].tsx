import { User } from "types/model";
import moment from "moment";
import { InputNumber, message, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import {ProspectusEntry} from "types/model";
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
import { useCallback } from "react";
import { getAllCategories } from "api/category";
import Loader from "@/components/loader";
import ArtistSocialProspectusModal from "@/components/modal/socialProspectusModal";

const { TabPane } = Tabs;

type SizeType = Parameters<typeof Form>[0]["size"];

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const openLoginModal = () => {
  openLoginModalAction();
};

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
  preferences: state.user.preferences,
  samples: state.sample.samples,
  categories: state.category.categories,
  socialProspectus: state.socialProspectus,

  isFetchingSamples: state.sample.isFetchingSamples,
  isFetchingSocialProspectus: state.socialProspectus?.isFetchingProspectus,
  isUpdatingProfile: state.user.isUpdatingProfile,
  isUpdatingPrefs: state.user.isUpdatingPrefs,

  isUpdatingProspectus: state.socialProspectus?.isUpdatingProspectus,
  isDeletingProspectus: state.socialProspectus?.isDeletingProspectus,
  hasDeletedProspectus: state.socialProspectus?.hasDeletedProspectus,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchArtistSamples: (slug: string) => dispatch(actions.fetchArtistSamples(slug)),
  getAllCategories: () => dispatch(actions.getAllCategories()),
  fetchArtistSkills: () => dispatch(actions.fetchArtistSkills("")),
  fetchArtistSocialProspectus: (slug: string) => dispatch(actions.fetchArtistSocialProspectus(slug)),

  updateArtistSkills: (data: any) => dispatch(actions.updateArtistArt(data)),
  updateArtistProfile: (user: any) => dispatch(updateArtistProfile(user)),
  updateArtistPreference: (key: string, value: any) => dispatch(updateArtistPreference(key, value)),
  updateArtistSocialProspectus: (data: any[]) => dispatch(actions.updateArtistSocialProspectus(data)),

  deleteArtistSocialProspectus: (data: number) => dispatch(actions.deleteArtistSocialProspectus(data)),
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
  preferences,
  categories,
  socialProspectus,
  isUpdatingProfile,
  isUpdatingPrefs,
  isUpdatingProspectus,
  isFetchingSamples,
  isFetchingSocialProspectus,
  isDeletingProspectus,
  hasDeletedProspectus,
  getAllCategories,
  fetchArtistSkills,
  fetchArtistSamples,
  fetchArtistSocialProspectus,
  updateArtistPreference,
  updateArtistSkills,
  updateArtistProfile,
  deleteArtistSocialProspectus,
}: Props) => {
  const emptyProspectusEntryDetails: ProspectusEntry = {
    name: "",
    handle: "",
    description: "",
    upForCollab: "",
  };

  const [activeTabKey, setActiveTabKey] = useState("1");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [userSocialProspectus, setUserSocialProspectus] = useState([]);
  const [upForCollaboration, setUpForCollaboration] = useState(false);
  const [userDataCached, setUserDataCached] = useState<User>(user);
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const [showSkillValidationError, setShowSkillValidationError] = useState(false);
  const [prospectusEntryRequestDetails, setProspectusEntryDetails] = useState(emptyProspectusEntryDetails);

  const { Option } = Select;

  const getCountryName = (country_iso) => {
    for (var i = 0; i < COUNTRIES.length; i++) {
      if (COUNTRIES[i]["Dial"] == country_iso) {
        return COUNTRIES[i];
      }
    }
    return {};
  }
  // key={country.Iso2}
  //                           value={country.Name}


  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
       <Select value={userDataCached.country_iso} style={{ width: 150 }}
        onChange={(e) => {
          let selectecCountry = getCountryName(e);
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
    fetchArtistSamples(user.slug);
    fetchArtistSkills();
    fetchArtistSocialProspectus(user.slug);
  }, []);

  useEffect(() => {
    if (
      preferences["upForCollaboration"] === "true" ||
      preferences["upForCollaboration"] === true
    )
      setUpForCollaboration(true);

    setUserDataCached(user);
    setSelectedCategories(user.skills);
    setUserSocialProspectus(socialProspectus.socialProspectus);
  }, [preferences, user, socialProspectus])

  const router = useRouter();
  const { action, tab } = router.query;

  if (typeof window !== "undefined" && action !== "profile" && action !== "account") {
    router.push("/artist/settings/profile?tab=personal-information");
  }

  function handleChange(value) {
    if (value.length <= 3) {
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
    }
    else if (action === "profile" && tab === "samples") {
      active = "1.3";
    }
    else if (action === "profile" && tab === "social-prospectus") {
      active = "1.4";
    }
    else if (action === "profile" && tab === "scratchpad") {
      active = "1.5";
    }
    // else if (action === "account" && tab === "communication") {
    //   active = "2";
    // }
    // else if (action === "account" && tab === "account-management") {
    //   active = "2.2";
    // }
    // if (action === "account") active = "2";

    //console.log("rabbal active is ", active);
    return active;
  };

  const redirect = (tabIndex: string) => {
    let action = "profile";
    let tab = "personal-information";
    if (tabIndex== "1.1") {
      // do nothing
    }
    if (tabIndex === "1.2") {
      action = "profile";
      tab = "preferences";
    }
    else if (tabIndex === "1.3") {
      action = "profile";
      tab = "samples";
    }
    else if (tabIndex === "1.4") {
      action = "profile";
      tab = "social-prospectus";
    }
    else if (tabIndex === "1.5") {
      action = "profile";
      tab = "scratchpad";
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
    console.log(userDataCached);
    updateArtistProfile(userDataCached);
  };

  const [isViewMode, setViewMode] = useState(false);

  const ShowProspectusEntryModal = () => {
    setProspectusEntryDetails(emptyProspectusEntryDetails);
    setViewMode(true);
  }

  const updateUserProspectus = (entry) => {
    setProspectusEntryDetails(entry);
    setViewMode(true);
  }
  const deleteUserProspectus = (entry) => {
    deleteArtistSocialProspectus(getSocialPlatformId(entry.name));
  }

  const HideProspectusEntryModal = () => {
    setViewMode(false);
  }

  const saveArtistSkills = () => {
    if (selectedCategories.length === 0) {
      message.error("You need to select atleast one art style.")
    } else {
      updateArtistSkills({ artNames: selectedCategories });
    }
  }

  const columns = [
    { title: 'Platform', dataIndex: 'name', key: 'name' },
    { title: 'Handle', dataIndex: 'handle', key: 'handle' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Up for collab', dataIndex: 'upForCollab', key: 'upForCollab'},
    {
      title: 'Action',
      key: 'key',
      dataIndex: 'key',
      render: (text, record) => (
        <>
          <Button 
            type="primary"
            onClick={() => updateUserProspectus(record)}>
            Update
          </Button>
          <Button onClick={() => deleteUserProspectus(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const getSocialPlatformId = (name) => {
    for (var i = 0; i < SOCIAL_PLATFORMS.length; i++) {
      if (SOCIAL_PLATFORMS[i].name === name) {
        return SOCIAL_PLATFORMS[i].id;
      }
    }
    return 1;
  };

  const getSocialPlatformName = (id) => {
    for (var i = 0; i < SOCIAL_PLATFORMS.length; i++) {
      if (SOCIAL_PLATFORMS[i].id === id) {
        return SOCIAL_PLATFORMS[i].name;
      }
    }
    return "";
  };

  const getCurrentSocialProspectus = () => {
    let data = userSocialProspectus.length != 0 ? userSocialProspectus[0].data : [];
    let updatedData = []
    data.forEach(element => {
      let obj = {
        "name": getSocialPlatformName(element.socialPlatformId),
        "handle": element.handle,
        "description": element.description,
        "upForCollab" : element.upForCollab,
      }
      updatedData.push(obj);
    });
    return <Table columns={columns} dataSource={updatedData} />
  }

  const currentDate = moment(new Date());
  if (user && Object.keys(user).length === 0) return <Loader />;
  return (
    <div className="edit-profile" style={{ padding: 200 }}>
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
                  <h2 className="f-20 ">Personal Information</h2>
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
                    <Form.Item label="First Name">
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
                    <Form.Item label="Last Name">
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
                    <Form.Item label="Phone Number">
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
                    </Form.Item>
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
                          console.log("rabbal", e);
                          setUserDataCached((prevState) => ({
                            ...prevState,
                            country: e,
                          }));
                        }}
                      >
                        {COUNTRIES.map((country) => (
                          <Select.Option
                            key={country.Iso2}
                            value={country.Name}
                          >
                            {country.Unicode} {country.Name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Bio">
                      <Input.TextArea
                        value={userDataCached ? userDataCached.bio : ""}
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
                        <Button htmlType="button" onClick={resetData}>
                          Reset
                        </Button>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </TabPane>
              <TabPane tab="Preferences" key="1.2">
                <div className="settings__basicProfileCardSecond">
                  <h2 className="f-20 ">Preferences</h2>
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
                      label="Collaborate with others"
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
                      name="art"
                      label="Art Styles"
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
                        placeholder="select atleast one art style"
                        onChange={value => {
                          if (value?.length > 3) {
                            value.pop();
                            message.error("You can select maximum 3 art styles")
                          } else {
                            handleChange(value);
                          }
                        }}
                        optionLabelProp="label"
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
              <TabPane tab="Samples" key="1.3">
                <div className="settings__basicProfileCardThird">
                  <h2 className="f-20 ">Work Samples</h2>
                  <p>You can upload 6 of them now and flaunt your best work to others!</p> 
                  <SamplePage isSelf samples={samples} user={user} showLoader={isFetchingSamples} />
                </div>
              </TabPane>
              <TabPane tab="Social Prospectus" key="1.4">
                <div className="settings__basicProfileCardFourth">
                  <h2 className="f-20 ">Social Media Prospectus</h2>
                  <div>
                    {!isFetchingSocialProspectus && (
                      <div>{getCurrentSocialProspectus()}</div>
                    )}
                  </div>
                  <div className="socialProspectus__buttonContainer">
                    <Button
                      type="primary"
                      onClick={ShowProspectusEntryModal}
                    >Add</Button>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Scratchpad" key="1.5">
                <div className="settings__basicProfileCardThird">
                  <h2 className="f-20 ">Your Space to take notes</h2>
                  <ScratchpadPage user={user} />
                </div>
              </TabPane >
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
        {isViewMode && (
          <ArtistSocialProspectusModal
            onCancel={() => {
              HideProspectusEntryModal();
            }}
            isViewMode = {true}
            prospectusEntryDetails = {prospectusEntryRequestDetails}
          />
        )}
      </div>
    </div>
  );
};

export default connector(EditProfile);