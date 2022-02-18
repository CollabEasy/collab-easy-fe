import { User } from "types/model";
import moment from "moment";
import { InputNumber, Tabs } from "antd";
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
  artistCategories: state.artist.artistCategories,
  user: state.user.user,
  isUpdatingProfile: state.user.isUpdatingProfile,
  isUpdatingPrefs: state.user.isUpdatingPrefs,
  preferences: state.user.preferences,
  samples: state.sample.samples,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getArtistCategories: () => dispatch(actions.fetchArtistCategoriesData()),
  updateArtistProfile: (user: any) => dispatch(updateArtistProfile(user)),
  updateArtistPreference: (key: string, value: any) =>
    dispatch(updateArtistPreference(key, value)),
  fetchArtistSamples: (slug: string) =>
    dispatch(actions.fetchArtistSamples(slug)),
});

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const { Option } = Select;

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const EditProfile = ({
  user,
  samples,
  preferences,
  isUpdatingProfile,
  isUpdatingPrefs,
  artistCategories,
  getArtistCategories,
  updateArtistProfile,
  fetchArtistSamples,
  updateArtistPreference,
}: Props) => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [selectedCategories, setSelectedCategories] = useState("");
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [upForCollaboration, setUpForCollaboration] = useState(false);
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  useEffect(() => {
    getArtistCategories();
  }, [getArtistCategories]);
  
  useEffect(() => {
    if (artistCategories.status === "success") {
      setCategoriesArr(artistCategories.data);
    }
  }, [artistCategories]);

  useEffect(() => {
    if (
      preferences["upForCollaboration"] === "true" ||
      preferences["upForCollaboration"] === true
    )
      setUpForCollaboration(true);
  }, [preferences]);

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
    setSelectedCategories(value);
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

  const [userDataCached, setUserDataCached] = useState<User>(user);

  useEffect(() => {
    setUserDataCached(user);
  }, [user]);

  useEffect(() => {
    fetchArtistSamples(user.slug);
  }, [fetchArtistSamples, user.slug]);

  const resetData = () => {};

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const submitForm = () => {
    updateArtistProfile(userDataCached);
  };

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
                          userDataCached.phone_number ? userDataCached.phone_number : ""
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
                        value={moment(userDataCached.date_of_birth ?  userDataCached.date_of_birth : currentDate)}
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
                    {/* <Form.Item label="Time zone">
                  <Select
                    defaultValue={timezone}
                    onChange={(e) => setTimeZone(e)}
                  >
                    {TIME_ZONES.map((zone) => (
                      <Select.Option key={zone.abbr} value={zone.abbr}>
                        {zone.value}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item> */}
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
                        {/* <Button htmlType="button" onClick={resetData}>
                          Reset
                        </Button> */}
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
                            if (value.length > 3) {
                              return Promise.reject(
                                "You can select maximum 3 art styles"
                              );
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
                        onChange={handleChange}
                        optionLabelProp="label"
                      >
                        {categoriesArr.length > 0 &&
                          categoriesArr.map((category, index) => (
                            <Option
                              value={category}
                              label={category}
                              key={index}
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
              <TabPane tab="Samples" key="3">
                <div className="settings__basicProfileCardThird">
                  <SamplePage isSelf samples={samples} user={user} />
                </div>
              </TabPane>
              <TabPane tab="Social" key="4">
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
                                    name={[field.name, "sight"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing sight",
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
                                name={[field.name, "price"]}
                                rules={[
                                  { required: true, message: "Missing price" },
                                ]}
                              >
                                <Input />
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
                              Add social media handle
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
                        {/* <Button htmlType="button" onClick={resetData}>
                          Reset
                        </Button> */}
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
