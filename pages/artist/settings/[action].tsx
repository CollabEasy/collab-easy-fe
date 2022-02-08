import { User } from "types/model";
import { InputNumber, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, DatePicker, Switch } from "antd";
import {
  openLoginModalAction,
  updateArtistProfile,
  updateArtistPreference,
} from "state/action";
import { COUNTRIES, GENDERS, TIME_ZONES } from "config/constants";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { AppState } from "types/states";
import { Dispatch } from "redux";
import { useRouter } from "next/router";
import { useRoutesContext } from "components/routeContext";

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
  preferences: state.user.preferences,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateArtistProfile: (user: any) => dispatch(updateArtistProfile(user)),
  updateArtistPreference: (key: string, value: any) => dispatch(updateArtistPreference(key, value)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const EditProfile = ({
  user,
  preferences,
  updateArtistProfile,
  updateArtistPreference,
}: Props) => {
  const [upForCollaboration, setUpForCollaboration] = useState(false);
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );

  useEffect(() => {
    if (preferences["upForCollaboration"] === 'true' || preferences['upForCollaboration'] === true) 
      setUpForCollaboration(true)
  }, [preferences])

  const router = useRouter();
  const { action } = router.query;
  const getActiveTab = () => {
    switch (action) {
      case "edit":
        return "1";
      case "sample":
        return "2";
      case "preferences":
        return "3";
      default:
        router.push("/artist/settings/edit");
        return "1";
    }
  };

  const getHeading = () => {
    switch (action) {
      case "edit":
        return "Edit Profile";
      case "sample":
        return "Upload Samples";
      case "preferences":
        return "Update Preferences";
      default:
        return "Edit Profile";
    }
  };

  const redirect = (tabIndex: string) => {
    let action = "edit";
    if (tabIndex === "2") {
      action = "sample";
    } else if (tabIndex === "3") {
      action = "preferences";
    }

    router.push("/artist/settings/" + action);
  };

  const [userDataCached, setUserDataCached] = useState<User>(user);

  useEffect(() => {
    setUserDataCached(user);
  }, [user]);

  const onDOBChange = (date) => {
    //  setDOB(date)
  };

  const resetData = () => {};

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const submitForm = () => {
    updateArtistProfile(userDataCached);
  };

  if (user && Object.keys(user).length === 0) return <p>Redirecting</p>;
  return (
    <div className="edit-profile" style={{ padding: 200 }}>
      <h1 style={{ textAlign: 'center'}}>{getHeading()}</h1>
      <>
        <Tabs
          tabPosition={"left"}
          onChange={(key: string) => {
            redirect(key);
          }}
          activeKey={getActiveTab()}
        >
          <TabPane tab="Basic Information" key="1">
            <>
              <Form
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
                <Form.Item
                  name="phone"
                  label="Phone Number"
                >
                  <Input
                    addonBefore={prefixSelector}
                    style={{ width: "100%" }}
                    value={userDataCached ? userDataCached.phone_number : ""}
                    onChange={(e) => {
                      setUserDataCached((prevState) => ({
                        ...prevState,
                        phone_number: e.target.value as unknown as number,
                      }));
                    }}
                  />
                </Form.Item>
                <Form.Item label="Age">
                  <InputNumber
                    value={userDataCached ? userDataCached.age : 0}
                    onChange={(e) => {
                      setUserDataCached((prevState) => ({
                        ...prevState,
                        phone_number: e,
                      }));
                    }}
                  />
                </Form.Item>
                <Form.Item label="Date of birth">
                  <DatePicker onChange={onDOBChange} />
                </Form.Item>
                <Form.Item label="Gender">
                  <Select
                    defaultValue={userDataCached ? userDataCached.gender : ""}
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
                    defaultValue={userDataCached ? userDataCached.country : ""}
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
                  <Button type="primary" htmlType="submit" onClick={submitForm}>
                    Save
                  </Button>
                  <Button htmlType="button" onClick={resetData}>
                    Reset
                  </Button>
                </Form.Item>
              </Form>
            </>
          </TabPane>
          <TabPane tab="Samples" key="2">
            <Button id="image-upload" type="primary" onClick={openLoginModal}>
              Upload a sample
            </Button>
          </TabPane>
          <TabPane tab="Preferences" key="3">
            <>
              <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                initialValues={{ size: componentSize }}
                onValuesChange={onFormLayoutChange}
                size={componentSize as SizeType}
              >
                <Form.Item
                  label="Send notification email"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
                <Form.Item label="Up for collab" valuePropName="checked">
                  <Switch
                    onChange={() => {
                      updateArtistPreference(
                        "upForCollaboration",
                        !upForCollaboration
                      );
                      setUpForCollaboration(!upForCollaboration);
                    }}
                    checked={upForCollaboration}
                  />
                </Form.Item>
              </Form>
            </>
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
