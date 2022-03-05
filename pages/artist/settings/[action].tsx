import { User } from "types/model";
import moment from "moment";
import { InputNumber, message, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import {
  Upload,
  Form,
  Input,
  Button,
  Select,
  Space,
  DatePicker,
  Switch,
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
import SamplePage from "../../../components/samplePage";
import { COUNTRIES, GENDERS, TIME_ZONES } from "config/constants";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { AppState } from "types/states";
import { Dispatch } from "redux";
import { useRoutesContext } from "components/routeContext";
import State from "state";
import * as actions from "state/action";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { getAllCategories } from "api/category";

const { TabPane } = Tabs;

type SizeType = Parameters<typeof Form>[0]["size"];

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select defaultValue={"🇺🇸United States"} style={{ width: 150 }}>
      {COUNTRIES.map((country) => (
        <Select.Option key={country.Iso2} value={country.Dial}>
          {country.Unicode} {country.Name}
        </Select.Option>
      ))}
    </Select>
  </Form.Item>
);

const openLoginModal = () => {
  openLoginModalAction();
};

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
  isUpdatingProfile: state.user.isUpdatingProfile,
  isUpdatingPrefs: state.user.isUpdatingPrefs,
  preferences: state.user.preferences,
  samples: state.sample.samples,
  categories: state.category.categories,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateArtistProfile: (user: any) => dispatch(updateArtistProfile(user)),
  updateArtistPreference: (key: string, value: any) =>
    dispatch(updateArtistPreference(key, value)),
  fetchArtistSamples: (slug: string) =>
    dispatch(actions.fetchArtistSamples(slug)),
  getAllCategories: () => dispatch(actions.getAllCategories()),
  fetchArtistSkills: () => dispatch(actions.fetchArtistSkills()),
  updateArtistSkills: (data: any) => dispatch(actions.updateArtistArt(data))
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
  isUpdatingProfile,
  isUpdatingPrefs,
  getAllCategories,
  fetchArtistSkills,
  updateArtistSkills,
  updateArtistProfile,
  fetchArtistSamples,
  updateArtistPreference,
}: Props) => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [upForCollaboration, setUpForCollaboration] = useState(false);
  const [userDataCached, setUserDataCached] = useState<User>(user);
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const [showSkillValidationError, setShowSkillValidationError] = useState(false);

  const { Option } = Select;

  useEffect(() => {
    if (categories.length === 0) {
      getAllCategories();
    }
    fetchArtistSamples(user.slug);
    fetchArtistSkills();
  }, []);

  useEffect(() => {
    if (
      preferences["upForCollaboration"] === "true" ||
      preferences["upForCollaboration"] === true
    )
      setUpForCollaboration(true);
    
    setUserDataCached(user);
    setSelectedCategories(user.skills);
  }, [preferences, user])

  const router = useRouter();
  const { action } = router.query;

  if (
    typeof window !== "undefined" &&
    action !== "edit" &&
    action !== "settings"
  ) {
    router.push("/artist/settings/edit");
  }

  function handleChange(value) {
    if (value.length <= 3) {
      setSelectedCategories(value);
    }
  }

  const getActiveTab = () => {
    let active = "1";
    if (action === "settings") active = "2";

    return active;
  };
  const redirect = (tabIndex: string) => {
    let action = "edit";
    if (tabIndex === "2") {
      action = "settings";
    }

    router.push("/artist/settings/" + action);
  };

  const resetData = () => {};

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const submitForm = () => {
    updateArtistProfile(userDataCached);
  };

  const saveArtistSkills = () => {
    if (selectedCategories.length === 0) {
      message.error("You need to select atleast one art style.")
    } else {
      updateArtistSkills({artNames: selectedCategories});
    }
  }

  const currentDate = moment(new Date());
  if (user && Object.keys(user).length === 0) return <p>Redirecting</p>;
  return (
    <div className="edit-profile" style={{ padding: 200 }}>
      {/* <h1 style={{ textAlign: 'center' }}>{getHeading()}</h1> */}
      <>
        <Tabs
          tabPosition={"left"}
          onChange={(key: string) => {
            redirect(key);
          }}
          activeKey={getActiveTab()}
        >
          <TabPane tab="Artist's Information" key="1">
            <Tabs
              type="card"
              // tabPosition={"left"}
              // onChange={(key: string) => {
              //   redirect(key);
              // }}
              // activeKey={getActiveTab()}
            >
              <TabPane tab="Profile" key="1">
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
              <TabPane tab="Preferences" key="2">
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
              <TabPane tab="Samples" key="3">
                <div className="settings__basicProfileCardThird">
                  <h2 className="f-20 ">Work Samples</h2>
                  <SamplePage isSelf samples={samples} user={user} />
                </div>
              </TabPane>
              <TabPane tab="Social Prospectus" key="4">
                <div className="settings__basicProfileCardFourth">
                  <h2 className="f-20 ">Social Media Prospectus</h2>
                  <Form
                    className="settings__basicProfileForm"
                    name="dynamic_form_nest_item"
                    autoComplete="off"
                  >
                    <Form.List name="sights">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map((field) => (
                            <Space key={field.key} align="baseline">
                              <Form.Item
                                noStyle
                                shouldUpdate={(prevValues, curValues) =>
                                  prevValues.area !== curValues.area ||
                                  prevValues.sights !== curValues.sights
                                }
                              >
                                {() => (
                                  <Form.Item
                                    {...field}
                                    label="Platform"
                                    name={[field.name, "wondor"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing social platform name",
                                      },
                                    ]}
                                  >
                                    <Select style={{ width: 130 }}></Select>
                                  </Form.Item>
                                )}
                              </Form.Item>
                              <Form.Item
                                {...field}
                                label="Handle"
                                name={[field.name, "admin"]}
                                rules={[
                                  { required: true, message: "Missing handle of the provided social platform" },
                                ]}
                              >
                                <Input />
                              </Form.Item>
                              <Form.Item
                                {...field}
                                label="Description"
                                name={[field.name, "description"]}
                                rules={[
                                  { required: false },
                                ]}
                              >
                                <Input.TextArea />
                              </Form.Item>
                              <MinusCircleOutlined
                                onClick={() => remove(field.name)}
                              />
                            </Space>
                          ))}

                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add social media handles
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
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
            </Tabs>
          </TabPane>
          <TabPane tab="Account Settings" key="2">
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
      </>
    </div>
  );
};

// To Do: - need to fetch data using below function, need to fix the issue of localstorage object not available at server side
// export const getServerSideProps = async () => {
//     const user = await getArtistData()
//     return {
//         props: {
//             userData: user
//         } as ProfilePageProps,
//     }
// }

export default connector(EditProfile);
